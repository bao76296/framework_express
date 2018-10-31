const mongoose = require('../util/mongoose');
let getNowTime = require('../util/getNowTime');
const fs = require('fs');
const PATH = require('path');

const { defaultBookImgUrl } = require('../config');

let bookSchema = new mongoose.Schema({
    bookimg : String,
    bookname : String,
    author : String,
    isbn :　String,
    year : String,
    type : String,
    surplus : String,
    publishingHouse : String,
    creatrTime : String,
    changeTime : String
})

var book_Model =  mongoose.model('books', bookSchema);


const bookList = (data) => {
    let query = data || {};
    if(data.id){
        query._id= data.id;
        delete query.id;
    }
    return book_Model.find(query).sort({changeTime : -1 }).then( result => {
        return result;
    }).catch( err => {
        return false;
    })
}

const bookListPart = async ({pageNo = 1, pageSize = 5, serch = ''}) => {
    
    let query = {}
    if(serch){
        let rex = new RegExp(serch, 'g')
        query = {
            $or: [
                { bookname: rex },
                { author: rex },
                { publishingHouse: rex },
                { type: rex }
            ]

        }
    }
    let res = await bookList(query);
    return book_Model.find(query)
        .sort({changeTime : -1})
        .skip((pageNo -1) * pageSize )
        .limit(pageSize)
        .then( result => {
            return {
                item : result,
                pageInfo : {
                    pageNo,
                    pageSize,
                    dataSum : res.length,
                    pageSum : Math.ceil(res.length / pageSize)
                }
            } 
        })
        .catch( err => { return false } )
}




const bookSave = (data) => {
    data.bookimg =  data.bookimg || defaultBookImgUrl;
    return new book_Model({
        ...data,
        creatrTime : getNowTime(),
        changeTime : getNowTime()
    })
    .save()
    .then( result => {
        return result;
    })
    .catch( err => {
        return false;
    })
}


const bookDelete = async (data) => {
    
    let res = await bookList({id : data.id })
    
    return book_Model.deleteMany({_id : data.id})
            .then(  async (result) => { 
                
                if(res[0].bookimg != defaultBookImgUrl){
                    fs.unlinkSync(PATH.resolve(__dirname, '../public' + res[0].bookimg))
                }
                let _res = await bookList({})
                result.isback =  data.pageNo != (Math.ceil(_res.length/5))
                result.pageSum = _res.length;
                return result  
            })
            .catch( err => {
                return false;
            })
}

const bookUpdate =  (data) => {
    data.changeTime = getNowTime()
    return book_Model.updateOne({_id : data.id },{...data})
            .then( result => { return result })
            .catch( err => {
                return false;
            })
}



module.exports = {
    bookList,
    bookSave,
    bookDelete,
    bookUpdate,
    bookListPart
}
const mongoose = require('../util/mongoose');
let getNowTime = require('../util/getNowTime');

let bookSchema = new mongoose.Schema({
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
    let query ={};
    if(data.id){
        query._id= data.id;
    }
    return book_Model.find(query).sort({changeTime : -1 }).then( result => {
        return result;
    }).catch( err => {
        return false;
    })
}

const bookSave = (data) => {
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

const bookDelete = (data) => {
    return book_Model.remove({_id : data.id})
            .then( result => { return result })
            .catch( err => {
                return false;
            })
}

const bookUpdate = (data) => {
    return book_Model.updateOne({_id : data.id },{...data})
            .then( result => { 
                 return result })
            .catch( err => {
                return false;
            })
}



module.exports = {
    bookList,
    bookSave,
    bookDelete,
    bookUpdate
}
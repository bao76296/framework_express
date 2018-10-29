const mongoose = require('../util/mongoose');
let getNowTime = require('../util/getNowTime');

let adminScheam = new mongoose.Schema({
    user : String,
    name : String,
    password : String,
    createTime : String
});

let admin_model = mongoose.model('admin', adminScheam);

const findoneName = ({user}) => {
    return admin_model.find({
        user : user
    })
    .then( result => {
        return result
    })
    .catch (err =>{
        return false;
    })
}

//可与上边函数整合，由于时间问题，暂时不做整合
const logIn = (data) => {
    return admin_model.find(data)
    .then( result => {
        return result
    })
    .catch (err =>{
        return false;
    })
}



const Save = async (data) => {
    let res = await findoneName(data)
    if(res.length > 0){
        return {
            code : 201,
            data : '用户名以注册'
        };
    }

    return new admin_model({
        ...data,
        createTime : getNowTime()
    })
    .save()
    .then( result => {
        return {
            code : 200,
            data : {
                user : result.user,
                _id : result._id
            }
        }
    })
    .catch( err => {
        console.log(err)
        return false;
    })
}



module.exports = {
    Save,
    logIn,
    findoneName
}
const mongoose = require('../util/mongoose');
let getNowTime = require('../util/getNowTime');

let adminScheam = new mongoose.Schema({
    user : String,
    password : String,
    createTime : String
});

let admin_model = mongoose.model('admin', adminScheam);

const findone = (query) => {
    return admin_model.find({
        uesr : query
    })
    .then( result => {
        return result
    })
    .catch (err =>{
        return false;
    })
}




const Save = async (data) => {

    let { user } = data;
    let res = await findone({
        uesr : user
    })
    console.log(res,55555);
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
        console.log(666)
        console.log(result)
        console.log(233)
        return result
    })
    .catch( err => {
        console.log(err)
        return false;
    })
}



module.exports = {
    Save
}
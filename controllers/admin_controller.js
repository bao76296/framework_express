const admon_models = require('../models/admin_models')


const admin_signIn = async (req, res, next) => {
    
    let data = await admon_models.Save(req.body);
    if(data){
        res.render('admin', {code : data.code, data : JSON.stringify(data.data)})
    } else {
        res.render('admin', {code : 500, data : JSON.stringify('系统错误，请通知管理员')}) 
    }
}

const admin_logIn = async (req, res, next) => {
   
    let _res = await admon_models.findoneName(req.body)
    
    if(_res.length == 0){
        res.render('admin', {code : 201, data : JSON.stringify('账号不存在')});
    }
    let data = await admon_models.logIn(req.body);
    if(data){
        if(data.length == 0){
            res.render('admin', {code : 201, data : JSON.stringify('密码不正确')});
        } else if(data.length == 1){
            req.session.userInfo ={
                _id : data[0]._id,
                username : data[0].user,
                name : data[0].name,
                level : 7
            } 
            res.render('admin', {code : 200, data : JSON.stringify('成功')});
        } else {
            res.render('admin', {code : 500, data : JSON.stringify('系统错误，请通知管理员')}) 
        }
    } else {
        res.render('admin', {code : 500, data : JSON.stringify('系统错误，请通知管理员')}) 
    }
}


module.exports = {
    admin_signIn,
    admin_logIn
}
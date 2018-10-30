const user_model = require('../models/user_models')
const URL = require('url')
const qs = require('querystring');


const userIsLogIn = (req, res, next) => {
    if(req.session.userInfo){
        res.render('user', { code:200, data: JSON.stringify('验证通过')})
    } else {
        res.render('user', { code:201, data: JSON.stringify('验证失败，需要重新登录')})
    }
}

const info = async (req, res, next) => {
    let data = await user_model.info(req.session.userInfo._id)
    
    res.render('user', {
        code :200,
        data : JSON.stringify({
            name : data.name,
            id : data._id,
        })
    })
}

const exit = (req, res, next) => {
    req.session.userInfo = null;
    res.render('user', {
        code : 200,
        data : JSON.stringify('退出成功')
    })
}
const check = (req, res, next) => {
    let auth = user_model.deatil()[qs.parse(URL.parse(req.url).query).data];
    res.render('user', {
        code : req.session.userInfo.level > auth ? 200 : 403,
        data : JSON.stringify( req.session.userInfo.level > auth ? '可以操作' : '权限不够，不可以操作')
    })

}

module.exports = {
    userIsLogIn,
    info,
    exit,
    check
}
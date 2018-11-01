const user_model = require('../models/user_models')
const URL = require('url')
const qs = require('querystring');
const jwt = require('jsonwebtoken')
const { cert } = require('../config')

const userIsLogIn = (req, res, next) => {
    try{
        if(!req.query.token) throw new Error();
        let token = jwt.verify(req.query.token, cert);
        res.render('user', { code:200, data: JSON.stringify('验证通过')})
    }catch (e){
        res.render('user', { code:201, data: JSON.stringify('验证失败，需要重新登录')})
    }

}

const info = async (req, res, next) => {
    let data = await user_model.info(req.token._id)
    
    res.render('user', {
        code :200,
        data : JSON.stringify({
            name : data.name,
            id : data._id,
        })
    })
}

// const exit = (req, res, next) => {
//     req.session.userInfo = null;
//     res.render('user', {
//         code : 200,
//         data : JSON.stringify('退出成功')
//     })
// }

const check = (req, res, next) => {

    console.log(req.query,789)
    try {
        let token = jwt.verify(req.query.token, cert);
        console.log(123);
        let auth = user_model.deatil()[qs.parse(URL.parse(req.url).query).data];
        console.log(token, auth,66666)
        res.render('user', {
            code : token.level > auth ? 200 : 403,
            data : JSON.stringify( token.level > auth ? '可以操作' : '权限不够，不可以操作')
        })
    } catch (e) {
        res.render('user', {
            code :  403,
            data : JSON.stringify('出错了。')
        })
    }
   
    
    
}

module.exports = {
    userIsLogIn,
    info,
    // exit,
    check
}
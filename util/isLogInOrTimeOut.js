const { cert } = require('../config')
const jwt = require('jsonwebtoken')
const ishas = (req, res, next) => {
    try{
        console.log(req.query,5555)
        if(!req.query.token) throw new Error();
        console.log(23333)
        let token = jwt.verify(req.query.token, cert);
        console.log(token,1234444)
        req.token = token;
        next();
    }catch (e){
        console.log('???')
        res.render('user', { code:201, data: JSON.stringify('验证失败，需要重新登录')})
    }
}

module.exports = {
    ishas
}
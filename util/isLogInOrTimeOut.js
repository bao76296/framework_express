const { _public } = require('../config')
const jwt = require('jsonwebtoken')
const ishas = (req, res, next) => {
    try{ 
        if(!req.cookies.token) throw new Error();
        let token = jwt.verify(req.cookies.token, _public, { algorithm: 'RS256' });
        req.token = token;
        let _time = +new Date() /1000  - token.iat; 
        if(_time > 1000 * 60 * 5){
            throw new Error();
        }
        next();
    }catch (e){
        
        res.render('user', { code:201, data: JSON.stringify('验证失败，需要重新登录')})
    }
}

module.exports = {
    ishas
}
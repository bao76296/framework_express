const { cert } = require('../config')
const jwt = require('jsonwebtoken')
const ishas = (req, res, next) => {
    try{
        if(!req.query.token) throw new Error();
        let token = jwt.verify(req.query.token, cert);
        req.token = token;
        next();
    }catch (e){
        
        res.render('user', { code:201, data: JSON.stringify('验证失败，需要重新登录')})
    }
}

module.exports = {
    ishas
}
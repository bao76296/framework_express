const admon_models = require('../models/admin_models')
const bcrypt = require('bcrypt');
const fs = require('fs');
const PAHT = require('path');
const jwt = require('jsonwebtoken');
const { cert } = require('../config')


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
    //解密
    let flag = bcrypt.compareSync(req.body.password, _res[0].password)

    if (flag == 'err') {
        res.render('admin', { code: 500, data: JSON.stringify('系统错误，请通知管理员') })
    } else if (flag == true) {
        var _payload = {
            _id: _res[0]._id,
            username: _res[0].user,
            name: _res[0].name,
            level: 7,
            iat : +new Date()/1000
        }

        let _privateKeys = fs.readFileSync(PAHT.resolve(__dirname, '../keys/private.key'));
        

        let _token = jwt.sign(_payload, _privateKeys, { algorithm: 'RS256' })
       
        // res.render('admin', { code: 200, data: JSON.stringify('成功'), token: JSON.stringify(_token) });
        res.cookie('token', _token, {expires : new Date(+new Date() + 5 * 60 *1000), path : '/'})
        res.render('admin', { code: 200, data: JSON.stringify({
            token : _token
        })});

    } else if (flag == false) {
        res.render('admin', { code: 201, data: JSON.stringify('密码不正确') });

    }
}


module.exports = {
    admin_signIn,
    admin_logIn
}
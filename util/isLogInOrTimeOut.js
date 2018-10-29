const ishas = (req, res, next) => {
    console.log(req.session.userInfo,888888888)
    if(req.session.userInfo){
        next()
    } else {
        res.render('user',{
            code: 403,
            data : JSON.stringify('登录出现问题，请重新登录。')
        })
    }
}

module.exports = {
    ishas
}
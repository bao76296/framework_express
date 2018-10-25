const none = () => {}
const estimateData = (res, template, data, callback = {}) => {

    let { success , fail } = {
        success : callback.success || none,
        fail : callback.fail || none,
    }

    if(!data){
        fail();
        // res.render(template, {code : 500, data : '发生错误，请通知管理员'})
        response.call(res, { template, code : 500, data : '发生错误，请通知管理员' })
    } else {
        success();
         // res.render(template, {code : 200, data : JSON.stringify(data)})
        response.call(res, { template, code : 200, data : JSON.stringify(data) })
    }
}

const response = function({template, code, data}){
    this.render(template, {
        code : code,
        data : data
    })
}


module.exports = {
    estimateData
}
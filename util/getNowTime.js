module.exports = getNowTime = () => {
    var data = new Date();
    return data.getFullYear() + '-' + (data.getMonth()+1) + '-' + data.getDate() + ' , ' + data.getHours() + '-' + data.getMinutes() ;
    
}
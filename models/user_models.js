const mongoose = require('../util/mongoose');
let getNowTime = require('../util/getNowTime');

let admin_model = mongoose.model('admin');

const info = (id) => {
    return admin_model.findById(id)
        .then( result => result)
        .catch(err => {
            return false;
        })
}

const deatil = () => {
    return {
        list : 5,
        remove : 7
    }
}


module.exports = {
    info,
    deatil
}

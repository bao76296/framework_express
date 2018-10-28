const admon_models = require('../models/admin_models')
const { estimateData } = require('../util/estimateData');


const admin_signIn = async (req, res, next) => {
    
    console.log(req.body)
    let data = await admon_models.Save(req.body);
    
    console.log(data);
    estimateData(res, 'admin', data)
}


module.exports = {
    admin_signIn
}
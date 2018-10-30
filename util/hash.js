const bcrypt = require('bcrypt')

const saltRounds = 10;

const hash = (textplain) => {  
    try{
        var salt = bcrypt.genSaltSync(saltRounds);
        return bcrypt.hashSync(textplain, salt);
    }catch(err ){
        return 'err'
    }

    
    
}

module.exports = hash;
const fs = require('fs');
const PATH = require('path');



module.exports = {
    version : 'v1',
    defaultBookImgUrl : '/upload/book_logo/default.png',
    cert : 'thisiscert',
    _public : fs.readFileSync(PATH.resolve(__dirname, '../keys/public.key'))
}
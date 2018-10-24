const book_models = require('../models/book_models');
// const template = require('../views/book')

const bookList = async (req, res) => {
    res.set('content-type', 'application/json; charset=utf8');
    let _data = await book_models.bookList();
    res.render('book', {code : 200, data : JSON.stringify(_data)})
}

module.exports = {
    bookList
}
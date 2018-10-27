const book_models = require('../models/book_models');
const {estimateData} = require('../util/estimateData')
// const template = require('../views/book')

const bookList = async (req, res) => {
    console.log(req.query)
    res.set('content-type', 'application/json; charset=utf8');
    let _data = await book_models.bookListPart(req.query);
    estimateData(res, 'book', _data)
}

const bookSave = async (req, res) => {
    res.set('content-type', 'application/json; charset=utf-8');
    console.log(req.body, 123)
    let _data = await book_models.bookSave(req.body);
    estimateData(res, 'book', _data)
}

const bookDelete = async (req, res) => {
    res.set('content-type', 'application/json; charset=utf-8');
    let _data = await book_models.bookDelete(req.query);
    estimateData(res, 'book', _data);
}

const bookUpdate = async (req, res) => {
    res.set('content-type', 'application/json; charset=utf-8');
    let _data = await book_models.bookUpdate(req.body);
    estimateData(res, 'book', _data)
}


module.exports = {
    bookList,
    bookSave,
    bookDelete,
    bookUpdate
}
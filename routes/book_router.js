const express = require('express');
const router = express.Router();
const book_controller = require('../controllers/book_controller')

router.get('/list', book_controller.bookList);




module.exports = router;
const express = require('express');
const router = express.Router();
const book_controller = require('../controllers/book_controller')

router.get('/list', book_controller.bookList);
router.post('/save', book_controller.bookSave);
router.get('/delete', book_controller.bookDelete);
router.post('/update', book_controller.bookUpdate);



module.exports = router;
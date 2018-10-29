const express = require('express');
const router = express.Router();
const islogInOrTimeOut = require('../util/isLogInOrTimeOut');

const user_controller = require('../controllers/user_controller')

router.use((req, res, next) => {
    res.set('content-type', 'application/json; charset=utf-8');
    next();
})

router.get('/isLogIn', user_controller.userIsLogIn);
router.get('/info', islogInOrTimeOut.ishas, user_controller.info);
router.get('/exit', user_controller.exit);

module.exports = router;
const express = require('express');
const admin_controller = require('../controllers/admin_controller');


const router = express.Router()

router.use((req, res, next) => {
    res.set('content-type', 'application/json; charset=utf-8');
    next();
})

router.post('/signIn', admin_controller.admin_signIn)
router.post('/logIn', admin_controller.admin_logIn)



module.exports = router;
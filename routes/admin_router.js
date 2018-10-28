const express = require('express');
const admin_controller = require('../controllers/admin_controller');


const router = new express.Router()

router.use((req, res, next) => {
    res.set('content-type', 'application/json; charset=utf-8');
    next();
  })

router.post('/signIn', admin_controller.admin_signIn)




module.exports = router;
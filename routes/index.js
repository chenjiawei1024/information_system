const express = require('express');
const router = express.Router();
const { Login } = require('../controllers/userController')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send({
        'msg': 'hello world'
    })
});

module.exports = router;

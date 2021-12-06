var express = require('express');
const {Login,Logon} = require("../controllers/loginController");
var router = express.Router();

/* identity users. */
router.post('/login', Login);

/* create a new user. */
router.post('/logon', Logon);

module.exports = router;

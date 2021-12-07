var express = require('express');
const {Login,Logon, editUser} = require("../controllers/loginController");
var router = express.Router();

/* identity users. */
router.post('/login', Login);

/* create a new user. */
router.post('/logon', Logon);

/* editing the user. */
router.post('/edit', editUser)

module.exports = router;

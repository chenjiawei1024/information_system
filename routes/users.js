var express = require('express');
const {Login,Logon, getUserList, getOneUser, editUserType,checkPassword,deleteUser} = require("../controllers/userController");
var router = express.Router();

/* identity users. */
router.post('/login', Login);

/* create a new user. */
router.post('/logon', Logon);

/* get all users. */
router.get('/', getUserList);

/* get one user. */
router.get('/:userId', getOneUser);

/* editing the password. */
router.post('/', checkPassword)

/* editing the user type. */
router.post('/:userId', editUserType)

/* delete the user type. */
router.delete('/:userId', deleteUser)

module.exports = router;

const jwt = require('jsonwebtoken')
const { connect } = require('../util/dbConfig')
const bcrypt = require('bcryptjs')

const Login = async (req, res) => {
    let { user, password } = req.body
    let sql = `SELECT * FROM user WHERE user = '${user}'`
    let callback = (err, data) => {
        if(err) {
            console.log('[SELECT ERROR] - ',err.message);
            res.send({'code': 400, 'msg': '连接失败',})
            return
        }
        data = JSON.stringify(data)
        data = JSON.parse(data)
        if(!data[0]) {
            res.send({'code':422, "msg": '用户名不存在'})
            return
        }
        if(!(data[0].password === password)) {
            res.send({'code': 400, 'msg': '密码错误'})
            return
        }
        const token = jwt.sign({ user }, "yyknk")
        res.send({'code':200, 'msg': '用户登录成功', 'token': token, type: data[0].type, userId: data[0].userId})
    }
    await connect(sql,callback)

}

const Logon = async (req, res) => {
    let { user, password, type } = req.body
    let sql = `INSERT INTO user (user, password, type) VALUES ('${user}', ${password}, ${type});`
    let callback = (err, data) => {
        if(err) {
            console.log('[SELECT ERROR] - ',err.message);
            res.send({'code': 400, 'msg': 'fail to register',})
            return
        }
        data = JSON.stringify(data)
        data = JSON.parse(data)
        res.send({
            code: 200,
            msg: 'register successfully!！'
        })
    }
    await connect(sql,callback)

}

const checkPassword = async (req, res) => {
    let { user, oldPassword } = req.body
    let sql1 = `SELECT password FROM user WHERE user = '${user}'`
    let callback1 = async (err, data) => {
        if(err) {
            console.log('[SELECT ERROR] - ',err.message);
            res.send({'code': 422, 'msg': 'some wrong!'})
            return
        }
        data = JSON.stringify(data)
        data = JSON.parse(data)
        if(!(data[0].password === oldPassword)) {
            res.send({'code': 422, 'msg': 'wrong password!'})
            return
        }else {
            await editPassword(req,res)
        }
    }
    await connect(sql1,callback1)
}

const editPassword = async (req, res) => {
    let { user, newPassword } = req.body
    console.log(user, newPassword)
    let sql = `UPDATE user SET password = '${newPassword}' WHERE user = '${user}';`
    let callback = (err, data) => {
        if(err) {
            console.log('[SELECT ERROR] - ',err.message);
            res.send({'code': 400, 'msg': 'fail to edit password'})
            return
        }
        data = JSON.stringify(data)
        data = JSON.parse(data)
        res.send({
            code: 200,
            msg: 'editing successfully'
        })
    }
    await connect(sql,callback)

}

const getUserList = async (req,res) => {
    let { pageIndex, pageNumber } = req.query
    let index = (pageIndex-1)*pageNumber
    let sql = `SELECT * FROM user`
    let callback = (err,data) => {
        if (err) {
            console.log('[SELECT ERROR] - ',err.message);
            res.send({'code': 400, 'msg': 'getUserList error!',})
            return
        }
        data = JSON.stringify(data)
        data = JSON.parse(data)
        const total = data.length
        const onePage = data.slice(index,index+pageNumber)
        res.send({
            code: 200,
            data: onePage,
            total: total,
            msg: 'get users successfully!'
        })
    }
    await connect(sql,callback)
}

const getOneUser = async (req,res) => {
    let { userId } = req.params
    let sql = `SELECT * FROM user where userId = ${userId}`
    let callback = (err,data) => {
        if (err) {
            console.log('[SELECT ERROR] - ',err.message);
            res.send({'code': 400, 'msg': 'getUser error!',})
            return
        }
        data = JSON.stringify(data)
        data = JSON.parse(data)
        res.send({
            code: 200,
            data: data
        })
    }
    await connect(sql,callback)
}

const deleteUser = async (req,res) => {
    let { userId } = req.params
    let sql = `DELETE FROM user WHERE userId = ${userId}; `
    let callback = (err,data) => {
        if (err) {
            console.log('[SELECT ERROR] - ',err.message);
            res.send({'code': 400, 'msg': 'delete user error!'})
            return
        }
        data = JSON.stringify(data)
        data = JSON.parse(data)
        res.send({
            code: 200,
            data: data,
            msg: 'delete user successfully!'
        })
    }
    await connect(sql,callback)
}

const editUserType = async (req, res) => {
    // const token = String(req.headers.authorization).split(' ').pop()
    // const username = jwt.verify(token, "yyknk")
    let { userId } = req.params
    let { type } = req.body
    let sql = `UPDATE user SET type = ${type} WHERE userId = ${userId};`
    let callback = (err, data) => {
        if(err) {
            console.log('[SELECT ERROR] - ',err.message);
            res.send({'code': 400, 'msg': 'fail to editing',})
            return
        }
        data = JSON.stringify(data)
        data = JSON.parse(data)
        res.send({
            code: 200,
            msg: 'editing successfully！'
        })
    }
    await connect(sql,callback)

}

module.exports = {
    Login,
    Logon,
    editPassword,
    getUserList,
    getOneUser,
    editUserType,
    checkPassword,
    deleteUser
}
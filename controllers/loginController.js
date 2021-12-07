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
        res.send({'code':200, 'msg': '用户登录成功', 'token': token})
    }
    await connect(sql,callback)

}

const Logon = async (req, res) => {
    let { user, password } = req.body
    let sql = `INSERT INTO user (user, password) VALUES ('${user}', ${password});`
    let callback = (err, data) => {
        if(err) {
            console.log('[SELECT ERROR] - ',err.message);
            res.send({'code': 400, 'msg': '注册失败，请重新再试',})
            return
        }
        data = JSON.stringify(data)
        data = JSON.parse(data)
        res.send({
            code: 200,
            msg: '用户注册成功!！'
        })
    }
    await connect(sql,callback)

}

const editUser = async (req, res) => {
    // const token = String(req.headers.authorization).split(' ').pop()
    // const username = jwt.verify(token, "yyknk")
    let { user, password } = req.body
    let sql = `UPDATE user SET password = ${password};`
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
            msg: 'editing successfully！'
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
    let sql = `SELECT * FROM user where id = ${userId}`
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

module.exports = {
    Login,
    Logon,
    editUser,
    getUserList,
    getOneUser
}
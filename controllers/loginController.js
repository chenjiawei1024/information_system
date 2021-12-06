const jwt = require('jsonwebtoken')
const { connect } = require('../util/dbConfig')

const Login = async (req, res) => {
    let { user, password } = req.body
    let sql = `SELECT * FROM login WHERE user = '${user}'`
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
        console.log(token)
        console.log(data)
    }
    await connect(sql,callback)

}

const Logon = async (req, res) => {
    let { user, password } = req.body
    let sql = `INSERT INTO login (user, password) VALUES ('${user}', ${password});`
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
    const token = String(req.headers.authorization).split(' ').pop()
    const username = jwt.verify(token, "yyknk")
    let { user, password } = req.body
    let sql = `UPDATE user SET;`
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

module.exports = {
    Login,
    Logon,
    editUser
}
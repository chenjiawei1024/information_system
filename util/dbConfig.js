const mysql = require('mysql')

//数据库配置
config = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: 3306,
    database: 'ed_system',
}
//连接数据库
connect = (sql, callback) => {
    const db = mysql.createConnection(config)
    db.connect((err) => {
        if(err) throw err
    })
    db.query(sql, callback)
}
module.exports = { connect }
const { connect } = require('../util/dbConfig')
const jwt = require("jsonwebtoken");

const getCourseList = async (req,res) => {
    // const token = String(req.headers.authorization).split(' ').pop()
    // const username = jwt.verify(token, "yyknk")
    let { pageIndex, pageNumber } = req.query
    let index = (pageIndex-1)*pageNumber
    // let sql = `SELECT * FROM course LIMIT ${index},${pageNumber}`
    let sql = `SELECT * FROM course`
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
            total: total
        })
    }
    await connect(sql,callback)
}

const getOneCourse = async (req,res) => {
    const token = String(req.headers.authorization).split(' ').pop()
    const username = jwt.verify(token, "yyknk")
    let { id } = req.body
    let sql = `SELECT * FROM course where id = ${id}`
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

const addCourse = async (req,res) => {
    const token = String(req.headers.authorization).split(' ').pop()
    const username = jwt.verify(token, "yyknk")
    let { c_name, c_description, teacher_id, status } = req.body
    let sql = `INSERT INTO course (c_name, c_description, teacher_id, status) VALUES ('${c_name}', '${c_description}', ${teacher_id},${status});`
    let callback = (err,data) => {
        if (err) {
            console.log('[SELECT ERROR] - ',err.message);
            res.send({'code': 400, 'msg': 'add course error!',})
            return
        }
        data = JSON.stringify(data)
        data = JSON.parse(data)
        res.send({
            code: 200,
            data: data,
            msg: '添加课程成功！'
        })
    }
    await connect(sql,callback)
}

const deleteCourse = async (req,res) => {
    const token = String(req.headers.authorization).split(' ').pop()
    const username = jwt.verify(token, "yyknk")
    let { id } = req.body
    let sql = `DELETE FROM course WHERE id = ${id}; `
    let callback = (err,data) => {
        if (err) {
            console.log('[SELECT ERROR] - ',err.message);
            res.send({'code': 400, 'msg': 'delete course error!',})
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

const editCourse = async (req,res) => {
    const token = String(req.headers.authorization).split(' ').pop()
    const username = jwt.verify(token, "yyknk")
    let { id, c_name, c_description, teacher_id, status } = req.body
    let sql = `UPDATE course SET c_name='${c_name}', c_description = '${c_description}', teacher_id = ${teacher_id}, status = ${status} WHERE id = ${id}; `
    let callback = (err,data) => {
        if (err) {
            console.log('[SELECT ERROR] - ',err.message);
            res.send({'code': 400, 'msg': 'edit course error!',})
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
    getCourseList,
    getOneCourse,
    addCourse,
    deleteCourse,
    editCourse
}
// var createError = require('http-errors');
const express = require('express');
const compression = require('compression')
const cookieParser = require('cookie-parser');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const courseRouter = require('./routes/courses');

const app = express();

//静态资源存放路径
app.use(compression())
app.use(express.static('./dist'))

const http = require('http');
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/course', courseRouter);

app.listen(3000, () => {
  console.log('server running at http://127.0.0.1:3000')
})

const express = require('express');
const {getCourseList,getOneCourse, addCourse,deleteCourse, editCourse} = require('../controllers/courseController');
const router = express.Router();

/* get course list */
router.get('/getCourse',getCourseList);

/* get course list */
router.get('/getOneCourse',getOneCourse);

/* add course */
router.post('/addCourse',addCourse);

/* delete course */
router.delete('/deleteCourse',deleteCourse);

/* edit course */
router.post('/editCourse',editCourse);

module.exports = router;
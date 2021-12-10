const express = require('express');
const {getCourseList,getOneCourse, addCourse,deleteCourse, editCourse,getTeacherCourseList} = require('../controllers/courseController');
const router = express.Router();

/* change to the restful API */
/* get course list */
router.get('/',getCourseList);

/* get course list */
router.get('/:courseId',getOneCourse);

/* add course */
router.post('/',addCourse);

/* delete course */
router.delete('/:id',deleteCourse);

/* edit one course */
router.put('/:courseId',editCourse);

/* get teacher course list */
router.get('/teacher/:teacher_id',getTeacherCourseList);

module.exports = router;
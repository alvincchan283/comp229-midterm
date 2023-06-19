const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/student.controller');

// GET /students
router.get('/', studentsController.getAllStudents);
// GET /students/:id
router.get('/:id', studentsController.getStudentById);
// POST /students
router.post('/', studentsController.createStudent);
// PUT /students/:id
router.put('/:id', studentsController.updateStudent);
// DELETE /students/:id
router.delete('/:id', studentsController.deleteStudent);

module.exports = router;
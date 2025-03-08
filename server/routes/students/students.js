const express = require("express")
const studentsController = require("../../controllers/students/students.controller")
const router = express.Router()
router.post("/new/student", studentsController.addNewStudent)
router.get("/students/list", studentsController.getAllStudents)
router.get("/student/list/:studentId", studentsController.viewStudentById)
router.put("/student/update/:studentId", studentsController.updateStudent)
router.delete("/student/delete/:studentId", studentsController.deleteStudentById)
module.exports = router

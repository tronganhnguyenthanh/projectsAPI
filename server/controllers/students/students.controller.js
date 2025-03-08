const connectDB = require("../../connection/db")
// Add new students
const addNewStudent = async(req, res) => {
  try{
    const connection = await connectDB()
    const {studentId, firstName, lastName} = req.body
    const sql = "INSERT INTO students(`studentId`,`firstName`,`lastName`) VALUES(?, ?, ?)"
    await connection.execute(sql, [studentId, firstName, lastName])
    res.status(200).json({message:"Student added successfully"})
  }catch(error){
    res.status(400).json({message:error.message})
  }
}
// Get all students
const getAllStudents = async(req, res) => {
  try{
    const connection = await connectDB()
    const sql = "SELECT * FROM students"
    const [results] = await connection.execute(sql)
    res.json({students:results})
  }catch(error){
    res.status(400).json({message:error.message})
  }
}
// View student by id
const viewStudentById = async(req, res) => {
  try{
    const connection = await connectDB()
    const {studentId} = req.params
    const sql = "SELECT * FROM students WHERE studentId=?"
    const [results] = await connection.execute(sql, [studentId])
    const resultId = await results.find((i) => i.studentId)
    res.json(resultId)
  }catch(error){
    res.status(400).json({message:error.message})
  }
}
// Update student
const updateStudent = async(req, res) => {
  try{
    const {studentId} = req.params
    const {firstName} = req.body
    const connection = await connectDB()
    const sql = "UPDATE students SET firstName=? WHERE studentId=?"
    await connection.execute(sql, [firstName, studentId])
    res.status(200).json({message:"Student updated successfuly"})
  }catch(error){
    res.status(400).json({message:error.message})
  }
}
// Delete student
const deleteStudentById = async(req, res) => {
  try{
    const connection = await connectDB()
    const {studentId} = req.params
    const sql = "DELETE FROM students WHERE studentId=?"
    await connection.execute(sql, [studentId])
    res.status(200).json({message:"Student deleted successfully"})
  }catch(error){
    res.status(400).json({message:error.message})
  }
}
module.exports = {
 addNewStudent,
 updateStudent,
 viewStudentById,
 getAllStudents,
 deleteStudentById
}
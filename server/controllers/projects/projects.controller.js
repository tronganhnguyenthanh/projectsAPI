const connectDB = require("../../connection/db")
const addNewProject = async (req, res) => {
  try{
    const connection = await connectDB()
    const {studentId, projectName, projectDescription, points} = req.body
    const sql = "INSERT INTO projects(`studentId`,`projectName`,`projectDescription`,`points`) VALUES(?, ?, ?, ?)"
    await connection.execute(sql, [studentId, projectName, projectDescription, points])
    res.status(200).json({message:"Project added successfully"})
  }catch(error){
    res.status(400).json({message:error.message})
  }
}
const getAllProjects = async (req, res) => {
   try{
     const connection = await connectDB()
     const sql = "SELECT * FROM projects"
     const [projectQuery] = await connection.execute(sql)
     res.json({projects:projectQuery})
   }catch(error){
     res.status(400).json({message:error.message})
   }
}
const updateProject = async(req, res) => {
  try{
    const {projectId} = req.params
    const {projectName, projectDescription} = req.body
    const connection = await connectDB()
    const sql = "UPDATE projects SET projectName=?, projectDescription=? WHERE projectId=?"
    await connection.execute(sql, [projectName, projectDescription, projectId])
    res.status(200).json({message:"Project updated successfuly"})
  }catch(error){
    res.status(400).json({message:error.message})
  }
}
const deleteProject = async(req, res) => {
  try{
    const {projectId} = req.params
    const connection = await connectDB()
    const sql = "DELETE FROM projects WHERE projectId=?"
    await connection.execute(sql, [projectId])
    res.status(200).json({message:"Project deleted successfully"})
  }catch(error){
    res.status(400).json({message:error.message})
  }
}
const getProjectStudentPoint = async(req, res) => {
  try{
    const connection = await connectDB()
    const sql = "SELECT projects.projectId, students.firstName, students.lastName, projects.projectName, projects.projectDescription, projects.points FROM students INNER JOIN projects ON students.studentId=projects.studentId"
    const [query] = await connection.execute(sql)
    res.json({projects:query})
  }catch(error){
    res.status(400).json({message:error.message})
 }
}
module.exports = {
 addNewProject,
 getAllProjects,
 updateProject,
 deleteProject,
 getProjectStudentPoint
}
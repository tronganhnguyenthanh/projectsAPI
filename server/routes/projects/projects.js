const projectsController = require("../../controllers/projects/projects.controller")
const express = require("express")
const routerProject = express.Router()
routerProject.post("/new/project", projectsController.addNewProject)
routerProject.get("/projects/list", projectsController.getAllProjects)
routerProject.get("/student-project/list", projectsController.getProjectStudentPoint)
routerProject.put("/project/update/:projectId", projectsController.updateProject)
routerProject.delete("/project/delete/:projectId", projectsController.deleteProject)
module.exports = routerProject
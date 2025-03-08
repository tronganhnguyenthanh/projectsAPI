import React, { useEffect, useState } from "react"
import { Button, Card, Form, Input, message, Popconfirm, Select, Table } from "antd"
import axios from "axios"
import { toast, ToastContainer } from "react-toastify"
const FormProject = () => {
  const [students, setStudents] = useState([])
  const [value, setValue] = useState("")
  const [projectName, setProjectName] = useState("")
  const [projectDescription, setProjectDescription] = useState("")
  const [points, setPoints] = useState("")
  const [projectList, setProjectList] = useState([])
  const getAllProjects = async () => {
   let res = await axios.get("http://localhost:1725/api/student-project/list")
   setProjectList(res.data.projects)
  }
  useEffect(() => {
   getAllProjects()
  },[])
  useEffect(() => {
    getAllStudentsInProjects()
  }, [])
  const getAllStudentsInProjects = async () => {
    let res = await axios.get("http://localhost:1725/api/students/list")
    setStudents(res.data.students)
  }
  const handleOnChange = (value) => {
    setValue(value)
  }
  const handleAddProject = async () => {
    if(value === ""){
     toast.error("Please choose your student", { position: "top-center" })
     return
    }
    if(projectName === ""){
     toast.error("Please enter your project's name", {position:"top-center"})
     return
    }
    if(projectDescription === ""){
     toast.error("Please enter your project's description", {position:"top-center"})
     return
    }
    if(points === ""){
      toast.error("Please enter your project's points", { position: "top-center" })
      return
    }else{
      let newProject = {
       studentId:value,
       projectName:projectName,
       projectDescription:projectDescription,
       points:points
      }
      let res = await axios.post("http://localhost:1725/api/new/project", newProject)
      toast.success(res.data.message, {position:"top-center"})
      getAllProjects()
    }
  }
  const confirm = async (projectId) => {
    let res = await axios.delete(`http://localhost:1725/api/project/delete/${projectId}`)
    toast.success(res.data.message, {position:"top-center"})
    setProjectName("")
    setProjectDescription("")
    setPoints("")
  }
  const cancel = () => {
   message.error("")
  }
  const columns = [
    {
      title: "Firstname",
      dataIndex: "firstName",
      key: "firstName",
      align: "center",
      render: (text) => <p style={{ whiteSpace: "nowrap" }}>{text}</p>
    },
    {
      title: "Lastname",
      dataIndex: "lastName",
      key: "lastName",
      align: "center",
      render: (text) => <p style={{ whiteSpace: "nowrap" }}>{text}</p>
    },
    {
      title: "Project's name",
      dataIndex: "projectName",
      key: "projectName",
      align: "center",
      render: (text) => <p style={{ whiteSpace: "nowrap" }}>{text}</p>
    },
    {
      title: "Project's short description",
      dataIndex: "projectDescription",
      key: "projectDescription",
      render: (text) => <p style={{whiteSpace:"nowrap"}}>{text}</p>,
      align: "center"
    },
    {
      title: (
        <p style={{whiteSpace:"nowrap"}}>Project's Points</p>
      ),
      dataIndex: "points",
      key: "points",
      align: "center",
      render: (text) => <p style={{color:"gray", cursor:"pointer"}}>{Math.floor(text)}</p>
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, project) => (
        <Popconfirm 
          title="Delete this project" 
          description="Are you sure to delete this one?"
          onConfirm={() => confirm(project.projectId)}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <Button htmlType="button" style={{backgroundColor:"red", color:"#fff", border:"none"}}>
            Delete
          </Button>
        </Popconfirm>
      )
    }
  ]
  return (
    <>
      <ToastContainer />
      <Card style={{ width: "55%", margin: "auto", marginTop: "10px" }}>
        <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} style={{ maxWidth: 600 }}>
          <Form.Item label="StudentId">
            <Select onChange={handleOnChange}>
              {students.length > 0 && students.map((i) => {
                return (
                  <Select.Option value={i.studentId}>{i.lastName} {i.firstName}</Select.Option>
                )
              })
              }
            </Select>
          </Form.Item>
          <Form.Item label="Project's name">
            <Input placeholder="Enter your project's name" onChange={(e) => setProjectName(e.target.value)} />
          </Form.Item>
          <Form.Item label="Project's short description">
            <Input placeholder="Enter your short project's description" onChange={(e) => setProjectDescription(e.target.value)} />
          </Form.Item>
          <Form.Item label="Project's points">
            <Input type="number" placeholder="Enter your project's points" onChange={(e) => setPoints(e.target.value)} />
          </Form.Item>
          <Form.Item label={null}>
            <Button type="primary" htmlType="button" onClick={handleAddProject}>Add new project</Button>
          </Form.Item>
        </Form>
      </Card>
      <Table
        style={{ marginTop: "10px" }}
        dataSource={projectList}
        columns={columns}
      />
    </>
  )
}

export default FormProject
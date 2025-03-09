import { Button, Table } from "antd"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
const ListStudents = () => {
  const [dataSource, setDataSource] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
   getAllStudents()
  },[])
  const getAllStudents = async () => {
    let res = await axios.get("http://localhost:8000/api/students/list")
    setDataSource(res.data.students)
  }
  const deleteStudent = async (studentId) => {
    try {
      let res = await axios.delete(`http://localhost:8000/api/student/delete/${studentId}`)
      toast.success(res.data.message, {position:"top-center"})
      window.location.reload(false)
    } catch (error) {
      toast.error(error.response.data.message, {position:"top-center"})
    }
  }
  const columns = [
    {
      title: "StudentId",
      dataIndex: "studentId",
      key: "studentId",
      align: "center",
      render: (text) => <span style={{color:"burlywood", cursor:"pointer"}}>{text}</span>
    },
    {
      title: "Firstname",
      dataIndex: "firstName",
      key: "firstName",
      align: "center",
      render: (text) => <p style={{ cursor: "pointer", whiteSpace: "nowrap" }}>{text}</p>
    },
    {
      title: "Lastname",
      dataIndex: "lastName",
      key: "lastName",
      align: "center",
      render: (text) => <p style={{ cursor: "pointer", whiteSpace: "nowrap" }}>{text}</p>
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, student) => (
        <>
          <Button htmlType="button" style={{ backgroundColor: "red", color: "#fff", border: "none" }} onClick={() => deleteStudent(student.studentId)}>
            Delete
          </Button>
        </>
      )
    }
  ]
  const redirectPage = () => {
    navigate("/new/project")
  }
  return (
    <>
      <ToastContainer />
      <div style={{ display: "flex", justifyContent: "end", marginTop: "20px" }} onClick={redirectPage}>
        <Button>Manage projects</Button>
      </div>
      <Table
        columns={columns}
        dataSource={dataSource}
        style={{ marginTop: "10px" }}
      />
    </>
  )
}

export default ListStudents
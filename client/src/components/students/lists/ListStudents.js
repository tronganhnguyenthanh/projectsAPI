import {Button, Table, Input, Form} from "antd"
import axios from "axios"
import React, {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"
import {toast, ToastContainer } from "react-toastify"
const ListStudents = () => {
  const [dataSource, setDataSource] = useState([])
  const [editingKey, setEditingKey] = useState("") // Track which row is being edited
  const [form] = Form.useForm()
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
      toast.success(res.data.message, { position: "top-center" })
      getAllStudents()
    }catch(error){
      toast.error(error.response.data.message, { position: "top-center" })
    }
  }

  const edit = (record) => {
   form.setFieldsValue({...record}) // Pre-fill form with current values
   setEditingKey(record.studentId) // Set row as editing
  }
  const cancel = () => {
   setEditingKey("")
  }
  const save = async (studentId) => {
    try{
       const updatedRow = await form.validateFields() // Get form values
       await axios.put(`http://localhost:8000/api/student/update/${studentId}`, updatedRow) // Send update request
       toast.success("Student updated successfully", { position: "top-center" })
       setEditingKey("") // Exit editing mode
       getAllStudents() // Refresh data
    } catch(error){
       toast.error("Update failed!", { position: "top-center" })
    }
  }
  const isEditing = (record) => record.studentId === editingKey
  const columns = [
    {
      title:"StudentId",
      dataIndex:"studentId",
      key:"studentId",
      align:"center",
    },
    {
      title:"Firstname",
      dataIndex:"firstName",
      key:"firstName",
      align:"center",
      editable:true,
    },
    {
      title:"Lastname",
      dataIndex:"lastName",
      key:"lastName",
      align:"center",
      editable:true,
    },
    {
      title:"Action",
      key:"action",
      align:"center",
      render:(_, record) => {
        const editable = isEditing(record)
        return editable ? (
          <>
            <Button type="primary" onClick={() => save(record.studentId)} style={{marginRight:8}}>
              Save
            </Button>
            <Button onClick={cancel}>Cancel</Button>
          </>
        ):(
          <>
            <Button onClick={() => edit(record)} style={{marginRight:8}}>Edit</Button>
            <Button style={{ backgroundColor: "red", color: "#fff", border: "none" }} onClick={() => deleteStudent(record.studentId)}>
              Delete
            </Button>
          </>
        )
      },
    },
  ]
  // Map through columns to add editable components
  const mergedColumns = columns.map((col) => {
    if(!col.editable) {
     return col
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    }
  })
  return (
    <>
      <ToastContainer/>
      <div style={{display:"flex", justifyContent: "end", marginTop: "20px" }} onClick={() => navigate("/new/project")}>
        <Button>Manage projects</Button>
      </div>
      <Form form={form} component={false}>
        <Table
          components={{
            body:{
             cell:EditableCell,
            },
          }}
          columns={mergedColumns}
          dataSource={dataSource}
          rowKey="studentId"
          style={{marginTop:"10px"}}
        />
      </Form>
    </>
  )
}
// ✅ Editable Cell Component
const EditableCell = ({editing, dataIndex, title, inputType, record, children, ...restProps }) => {
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item name={dataIndex} style={{ margin: 0 }} rules={[{ required: true, message: `Please enter ${title}` }]}>
          <Input/>
        </Form.Item>
      ):(
       children
      )}
    </td>
  )
}

export default ListStudents

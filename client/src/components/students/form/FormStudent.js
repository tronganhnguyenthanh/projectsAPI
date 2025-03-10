import React, {useState} from "react"
import {Button, Card, Form, Input} from "antd"
import {toast, ToastContainer} from "react-toastify"
import axios from "axios"
import ListStudents from "../lists/ListStudents"
const FormStudent = () => {
  const [studentId, setStudentId] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const addNewStudent = async() => {
   if(studentId === ""){
    toast.error("Please enter your studentId", {position:"top-center"})
    return
   }
   if(firstName === ""){
    toast.error("Please enter your firstname", {position:"top-center"})
    return
   }
   if(lastName === ""){
    toast.error("Please enter your lastname", {position:"top-center"})
    return
   }else{
     let newStudent = {
      studentId:studentId,
      firstName:firstName,
      lastName:lastName
     }
     let res = await axios.post("http://localhost:8000/api/new/student", newStudent)
     toast.success(res.data.message, {position:"top-center"})
     window.location.reload(false)
   }
  }
  return (
   <>
    <Card style={{width:"55%", margin:"auto", marginTop:"10px"}}>
     <ToastContainer/>
     <Form 
       labelCol={{
        span:8
       }}
       wrapperCol={{
        span:16
       }}
       style={{
        maxWidth:600,
      }}
      >
       <Form.Item label="StudentId">
         <Input 
           placeholder="Enter your studentId"
           value={studentId}
           onChange={(e) => setStudentId(e.target.value)}
         />
       </Form.Item>
       <Form.Item label="Firstname">
         <Input 
           placeholder="Enter your firstName"
           value={firstName}
           onChange={(e) => setFirstName(e.target.value)}
         />
       </Form.Item>
       <Form.Item label="Lastname">
         <Input 
           placeholder="Enter your lastName"
           value={lastName}
           onChange={(e) => setLastName(e.target.value)}
         />
       </Form.Item>
       <Form.Item label={null}>
         <Button type="primary" htmlType="button" onClick={addNewStudent}>Add new student</Button>
       </Form.Item>
     </Form>
    </Card>
    <ListStudents/>
   </>
  )
}

export default FormStudent
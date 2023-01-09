import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Button, Container, Modal, Row, Col, Form, Table } from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.css'
import UserEditModal from "./UserEditModal/UserEditModal";


function UserListPanel() {

    const [userList, setUserList] = useState();
    const [userEditModal, setUserEditModal] = useState(false)
    const [userEditData, setUserEditData] = useState()

    const userDown = (e) => {

        axios
            .get("http://localhost:5050/api/user/all")
            .then((res) => {
                setUserList(res.data);
                console.log(res);
            })
            .catch((err) => {
                console.log(err)
            })
    }


    const userRemove = (id) => {

        axios
            .delete(`http://localhost:5050/api/user/remove/${id}`)
            .then(() => {
                userDown()
            })
    }

    let liElements = []

    if(userList){
        liElements = userList.map((listObj, index) => {
            return (
                <tr key={listObj._id}>
                    <td>{index + 1}</td>
                    <td>{listObj.username}</td>
                    <td>{listObj.email}</td>
                    <td>{listObj.phone}</td>
                    {(JSON.parse(localStorage.getItem("userPermission")).includes("admin") || JSON.parse(localStorage.getItem("userPermission")).includes("manager")) && <td>{listObj.permission.map((data)=><li>{data}</li>)}</td>}
                    {JSON.parse(localStorage.getItem("userPermission")).includes("admin") && <td><Button variant="warning" onClick={()=>{setUserEditData(listObj); setUserEditModal(true)}}>Edit User</Button></td>}
                    {JSON.parse(localStorage.getItem("userPermission")).includes("admin") &&<td> <Button variant="danger" onClick={()=>{userRemove(listObj._id)}}>Delete User</Button></td>}
                </tr>
            )
        });
    }
  

    useEffect(() => {
        userDown()
    }, [])

    console.log(userEditData)

    return (
        <Container>
            <h2>User List Panel</h2>
            <Row>
                <Col>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Phone</th>
                                {(JSON.parse(localStorage.getItem("userPermission")).includes("admin") || JSON.parse(localStorage.getItem("userPermission")).includes("manager")) && <th>Permission</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {liElements}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            {userEditModal && <UserEditModal userEditData={userEditData} userEditModal={userEditModal} setUserEditModal={setUserEditModal}/>}
        </Container>
    )
}

export default UserListPanel;
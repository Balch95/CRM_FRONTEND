import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Button, Container, Modal, Row, Col, Form, Table } from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.css'

function UserListPanel() {

    const [userList, setUserList] = useState();


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

    let liElements = []

    if(userList){
        liElements = userList.map((listObj, index) => {
            return (
                <tr key={listObj._id}>
                    <td>{index + 1}</td>
                    <td>{listObj.username}</td>
                    <td>{listObj.email}</td>
                    <td>{listObj.phone}</td>
                    <td>{listObj.permission.map((data)=><li>{data}</li>)}</td>
                    <td>{JSON.parse(localStorage.getItem("userPermission")).includes("admin") && <Button variant="warning">Edit User</Button>}</td>
                    <td>{JSON.parse(localStorage.getItem("userPermission")).includes("admin") && <Button variant="danger">Delete User</Button>}</td>
                </tr>
            )
        });
    }
  

    useEffect(() => {
        userDown()
    }, [])

    console.log(userList)

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
                                <th>Permission</th>
                            </tr>
                        </thead>
                        <tbody>
                            {liElements}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}

export default UserListPanel;
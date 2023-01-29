import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col, Table } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css'
import UserEditModal from "./UserEditModal/UserEditModal";
import { testPermission } from "../helpservices/testPermision";

function UserListPanel() {

    const [userList, setUserList] = useState();
    const [userEditModal, setUserEditModal] = useState(false)
    const [userEditData, setUserEditData] = useState()

    const userDown = (e) => {
        axios
            .get("http://crmapp.server775408.nazwa.pl/api/user/all")
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
            .delete(`http://crmapp.server775408.nazwa.pl/api/user/remove/${id}`)
            .then(() => {
                userDown()
            })
    };
    let liElements = []
    if (userList) {
        liElements = userList.map((listObj, index) => {
            return (
                <tr key={listObj._id}>
                    <td>{index + 1}</td>
                    <td>{listObj.username}</td>
                    <td>{listObj.email}</td>
                    <td>{listObj.phone}</td>
                    {(testPermission('admin') || testPermission('manager')) && <td>{listObj.permission.map((data) => <li>{data}</li>)}</td>}
                    {testPermission('admin') && <td><Button variant="warning" onClick={() => { setUserEditData(listObj); setUserEditModal(true) }}>Edit User</Button></td>}
                    {testPermission('admin') && <td> <Button variant="danger" onClick={() => { userRemove(listObj._id) }}>Delete User</Button></td>}
                </tr>
            )
        });
    };
    useEffect(() => {
        userDown()

    }, [])
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
                                {(testPermission('admin') || testPermission('manager')) && <th>Permission</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {liElements}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            {userEditModal && <UserEditModal userEditData={userEditData} userEditModal={userEditModal} setUserEditModal={setUserEditModal} />}
        </Container>
    )
}
export default UserListPanel;
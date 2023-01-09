import React from "react";
import { useState } from "react";
import { Alert, Button, Container, Modal, Row, Col, Form, Table } from "react-bootstrap";
import { Multiselect } from "react-widgets";

import 'bootstrap/dist/css/bootstrap.css'
import "react-widgets/styles.css";
import "./UserEditModal.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserEditModal(props) {

    const [userId, setUserId] = useState(props.userEditData._id)
    const [username, setUsername] = useState(props.userEditData.username);
    const [email, setEmail] = useState(props.userEditData.email);
    const [phone, setPhone] = useState(props.userEditData.phone);
    const [permission, setPermission] = useState(props.userEditData.permission);
    const [error, setError] = useState()

    const navigate = useNavigate()

    const setUserState = (e) => {
        const { id, value } = e.target;
        if (id === "email") {
            if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                setEmail(value)
                setError()
            } else {
                setError("Incorrect email address format!")
            }
        }
        if (id === "phone") {
            if (/^\(?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{3})$/.test(value)) {
                setPhone(value)
                setError()
            } else {
                setError("Incorrect phone number format")
            }
        }
    }

    const sendUserData = () => {
        let userObj = {
            email: email,
            phone: phone,
            permission: permission,
        }
        axios.put(
            `http://localhost:5050/api/user/update/${userId}`,
            userObj
        ).then((res)=>{
            navigate("/UserList")
        }).catch((res, err) =>{
            setError(err)
        })
    }


    return (
        <div
            className="modal show"
            style={{ display: 'block', position: 'fixed' }}
        >
            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>CRMApp User Edit Panel</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <span className="error">{error}</span>
                    <Form onSubmit={()=>sendUserData()}>
                        <Form.Group className="mb-3">
                            <Form.Label>Username:</Form.Label>
                            <span className="username">{username}</span>
                            <Form.Label>Email:</Form.Label>
                            <Form.Control type="email" id="email" defaultValue={email} onChange={(e) => setUserState(e)} />
                            <Form.Label>Phone:</Form.Label>
                            <Form.Control type="tel" id="phone" defaultValue={phone} onChange={(e) => setUserState(e)} />
                            <Form.Label>Permission:</Form.Label>
                            <Multiselect defaultValue={permission} data={["user", "manager", "admin"]} onChange={(e) => setPermission(e)} required />
                        </Form.Group>
                        <Button variant="warning" type="submit">Edit User</Button>
                        <Button variant="secondary" onClick={() => props.setUserEditModal(false)}>Back</Button>
                    </Form>
                </Modal.Body>
            </Modal.Dialog>
        </div>
    )

}

export default UserEditModal;
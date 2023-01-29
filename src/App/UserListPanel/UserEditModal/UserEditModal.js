import React from "react";
import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { MultiSelect } from "react-multi-select-component";
import 'bootstrap/dist/css/bootstrap.css'
import "./UserEditModal.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserEditModal(props) {
    const [userId] = useState(props.userEditData._id)
    const [userData, setUserData] = useState({
        username: props.userEditData.username,
        email: props.userEditData.email,
        phone: props.userEditData.phone,
        permission: props.userEditData.permission
    })
    const [permissionLable, setPermissionLable] = useState(props.userEditData.permission.map((obj) => { return { label: obj, value: obj } }));
    const [error, setError] = useState()
    const options = [
        { label: "User", value: "user" },
        { label: "Manager", value: "manager" },
        { label: "Admin", value: "admin" },
    ]
    const navigate = useNavigate()

    const setUserState = (e) => {
        const { id, value } = e.target;
        if (id === "email") {
            if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                setUserData((prevState) => ({ ...prevState, email: value }))
                setError()
            } else {
                setError("Incorrect email address format!")
            }
        }
        if (id === "phone") {
            if (/^\(?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{3})$/.test(value)) {
                setUserData((prevState) => ({ ...prevState, phone: value }))
                setError()
            } else {
                setError("Incorrect phone number format")
            }
        }
    }
    const sendUserData = () => {
        axios.put(
            `http://crmapp.server775408.nazwa.pl/api/user/update/${userId}`,
            userData
        ).then((res) => {
            navigate("/UserList")
        }).catch((res, err) => {
            setError(err)
        })
    }
    const setPermissionData = (e) => {
        setUserData((prevState) => ({ ...prevState, permission: (e.map((opt) => opt.value)) }));
        setPermissionLable(e)
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
                    <Form onSubmit={() => sendUserData()}>
                        <Form.Group className="mb-3">
                            <Form.Label>Username:</Form.Label>
                            <span className="username">{userData.username}</span>
                            <Form.Label>Email:</Form.Label>
                            <Form.Control type="email" id="email" defaultValue={userData.email} onChange={(e) => setUserState(e)} />
                            <Form.Label>Phone:</Form.Label>
                            <Form.Control type="tel" id="phone" defaultValue={userData.phone} onChange={(e) => setUserState(e)} />
                            <Form.Label>Permission:</Form.Label>
                            <MultiSelect value={permissionLable} labelledBy="Select" options={options} onChange={(e) => { setPermissionLable(e); setPermissionData(e) }} required />
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
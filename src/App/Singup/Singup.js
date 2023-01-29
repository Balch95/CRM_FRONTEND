import React, { useState } from "react";
import { Container, Button, Form, Alert, Row, Col } from "react-bootstrap";
import axios from "axios";
import { MultiSelect } from "react-multi-select-component";
import 'bootstrap/dist/css/bootstrap.css'
import { useNavigate } from "react-router-dom";


function Singup() {

    const [confirmPassword, setConfirmPassword] = useState("")
    const [permission, setPermission] = useState([]);
    const [permissionLable, setPermissionLable] = useState([])
    const [error, setError] = useState("");
    const [userData, setUserData] = useState({
        username: "",
        password: "",
        email: "",
        phone: "",
        permission: permission
    })
    const navigate = useNavigate();
    const options = [
        { label: "User", value: "user" },
        { label: "Manager", value: "manager" },
        { label: "Admin", value: "admin" },
    ]

    const setUserState = (e) => {
        console.log(userData)
        const { id, value } = e.target;
        if (id === "username") {
            if (value.length <= 4) {
                setError("Username too short. Minimum length 4 characters.")
            } else {
                if (/^[^\s]*$/.test(value)) {
                    setUserData((prevState) => ({ ...prevState, username: value }))
                    setError()
                } else {
                    setError("Unauthorized user name! Contains empty characters!")
                }
            }
        }
        if (id === "password") {
            if (value.length <= 6) {
                setError("The password must contain a minimum of 6 characters!")
            } else {
                if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(value) && /\d/.test(value)) {
                    setConfirmPassword(value)
                    setError()
                } else {
                    setError("The password must contain a special character and a number!")
                }
            }
        }
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
        if (id === "permission") {
            if (value) {
                setPermission(value)
                setError()
            } else {
                setError("Select user permissions!")
            }

        }
        if (id === "confirmPassword") {
            if (confirmPassword === value) {
                setUserData((prevState) => ({ ...prevState, password: value }));
                setError()
            } else {
                setError("Passwords are not the same!")
            }
        }
    }
    const setPermissionData = (e) => {
        setUserData((prevState) => ({ ...prevState, permission: (e.map((opt) => opt.value)) }));
        setPermissionLable(e);
    }
    const singupNewUser = (e) => {
        e.preventDefault()
        if (userData.password && userData.username && userData.email && userData.phone && userData.permission) {
            setError()
            axios.post(
                'http://crmapp.server775408.nazwa.pl/api/user/singup',
                userData,
            ).then((res) => {
                if (res.status === 200) {
                    console.log(res);
                    navigate("/CRM_FRONTEND/UserList")
                }
                if (res.status === 201) {
                    setError(res.data.message)
                    console.log(res.data.message)
                }

            }).catch((res, err) => {
                console.log(res, err);
            })
        } else {
            setError('Please check the form')
        }
    }
    return (
        <div>
            <Container>
                <Alert variant="primary">
                    <h4>Add new user</h4>
                    <h5 className="error">{error}</h5>
                    <Form onSubmit={(e) => singupNewUser(e)}>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Username:</Form.Label>
                                    <Form.Control type="text" id="username" onChange={(e) => setUserState(e)} required />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Password:</Form.Label>
                                    <Form.Control type="password" id="password" onChange={(e) => setUserState(e)} required />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Confirm password:</Form.Label>
                                    <Form.Control type="password" id="confirmPassword" onChange={(e) => setUserState(e)} required />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control type="email" id="email" onChange={(e) => setUserState(e)} required />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Phone:</Form.Label>
                                    <Form.Control type="tel" id="phone" placeholder="Format: 123-456-789" onChange={(e) => setUserState(e)} required />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Permission:</Form.Label>
                                    <MultiSelect value={permissionLable} labelledBy="Select" options={options} onChange={(e) => { setPermissionLable(e); setPermissionData(e) }} required />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button variant="dark" type="submit" className="mx-auto">Create new user</Button>
                    </Form>
                </Alert>
            </Container>
        </div>
    )
}
export default Singup;
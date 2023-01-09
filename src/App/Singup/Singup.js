import React, { useState } from "react";
import { Container, Button, Form, Alert, Row, Col } from "react-bootstrap";
import axios from "axios";
import Multiselect from "react-widgets/cjs/Multiselect";

import 'bootstrap/dist/css/bootstrap.css'
import { useNavigate } from "react-router-dom";
import "react-widgets/styles.css";

function Singup() {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [permission, setPermission] = useState([]);
    const [error, setError] = useState();

    const navigate = useNavigate();

    console.log(permission)

    const setUserState = (e) => {
        const { id, value } = e.target;
        if (id === "username") {
            if (value.length <= 4) {
                setError("Username too short. Minimum length 4 characters.")
            } else {
                if (/^[^\s]*$/.test(value)) {
                    setUsername(value)
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
        if (id === "permission") {
            if (value) {
                setPermission(value)
                setError()
            } else {
                setError("Select user permissions!")
            }

        }
        if(id === "confirmPassword"){
            if(confirmPassword === value){
                setPassword(value);
                setError()
            } else {
                setError("Passwords are not the same!")
            }
        }
    }

    const setPermissionData = (e) => {
        setPermission(e)
    }

    const singupNewUser = (e) => {
        e.preventDefault()
        let userObj = {
            username: username,
            password: password,
            email: email,
            phone: phone,
            permission: permission
        }
        axios.post(
            'http://localhost:5050/api/user/singup',
            userObj,
        ).then((res) => {
            if (res.status === 200) {
                console.log(res);
                navigate("/UserList")
            }
            if (res.status === 201) {
                setError(res.data.message)
                console.log(res.data.message)
            }

        }).catch((res, err) => {
            console.log(res, err);
        })


        console.log(userObj);
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
                                    <Multiselect defaultValue={permission} data={["user", "manager", "admin"]} onChange={(e) => setPermissionData(e)} required />
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
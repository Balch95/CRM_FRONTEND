import React, { useState } from "react";
import { Container, Button, Form, Alert, Row, Col } from "react-bootstrap";
import axios from "axios";
import { MultiSelect } from "react-multi-select-component";

import 'bootstrap/dist/css/bootstrap.css'
import { useNavigate } from "react-router-dom";


// const permissonOption = [
//     {
//         value: "user",
//         text: "User"
//     },
//     {
//         value: "manager",
//         text: "Manager"
//     },
//     {
//         value: "admin",
//         text: "Admin"
//     }
// ]


function Singup() {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [permission, setPermission] = useState();
    const [error, setError] = useState();

    const permissonOption = [
        {
            value: "user",
            label: "User"
        },
        {
            value: "manager",
            label: "Manager"
        },
        {
            value: "admin",
            label: "Admin"
        }
    ]

    const setUserState = (e) => {
        const { id, value } = e.target;
        if (id === "username") {
            setUsername(value)
        }
        if (id === "password") {
            setPassword(value)
        }
        if (id === "email") {
            setEmail(value)
        }
        if (id === "phone") {
            setPhone(value)
        }
        if (id === "permission") {
            setPermission.push(value)
        }
    }



    return (
        <div>
            <Container>
                <Alert variant="primary">
                    <h4>Add new user</h4>
                    <h5 className="error">{error}</h5>
                    <Form onSubmit={console.log("send")}>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Username:</Form.Label>
                                    <Form.Control type="text" id="username" onChange={(e) => setUserState(e)} required/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Password:</Form.Label>
                                    <Form.Control type="password" id="password" onChange={(e) => setUserState(e)} required/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Confirm password:</Form.Label>
                                    <Form.Control type="password" id="confirmpassword" onChange={(e) => setUserState(e)} required/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control type="email" id="email" onChange={(e) => setUserState(e)} required/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Phone:</Form.Label>
                                    <Form.Control type="tel" id="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}" placeholder="Format: 123-456-789" onChange={(e) => setUserState(e)} required/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Permission:</Form.Label>
                                   <MultiSelect options={permissonOption} labelledBy="Select" onChange={(e) => console.log(e)}/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <h5>NIP-code:</h5>
                                    <Form.Control type="number" id="nip" onChange={(e) => setUserState(e)} />
                                </Form.Group>
                            </Col>
                            <Col>
                            </Col>
                        </Row>
                        <Button variant="dark" type="submit" className="mx-auto">Add Client</Button>
                    </Form>
                </Alert>
            </Container>
        </div>
    )
}

export default Singup;
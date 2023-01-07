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
    const [permission, setPermission] = useState([]);
    const [error, setError] = useState();

    const navigate = useNavigate();

    const permissonOption = [
        {
            label: "User",
            value: "user"
        },
        {
            label: "Manager",
            value: "manager"
        },
        {
            label: "Admin",
            value: "admin"
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
            setPermission(value)
        }
    }

    const setPermissionData = (e) =>{
        setPermission(e)
    }

    const singupNewUser = (e) =>{
        e.preventDefault()
        let userObj ={
            username: username,
            password: password,
            email: email,
            phone: phone,
            permission: permission.map((permission)=>{return permission.value})
        }

        axios.post(
            'http://localhost:5050/api/user/singup',
            userObj,
        ).then((res) => {
            if(res.status === 200){
                console.log(res);
                navigate("/UserList")
            }
            if(res.status === 201){
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
                    <Form onSubmit={(e)=>singupNewUser(e)}>
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
                                   <MultiSelect options={permissonOption} value={permission} onChange={(e)=>setPermissionData(e)} required/>
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
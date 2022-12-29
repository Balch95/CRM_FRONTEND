import React, { useState } from "react";
import { Alert, Button, Container, Modal, Row, Col, Form, Table } from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.css'
import axios from "axios";

function LoginModal(props) {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    console.log(props.user)

    const setData = (e) => {
        const { id, value } = e.target;

        if (id === 'username') {
            setUsername(value)
        }
        if (id === 'password') {
            setPassword(value)
        }
    }

    const sendLogin = () => {
        let loginData = {
            username: username,
            password: password
        }
        console.log(loginData)
        axios.post(
            'http://localhost:5050/api/user/login',
            loginData
            ).then((res)=>{
               if(res.status === 201){
                setError(res.data.message)
                console.log(res.data.message)
               }
               if(res.status === 200){
                localStorage.setItem('jwt_user', JSON.stringify(res.data.jwt))
                console.log(res.data)
                setError("")
               }
            }).catch((res,err)=>{
                console.log(res)
                console.log(err)
            })
    }

    return (
        <div
            className="modal show"
            style={{ display: 'block', position: 'fixed' }}
        >
            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>CRMApp Login Panel</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {error}
                    <Form onSubmit={(e)=>{sendLogin(e)}}>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" id="username" onChange={(e)=>setData(e)}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" id="password" onChange={(e)=>setData(e)}/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal.Dialog>
        </div>
    )

}

export default LoginModal;
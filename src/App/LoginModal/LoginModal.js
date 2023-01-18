import React, { useState } from "react";
import { Button,  Modal, Form } from "react-bootstrap";
import { useCookies } from 'react-cookie';
import './LoginModal.css'
import 'bootstrap/dist/css/bootstrap.css'
import axios from "axios";

function LoginModal(props) {
    const [loginValue, setLoginValue] = useState({
        username: "",
        password: ""
    })
    const [cookies, setCookie] = useCookies(['jwt_user'])
    const [error, setError] = useState();
    const cookiesSet = (jwt) => {
        setCookie('TokenTime', jwt, {path: '/', maxAge: 600})
    }
    const setData = (e) => {
        setLoginValue({...loginValue, [e.target.id]: e.target.value})
    }
    const sendLogin = (e) => {
        e.preventDefault()
        axios.post(
            'http://localhost:5050/api/user/login',
            loginValue
            ).then((res)=>{
               if(res.status === 201){
                setError(res.data.message)
                console.log(res.data.message)
               }
               if(res.status === 200){
                localStorage.setItem('jwt_user', JSON.stringify(res.data.jwt))
                localStorage.setItem('userPermission', JSON.stringify(res.data.userPermission))
                console.log(res)
                setError("");
                cookiesSet(res.data.jwt);
                window.location.reload()
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
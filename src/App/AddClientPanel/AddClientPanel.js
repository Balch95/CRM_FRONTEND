import React, { useState } from "react";
import { Container, Button, Form, Alert, Row, Col } from "react-bootstrap";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css'
import './AddClientPanel.css'
import { useNavigate } from "react-router-dom";

function AddClientPanel(props) {

    const [company, setCompany] = useState(
        {
            companyName: "",
            address:{
                city: "",
                number:"",
                street:"",
                zipCode:"",
            },
            email:"",
            phone:"",
            nip:""
        }
    )

    const navigate = useNavigate();
    const [error, setError] = useState("")

    const setCompanyState = (e) => {
        const { id, value } = e.target

        if (id === "companyName") {
            setCompany((prevState)=>({...prevState, companyName:value}))
        }
        if (id === "city") {
            setCompany((prevState)=>({...prevState, address:{...prevState.address, city:value}}))
        }
        if (id === "number") {
            setCompany((prevState)=>({...prevState, address:{...prevState.address, number:value}}))
        }
        if (id === "street") {
            setCompany((prevState)=>({...prevState, address:{...prevState.address, street:value}}))
        }
        if (id === "zipCode") {
            if (/[0-9]{2}[-][0-9]{3}/.test(value)) {
                setCompany((prevState)=>({...prevState, address:{...prevState.address, zipCode:value}}))
                setError()
            } else {
                setError("Incorrect zip code")
            }
        }
        if (id === "phone") {
            if (/^\(?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{3})$/.test(value)) {
                setCompany((prevState)=>({...prevState, phone:value}))
                setError()
            } else {
                setError("Incorrect phone number format")
            }
        }
        if (id === "email") {
            if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                setCompany((prevState)=>({...prevState, email:value}))
                setError()
            } else {
                setError("Incorrect email address format!")
            }
        }
        if (id === "nip") {
            if (value.length < 10) {
                setError("NIP code too short")
            } else if (value.length > 10) {
                setError("NIP code too long")
            } else {
                setCompany((prevState)=>({...prevState, nip:value}))
                setError()
            }
        }
    }

    const addNewCompany = (e) => {
        e.preventDefault()
        axios.post(
            'http://localhost:5050/api/client/add',
            company,
        ).then((res) => {
            if (res.status === 200) {
                console.log(res);
                navigate("/")
            }
            if (res.status === 201) {
                setError(res.data.message)
                console.log(res.data.message)
            }

        }).catch((res, err) => {
            console.log(res, err);
        })
    }

    return (
        <div className="AddClientPanel">
            <Container>
                <Alert variant="primary">
                    <h4>AddClient</h4>
                    <h5 className="error">{error}</h5>
                    <Form onSubmit={(e) => { addNewCompany(e) }}>
                        <Row>
                            <Col>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label><h5>Companny Name:</h5></Form.Label>
                                    <Form.Control type="text" id="companyName" onChange={(e) => setCompanyState(e)} />
                                </Form.Group>
                            </Col>
                            <Col>
                            </Col>
                        </Row>
                        <h5>Address</h5>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Street:</Form.Label>
                                    <Form.Control type="text" id="street" onChange={(e) => setCompanyState(e)} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Number:</Form.Label>
                                    <Form.Control type="text" id="number" onChange={(e) => setCompanyState(e)} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>ZIP:</Form.Label>
                                    <Form.Control type="text" id="zipCode" onChange={(e) => setCompanyState(e)} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>City:</Form.Label>
                                    <Form.Control type="text" id="city" onChange={(e) => setCompanyState(e)} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Phone number:</Form.Label>
                                    <Form.Control type="text" id="phone" onChange={(e) => setCompanyState(e)} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control type="email" id="email" onChange={(e) => setCompanyState(e)} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <h5>NIP-code:</h5>
                                    <Form.Control type="number" id="nip" onChange={(e) => setCompanyState(e)} />
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
export default AddClientPanel;
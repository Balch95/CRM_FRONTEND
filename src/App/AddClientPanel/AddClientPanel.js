import React, { useState } from "react";
import { Container, Button, Form, Alert, Row, Col } from "react-bootstrap";
import axios from "axios";

import 'bootstrap/dist/css/bootstrap.css'
import './AddClientPanel.css'
import { useNavigate } from "react-router-dom";





function AddClienPanel(props) {

    const [companyName, setCompanyName] = useState();
    const [city, setCity] = useState();
    const [number, setNumber] = useState();
    const [street, setStreet] = useState();
    const [zipCode, setZipCode] = useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    const [nip, setNip] = useState();


    const navigate = useNavigate();
    const [error, setError] = useState("")

    const setCompayState = (e) => {
        const { id, value } = e.target

        if (id === "companyName") {
            setCompanyName(value)
        }
        if (id === "city") {
            setCity(value)
        }
        if (id === "number") {
            setNumber(value)
        }
        if (id === "street") {
            setStreet(value)
        }
        if (id === "zipCode") {
            if (/[0-9]{2}[-][0-9]{3}/.test(value)) {
                setZipCode(value)
                setError()
            } else {
                setError("Incorrect zip code")
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
        if (id === "email") {
            if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                setEmail(value)
                setError()
            } else {
                setError("Incorrect email address format!")
            }
        }
        if (id === "nip") {
            if (value.length < 10) {
                setError("NIP code too short")
            } else if (value.length  > 10) {
                setError("NIP code too long")
            } else {
                setNip(value)
                setError()
            }
        }
    }


    const addNewCompany = (e) => {
        e.preventDefault()
        let companyDataObj = {
            companyName: companyName,
            address: {
                city: city,
                number: number,
                street: street,
                zipCode: zipCode,
            },
            phone: phone,
            email: email,
            nip: nip,
            action: []
        }

        axios.post(
            'http://localhost:5050/api/client/add',
            companyDataObj,
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


        console.log(companyDataObj);


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
                                    <Form.Control type="text" id="companyName" onChange={(e) => setCompayState(e)} />
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
                                    <Form.Control type="text" id="street" onChange={(e) => setCompayState(e)} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Number:</Form.Label>
                                    <Form.Control type="text" id="number" onChange={(e) => setCompayState(e)} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>ZIP:</Form.Label>
                                    <Form.Control type="text" id="zipCode" onChange={(e) => setCompayState(e)} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>City:</Form.Label>
                                    <Form.Control type="text" id="city" onChange={(e) => setCompayState(e)} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Phone number:</Form.Label>
                                    <Form.Control type="text" id="phone" onChange={(e) => setCompayState(e)} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control type="email" id="email" onChange={(e) => setCompayState(e)} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <h5>NIP-code:</h5>
                                    <Form.Control type="number" id="nip" onChange={(e) => setCompayState(e)} />
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

export default AddClienPanel;
import React, { useState } from "react";
import { Container, Button, Form, Alert, Row, Col } from "react-bootstrap";
import axios from "axios";

import 'bootstrap/dist/css/bootstrap.css'
import './AddClientPanel.css'
import { useNavigate } from "react-router-dom";





function AddClienPanel(props) {

    const [companyName, setCompanyName] = useState();
    const [street, setStreet] = useState();
    const [zipCode, setZipCode] = useState();
    const [number, setNumber] = useState();
    const [city, setCity] = useState();
    const [nip, setNip] = useState();
    const navigate = useNavigate();

    const setCompayData = (e) => {

        const { id, value } = e.target;

        if (id === 'companyName') {
            setCompanyName(value)
        }
        if (id === 'street') {
            setStreet(value)
        }
        if (id === 'number') {
            setNumber(value)
        }
        if (id === 'zipCode') {
            setZipCode(value)
        }
        if (id === 'city') {
            setCity(value)
        }
        if (id === 'nip') {
            setNip(value)
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
                zipCode: zipCode
            },
            nip: nip
        }

        axios.post(
            'http://localhost:5050/api/client/add',
            companyDataObj,
        ).then((res) => {
            console.log(res);
            navigate("/")
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
                    <Form onSubmit={(e)=>{addNewCompany(e)}}>
                        <Row>
                            <Col>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label><h5>Companny Name:</h5></Form.Label>
                                    <Form.Control type="text" id="companyName" onChange={(e) => setCompayData(e)} />
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
                                    <Form.Control type="text" id="street" onChange={(e) => setCompayData(e)} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Number:</Form.Label>
                                    <Form.Control type="text" id="number" onChange={(e) => setCompayData(e)} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>ZIP:</Form.Label>
                                    <Form.Control type="text" id="zipCode" onChange={(e) => setCompayData(e)} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>City:</Form.Label>
                                    <Form.Control type="text" id="city" onChange={(e) => setCompayData(e)} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <h5>NIP-code:</h5>
                                    <Form.Control type="number" id="nip" onChange={(e) => setCompayData(e)} />
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
import React, { useState } from "react";
import { Container, Button, Form, Alert, Row, Col } from "react-bootstrap";
import axios from "axios";

import 'bootstrap/dist/css/bootstrap.css'
import './AddClientPanel.css'
import { useNavigate } from "react-router-dom";





function AddClienPanel(props) {

    const [companyData, setCompayData] = useState({
        companyName: "",
        street: "",
        zipCode: "",
        number: "",
        city: "",
        nip: ""
    })
    const navigate = useNavigate();
    const [error, setError] = useState("")

    const setCompayState = (e) => {
        setCompayData({...companyData, [e.target.id]: e.target.value})
    }


    const addNewCompany = (e) => {
        e.preventDefault()
        let companyDataObj = {
            companyName: companyData.companyName,
            address: {
                city: companyData.city,
                number: companyData.number,
                street: companyData.street,
                zipCode: companyData.zipCode,
            },
            nip: companyData.nip,
            action: []
        }

        axios.post(
            'http://localhost:5050/api/client/add',
            companyDataObj,
        ).then((res) => {
            if(res.status === 200){
                console.log(res);
                navigate("/")
            }
            if(res.status === 201){
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
                    <Form onSubmit={(e)=>{addNewCompany(e)}}>
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
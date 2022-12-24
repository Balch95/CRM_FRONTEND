import React, { useState } from "react";
import { Alert, Button, Container, Modal, Row, Col, Form, Table } from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.css'
import axios from "axios";

function AddActionPanel(props) {

    console.log(props.clientData)
    
    const [content, setContent] = useState();
    const [actionType, setActionType] = useState();
    const [date, setDate] = useState();

    const sendActionData = (e) =>{
        let setActionData ={
            contents: content,
            actionType: actionType,
            date: date,
        }

        console.log(setActionData)
        axios.post(
            `http://localhost:5050/api/action/add/${props.clientData._id}`,
            setActionData,
        ).then((res) => {
            console.log(res)
            props.getClient()
            props.setActionPanelModal(false)
        }).catch((res, err) => {
            console.log(res, err);
        })
        props.getClient()
        props.setActionPanelModal(false)
    }

    const setActionData = (e) => {

        const { id, value } = e.target;

        if (id === 'contents') {
            setContent(value)
        }
        if (id === 'actionType') {
            setActionType(value)
        }
        if (id === 'date') {
            setDate(value)
        }
    }




    return (
        <div className="modal show" style={{ display: 'block', position: 'fixed' }}>
            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>Client Action Panel</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Alert>
                        <Form>
                            <h5>Action</h5>
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Action content:</Form.Label>
                                        <Form.Control type="text" id="contents" onChange={(e)=>setActionData(e)}/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Action type:</Form.Label>
                                        <Form.Select aria-label="Action type" id="actionType" onChange={(e)=>setActionData(e)}>
                                            <option>Open this select menu</option>
                                            <option value="email">Email</option>
                                            <option value="phone">Phone</option>
                                            <option value="meeting">Meeting</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Date:</Form.Label>
                                        <Form.Control type="date" id="date" onChange={(e)=>setActionData(e)}/>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                    </Alert>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => props.setActionPanelModal(false)}>Close</Button>
                    <Button variant="primary" onClick={(e)=> sendActionData(e)}>Save changes</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    )

}

export default AddActionPanel
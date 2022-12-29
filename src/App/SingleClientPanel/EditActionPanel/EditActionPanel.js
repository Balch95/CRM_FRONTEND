import React, { useState } from "react";
import { Alert, Button, Container, Modal, Row, Col, Form, Table } from "react-bootstrap";


import 'bootstrap/dist/css/bootstrap.css'
import axios from "axios";

function EditActionPanel(props) {

    console.log(props.editActionData)
    
    const [content, setContent] = useState();
    const [actionType, setActionType] = useState();
    const [date, setDate] = useState();

    const sendActionData = (e) =>{
        let setActionData ={
            contents: content,
            actionType: actionType,
            date: date,
            client: props.clientData._id
        }

        console.log(setActionData)
        axios.put(
            `http://localhost:5050/api/action/update/${props.editActionData._id}`,
            setActionData,
        ).then((res) => {
            console.log(res)
            props.getClient()
            props.setEditActionPanelModal(false)
        }).catch((res, err) => {
            console.log(res, err);
        })
        props.getClient()
        props.setEditActionPanelModal(false)
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
                    <Modal.Title>Client Edit Action Panel</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Alert>
                        <Form>
                            <h5>Action</h5>
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Action content:</Form.Label>
                                        <Form.Control type="text" id="contents" onChange={(e)=>setActionData(e)} defaultValue={props.editActionData.contents}/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Action type:</Form.Label>
                                        <Form.Select aria-label="Action type" id="actionType" onChange={(e)=>setActionData(e)}>
                                            <option>{props.editActionData.actionType}</option>
                                            <option value="Email">Email</option>
                                            <option value="Phone">Phone</option>
                                            <option value="Meeting">Meeting</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Date:</Form.Label>
                                        <Form.Control type="date" id="date" onChange={(e)=>setActionData(e)} defaultValue={props.editActionData.date.slice(0, 10)}/>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                    </Alert>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => props.setEditActionPanelModal(false)}>Close</Button>
                    <Button variant="primary" onClick={(e)=> sendActionData(e)}>Save changes</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    )

}

export default EditActionPanel
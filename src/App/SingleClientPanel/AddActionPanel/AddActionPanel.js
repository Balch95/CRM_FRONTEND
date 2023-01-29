import React, { useState } from "react";
import { Alert, Button, Modal, Row, Col, Form} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css'
import axios from "axios";

function AddActionPanel(props) {
    const [actionData, setActionData] = useState({
        content: "",
        actionType: "",
        date:""
    })
    const sendActionData = (e) =>{
        axios.post(
            `http://crmapp.server775408.nazwa.pl/api/action/add/${props.clientData._id}`,
         actionData,
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
    const setActionState = (e) => {
        setActionData({...actionData, [e.target.id]: e.target.value})
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
                                        <Form.Control type="text" id="contents" onChange={(e)=> setActionState(e)}/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Action type:</Form.Label>
                                        <Form.Select aria-label="Action type" id="actionType" onChange={(e)=> setActionState(e)}>
                                            <option>Open this select menu</option>
                                            <option value="Email">Email</option>
                                            <option value="Phone">Phone</option>
                                            <option value="Meeting">Meeting</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Date:</Form.Label>
                                        <Form.Control type="date" id="date" onChange={(e)=> setActionState(e)}/>
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
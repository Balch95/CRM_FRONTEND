import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Alert, Button, Container, Modal, Row, Col, Form, Table } from "react-bootstrap";
import { format } from "fecha";
import './SingleClientPanel.css'
import 'bootstrap/dist/css/bootstrap.css'
import AddActionPanel from "./AddActionPanel/AddActionPanel";
import EditActionPanel from "./EditActionPanel/EditActionPanel";
import { testPermission } from "../helpservices/testPermision";

function SingleClientPanel() {
    const [editDataClientModal, setEditDataClientModal] = useState(false)
    const [actionPanelModal, setActionPanelModal] = useState(false)
    const [actionEditPanelModal, setEditActionPanelModal] = useState(false)
    const [error, setError] = useState([])
    const [editActionData, setEditActionData] = useState([])
    const [client, setClient] = useState()
    const [companyEdit, setCompanyEdit] = useState({
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
    })
    const [action] = useState([]);
    let { id } = useParams();

    const setCompanyData = (e) => {
        const { id, value } = e.target

        if (id === "companyName") {
            setCompanyEdit((prevState) => ({ ...prevState, companyName: value }))
        }
        if (id === "city") {
            setCompanyEdit((prevState) => ({ ...prevState, address: { ...prevState.address, city: value } }))
        }
        if (id === "number") {
            setCompanyEdit((prevState) => ({ ...prevState, address: { ...prevState.address, number: value } }))
        }
        if (id === "street") {
            setCompanyEdit((prevState) => ({ ...prevState, address: { ...prevState.address, street: value } }))
        }
        if (id === "zipCode") {
            if (/[0-9]{2}[-][0-9]{3}/.test(value)) {
                setCompanyEdit((prevState) => ({ ...prevState, address: { ...prevState.address, zipCode: value } }))
                setError()
            } else {
                setError("Incorrect zip code")
            }
        }
        if (id === "phone") {
            if (/^\(?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{3})$/.test(value)) {
                setCompanyEdit((prevState) => ({ ...prevState, phone: value }))
                setError()
            } else {
                setError("Incorrect phone number format")
            }
        }
        if (id === "email") {
            if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                setCompanyEdit((prevState) => ({ ...prevState, email: value }))
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
                setCompanyEdit((prevState) => ({ ...prevState, nip: value }))
                setError()
            }
        }
    }
    const editCompany = () => {
        axios.put(
            `http://localhost:5050/api/client/update/${id}`,
            companyEdit,
        ).then((res) => {
            console.log(res);
            setEditDataClientModal(false)
            getClient()
        }).catch((res, err) => {
            console.log(res, err);
        })
    };
    const getClient = () => {
        axios
            .get(`http://localhost:5050/api/client/${id}`)
            .then((res) => {
                setClient(res.data)
                setCompanyEdit(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const deleteAction = (clientActionId) => {
        axios.delete(
            `http://localhost:5050/api/action/remove/${client.data._id}`,
            {
                data: { clientActionId: clientActionId }
            }
        ).then((res) => {
            console.log(res)
            getClient()
        }).catch((res, err) => {
            console.log(res, err);
        })
    }
    useEffect(() => {
        getClient()
    }, [])
    
    let actionLiElement = action.map((listObj, index) => {
        return (
            <tr key={listObj._id}>
                <td>{index + 1}</td>
                <td>{listObj.contents}</td>
                <td>{listObj.actionType}</td>
                <td>{format(new Date(listObj.date), 'isoDate')}</td>
                <td><Button variant="warning" onClick={() => { setEditActionData(listObj); setEditActionPanelModal(true) }}>Edit Action</Button></td>
                {(testPermission("admin") || testPermission("manager")) && <td><Button variant="danger" onClick={() => deleteAction(listObj._id)}>Delete Action</Button></td>}
            </tr>
        )
    })
    
    return (
        <Container>
            <h2>Client Panel</h2>
            {client && <h3><b>Client: {client.companyName}</b></h3>}
            {client && <Container>
                <Row>
                    <Col>
                        <Alert>
                            <ul>
                                <li>Street: {client.address.street}</li>
                                <li>Number: {client.address.number}</li>
                                <li>ZIP: {client.address.zipCode}</li>
                                <li>City: {client.address.city}</li>
                                <li>Phone: {client.phone}</li>
                                <li>Email: {client.email}</li>
                                <li>NIP:{client.nip}</li>
                            </ul>
                        </Alert>
                    </Col>
                </Row>
                {(testPermission('admin') || testPermission('manager')) && <Button variant="warning" onClick={() => setEditDataClientModal(true)}>Edit Client</Button>}
                <Row>
                    <Col>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Content</th>
                                    <th>Action</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {actionLiElement}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Button variant="success" onClick={() => setActionPanelModal(true)}>Add action</Button>
            </Container>}
            {editDataClientModal && <div className="modal show" style={{ display: 'block', position: 'fixed' }}>
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>Edit Client</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Alert>
                            <span className="error">{error}</span>
                            <Form>
                                <Row>
                                    <Col>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label><h5>Company Name:</h5></Form.Label>
                                            <Form.Control type="text" id="companyName" defaultValue={client.companyName} onChange={(e) => setCompanyData(e)} />
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
                                            <Form.Control type="text" id="street" defaultValue={client.address.street} onChange={(e) => setCompanyData(e)} />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Number:</Form.Label>
                                            <Form.Control type="text" id="number" defaultValue={client.address.number} onChange={(e) => setCompanyData(e)} />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>ZIP:</Form.Label>
                                            <Form.Control type="text" id="zipCode" defaultValue={client.address.zipCode} onChange={(e) => setCompanyData(e)} />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>City:</Form.Label>
                                            <Form.Control type="text" id="city" defaultValue={client.address.city} onChange={(e) => setCompanyData(e)} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Phone:</Form.Label>
                                            <Form.Control type="text" id="phone" defaultValue={client.phone} onChange={(e) => setCompanyData(e)} />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Email:</Form.Label>
                                            <Form.Control type="email" id="email" defaultValue={client.email} onChange={(e) => setCompanyData(e)} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            <h5>NIP-code:</h5>
                                            <Form.Control type="number" id="nip" defaultValue={client.nip} onChange={(e) => setCompanyData(e)} />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                    </Col>
                                </Row>

                            </Form>
                        </Alert>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setEditDataClientModal(false)}>Close</Button>
                        <Button variant="primary" onClick={() => editCompany()}>Save changes</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>}
            {actionPanelModal && <AddActionPanel clientData={client} setActionPanelModal={setActionPanelModal} actionPanelModal={actionPanelModal} getClient={getClient} />}
            {actionEditPanelModal && <EditActionPanel clientData={client} editActionData={editActionData} setEditActionPanelModal={setEditActionPanelModal} actionEditPanelModal={actionEditPanelModal} getClient={getClient} />}
        </Container>
    )
}
export default SingleClientPanel
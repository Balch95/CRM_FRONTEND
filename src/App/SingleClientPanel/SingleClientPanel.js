import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Alert, Button, Container, Modal, Row, Col, Form, Table } from "react-bootstrap";
import { format } from "fecha";



import 'bootstrap/dist/css/bootstrap.css'
import AddActionPanel from "./AddActionPanel/AddActionPanel";
import EditActionPanel from "./EditActionPanel/EditActionPanel";


function SingleClientPanel() {

    const [client, setClient] = useState()
    const [editDataClientModal, setEditDataClientModal] = useState(false)
    const [actionPanelModal, setActionPanelModal] = useState(false)
    const [actionEditPanelModal, setEditActionPanelModal] = useState(false)

    const [editActionData, setEditActionData] = useState([])

    const [companyName, setCompanyName] = useState();
    const [street, setStreet] = useState();
    const [zipCode, setZipCode] = useState();
    const [number, setNumber] = useState();
    const [city, setCity] = useState();
    const [nip, setNip] = useState();
    const [action, setAction] = useState([]);


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

    const editCompan = () => {

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

        axios.put(
            `http://localhost:5050/api/client/update/${id}`,
            companyDataObj,
        ).then((res) => {
            console.log(res);
            setEditDataClientModal(false)
            getClient()
        }).catch((res, err) => {
            console.log(res, err);
        })


        console.log(companyDataObj);


    }

    let { id } = useParams()


    const getClient = () => {
        axios
            .get(`http://localhost:5050/api/client/${id}`)
            .then((res) => {
                setClient(res)
                setCompanyName(res.data.companyName)
                setStreet(res.data.address.street)
                setNumber(res.data.address.number)
                setZipCode(res.data.address.zipCode)
                setCity(res.data.address.city)
                setNip(res.data.nip)
                setAction(res.data.action)
                console.log(res)
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

    

    let actionLiElement = action.map((listObj, index) => {
        return (
            <tr key={listObj._id}>
                <td>{index + 1}</td>
                <td>{listObj.contents}</td>
                <td>{listObj.actionType}</td>
                <td>{format(new Date(listObj.date), 'isoDate')}</td>
                <td><Button variant="warning" onClick={() => { setEditActionData(listObj); setEditActionPanelModal(true) }}>Edit Action</Button></td>
                <td><Button variant="danger" onClick={() => deleteAction(listObj._id)}>Delete Action</Button></td>
            </tr>
        )
    })


    useEffect(() => {
        getClient()
    }, [])



    return (
        <div>
            <h2>Client Panel</h2>
            {client && <h3><b>Client: {client.data.companyName}</b></h3>}
            {client && <Container>
                <Row>
                    <Col>
                        <Alert>
                            <ul>
                                <li>Street: {client.data.address.street}</li>
                                <li>Number: {client.data.address.number}</li>
                                <li>ZIP: {client.data.address.zipCode}</li>
                                <li>City: {client.data.address.city}</li>
                                <li>NIP:{client.data.nip}</li>
                            </ul>
                        </Alert>
                    </Col>
                </Row>
                <Button variant="warning" onClick={() => setEditDataClientModal(true)}>Edit Client</Button>
                <Row>
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
                            <Form>
                                <Row>
                                    <Col>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label><h5>Companny Name:</h5></Form.Label>
                                            <Form.Control type="text" id="companyName" defaultValue={client.data.companyName} onChange={(e) => setCompayData(e)} />
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
                                            <Form.Control type="text" id="street" defaultValue={client.data.address.street} onChange={(e) => setCompayData(e)} />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Number:</Form.Label>
                                            <Form.Control type="text" id="number" defaultValue={client.data.address.number} onChange={(e) => setCompayData(e)} />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>ZIP:</Form.Label>
                                            <Form.Control type="text" id="zipCode" defaultValue={client.data.address.zipCode} onChange={(e) => setCompayData(e)} />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>City:</Form.Label>
                                            <Form.Control type="text" id="city" defaultValue={client.data.address.city} onChange={(e) => setCompayData(e)} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            <h5>NIP-code:</h5>
                                            <Form.Control type="number" id="nip" defaultValue={client.data.nip} onChange={(e) => setCompayData(e)} />
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
                        <Button variant="primary" onClick={() => editCompan()}>Save changes</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>}
            {actionPanelModal && <AddActionPanel clientData={client.data} setActionPanelModal={setActionPanelModal} actionPanelModal={actionPanelModal} getClient={getClient} />}
            {actionEditPanelModal && <EditActionPanel clientData={client.data} editActionData={editActionData} setEditActionPanelModal={setEditActionPanelModal} actionEditPanelModal={actionEditPanelModal} getClient={getClient} />}
        </div>
    )
}

export default SingleClientPanel
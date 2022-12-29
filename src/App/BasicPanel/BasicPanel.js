import React, {useState, useEffect} from "react";
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table'
import { Container, Button, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import 'bootstrap/dist/css/bootstrap.css'
import './BasicPanel.css'


function BasicPanel(props) {

    const [clientList, setClientList] = useState([]);

    const clientDown = (e) => {

        axios
            .get("http://localhost:5050/api/client/all")
            .then((res) => {
                setClientList(res.data);
                console.log(res);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const clientDelete = (e, id) => {

        axios
            .delete(`http://localhost:5050/api/client/remove/${id}`)
            .then(() => {
                clientDown()
            })
    }

    useEffect(() => {
        clientDown();
    }, [])

    const navigate = useNavigate()

    const SingleClientButton = (e, id) => {
        e.preventDefault(e)
        navigate(`SingleClient/${id}`)
    }

    let liElements = clientList.map((listObj) => {
        return (
            <Container key={listObj._id}>
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>{listObj.companyName}</Accordion.Header>
                        <Accordion.Body>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>NIP</th>
                                        <th>Address</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{listObj.nip}</td>
                                        <td>
                                            <ul>
                                                <li>Street: {listObj.address.street}</li>
                                                <li>Number: {listObj.address.number}</li>
                                                <li>ZIP: {listObj.address.zipCode}</li>
                                                <li>City: {listObj.address.city}</li>
                                            </ul>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                            <Button variant="danger" onClick={(e) => { clientDelete(e, listObj._id) }}>Delete Client</Button>
                            <Button variant="success" onClick={(e) => { SingleClientButton(e, listObj._id) }}>Client Action</Button>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Container>
        );
    });

    return (
        <div>
            <h1>Client List</h1>
            <Accordion>
                {liElements}
            </Accordion>
        </div>
    )
}

export default BasicPanel;
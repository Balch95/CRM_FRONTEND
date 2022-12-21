import React from "react";

import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table'
import { Container, Button } from "react-bootstrap";


import 'bootstrap/dist/css/bootstrap.css'
import './BasicPanel.css'



function BasicPanel(props) {

    let liElements = props.clientList.map((listObj) => {
        return (
            <Container>
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
                                <Button variant="danger" onClick={(e)=>{props.clientDelete(e, listObj._id)}}>Delete Client</Button>
                            </Table>
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
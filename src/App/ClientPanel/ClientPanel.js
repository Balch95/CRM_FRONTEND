import React, {useState, useEffect} from "react";
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table'
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css'
import './ClientPanel.css'
import { testPermission } from "../helpservices/testPermision";

function ClientPanel(props) {
    const [clientList, setClientList] = useState([]);
    const clientDown = (e) => {
        axios
            .get("http://crmapp.server775408.nazwa.pl/api/client/all")
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
            .delete(`http://crmapp.server775408.nazwa.pl/api/client/remove/${id}`)
            .then(() => {
                clientDown()
            })
    }
    useEffect(() => {
        clientDown();
    }, [])
    const navigate = useNavigate()
    const SingleClientButton = (id) => {
        navigate(`/CRM_FRONTEND/SingleClient/${id}`)
    }
    let liElements = [];
    if(!clientList.message){
        liElements = clientList.map((listObj) => {
            return (
              
                    <Accordion key={listObj._id} defaultActiveKey="0" className="test">
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
                                                    <li>Phone: {listObj.phone}</li>
                                                    <li>Email: {listObj.email}</li>
                                                </ul>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                               {(testPermission("admin") || testPermission('manager')) && <Button variant="danger" onClick={(e) => { clientDelete(e, listObj._id) }}>Delete Client</Button>}
                                <Button variant="success" onClick={() => { SingleClientButton(listObj._id) }}>Client Action</Button>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
            );
        });
    }else if(clientList.message){
        liElements = clientList.message
    }
    return (
        <div>
            <h1>Client List</h1>
            <Accordion>
                {liElements}
            </Accordion>
        </div>
    )
}
export default ClientPanel;
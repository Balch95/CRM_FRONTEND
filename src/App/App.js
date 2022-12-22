import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Nav, Navbar } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";

import './App.css';
import 'bootstrap/dist/css/bootstrap.css'

import BasicPanel from './BasicPanel/BasicPanel';
import AddClienPanel from './AddClientPanel/AddClientPanel';
import SingleClientPanel from './SingleClientPanel/SingleClientPanel';

function App() {

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

  console.log(clientList);


  return (
    <Container>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand>CRMApp</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/AddClientPanel">Add Client</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<BasicPanel clientList={clientList} clientDelete={clientDelete} />} />
        <Route path="/AddClientPanel" element={<AddClienPanel clientDown={clientDown} />} />
        <Route path="/SingleClient/:id" element={<SingleClientPanel />} />
      </Routes>


    </Container>


  );
}

export default App;

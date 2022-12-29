import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Nav, Navbar } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";

import './App.css';
import 'bootstrap/dist/css/bootstrap.css'

import BasicPanel from './BasicPanel/BasicPanel';
import AddClienPanel from './AddClientPanel/AddClientPanel';
import SingleClientPanel from './SingleClientPanel/SingleClientPanel';
import LoginModal from './LoginModal/LoginModal';

function App() {

  const[user, setUser] = useState(JSON.parse(localStorage.getItem('jwt_user')))
  console.log(user)

  return (
    <Container>
      {!user && <LoginModal/>}
      {user && <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand>CRMApp</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/AddClientPanel">Add Client</Nav.Link>
          </Nav>
        </Container>
      </Navbar>}

      {user &&<Routes>
        <Route path="/" element={<BasicPanel/>} />
        <Route path="/AddClientPanel" element={<AddClienPanel/>} />
        <Route path="/SingleClient/:id" element={<SingleClientPanel />} />
      </Routes>}


    </Container>


  );
}

export default App;

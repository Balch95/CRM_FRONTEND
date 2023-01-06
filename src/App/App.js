import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import { Cookies, useCookies } from 'react-cookie';
import Countdown from 'react-countdown';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'

import BasicPanel from './BasicPanel/BasicPanel';
import AddClienPanel from './AddClientPanel/AddClientPanel';
import SingleClientPanel from './SingleClientPanel/SingleClientPanel';
import LoginModal from './LoginModal/LoginModal';
import Singup from './Singup/Singup';

function App() {

  const [cookie, setCookie, removeCookie] = useCookies();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('jwt_user')));

  axios.defaults.headers.common['x-auth-token'] = user;

  const logout = () => {
    removeCookie("TokenTime")
    localStorage.clear()
  }

  const autoLogout = () => {
    console.log("Auto logout is on")
    setTimeout(() => {
      logout();
    }, 600000)
  }




  return (
    <Container>
      {!cookie.TokenTime && <LoginModal autoLogout={autoLogout} />}
      {cookie.TokenTime && <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand>CRMApp</Navbar.Brand>
          <Nav>
            <Nav.Link href="/"><Button variant="success">Home</Button></Nav.Link>
            {JSON.parse(localStorage.getItem("userPermission")).includes("admin", "manager") && <Nav.Link href="/AddClientPanel"><Button variant="success">Add client</Button></Nav.Link>}
            {JSON.parse(localStorage.getItem("userPermission")).includes("admin") && <Nav.Link href="/Singup"><Button variant="warning">Add user</Button></Nav.Link>}
            <Nav.Link onClick={() => logout()}><Button variant="secondary">Logout</Button></Nav.Link>
          </Nav>
        </Container>
      </Navbar>}

      {cookie.TokenTime && <Routes>
        <Route path="/" element={<BasicPanel />} />
       {JSON.parse(localStorage.getItem("userPermission")).includes("admin", "manager") && <Route path="/AddClientPanel" element={<AddClienPanel />} />}
        <Route path="/SingleClient/:id" element={<SingleClientPanel />} />
        <Route path="/Singup" element={<Singup />} />
      </Routes>}


    </Container>


  );
}

export default App;

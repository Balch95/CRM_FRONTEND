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
import UserListPanel from './UserListPanel/UserListPanel';

function App() {

  const [cookie, setCookie, removeCookie] = useCookies();
  const [user, setUser] = useState(cookie.TokenTime);

  axios.defaults.headers.common['x-auth-token'] = user;

  const logout = () => {
    removeCookie("TokenTime")
    localStorage.clear();
  }


  return (
    <Container>
      {!cookie.TokenTime && <LoginModal/>}
      {cookie.TokenTime && <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand>CRMApp</Navbar.Brand>
          <Nav>
            <Nav.Link href="/"><Button variant="success">Home</Button></Nav.Link>
            {(JSON.parse(localStorage.getItem("userPermission")).includes("admin") || JSON.parse(localStorage.getItem("userPermission")).includes("manager")) && <Nav.Link href="/AddClientPanel"><Button variant="success">Add client</Button></Nav.Link>}
            {<Nav.Link href="/UserList"><Button variant="success">User List</Button></Nav.Link>}
            {JSON.parse(localStorage.getItem("userPermission")).includes("admin") && <Nav.Link href="/Singup"><Button variant="warning">Add user</Button></Nav.Link>}
            <Nav.Link onClick={() => logout()}><Button variant="secondary">Logout</Button></Nav.Link>
          </Nav>
        </Container>
      </Navbar>}

      {cookie.TokenTime && <Routes>
        <Route path="/" element={<BasicPanel/>} />
        {<Route path="/AddClientPanel" element={<AddClienPanel />} />}
        <Route path="/SingleClient/:id" element={<SingleClientPanel />} />
        {JSON.parse(localStorage.getItem("userPermission")).includes("admin") && <Route path="/Singup" element={<Singup />} />}
        <Route path="/UserList" element={<UserListPanel />} />
      </Routes>}


    </Container>


  );
}

export default App;

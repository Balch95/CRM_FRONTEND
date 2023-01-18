import React, {  useState } from 'react';
import axios from 'axios';
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Routes, Route, Link } from "react-router-dom";
import {  useCookies } from 'react-cookie';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import ClientPanel from './ClientPanel/ClientPanel';
import AddClientPanel from './AddClientPanel/AddClientPanel';
import SingleClientPanel from './SingleClientPanel/SingleClientPanel';
import LoginModal from './LoginModal/LoginModal';
import Singup from './Singup/Singup';
import UserListPanel from './UserListPanel/UserListPanel';
import { testPermission } from './helpservices/testPermision';

function App() {

  const [cookie, setCookie, removeCookie] = useCookies();
  const [user] = useState(cookie.TokenTime);
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
            <Nav.Link to="/" as={Link}><Button variant="success">Home</Button></Nav.Link>
            {(testPermission('admin')||testPermission('manager')) && <Nav.Link to="/AddClientPanel" as={Link}><Button variant="success">Add client</Button></Nav.Link>}
            {<Nav.Link to="/UserList" as={Link}><Button variant="success">User List</Button></Nav.Link>}
            {JSON.parse(localStorage.getItem("userPermission")).includes("admin") && <Nav.Link to="/Singup" as={Link}><Button variant="warning">Add user</Button></Nav.Link>}
            <Nav.Link onClick={() => logout()}><Button variant="secondary">Logout</Button></Nav.Link>
          </Nav>
        </Container>
      </Navbar>}
      {cookie.TokenTime && <Routes>
        <Route path="/" element={<ClientPanel/>} />
        {<Route path="/AddClientPanel" element={<AddClientPanel />} />}
        <Route path="/SingleClient/:id" element={<SingleClientPanel />} />
        {JSON.parse(localStorage.getItem("userPermission")).includes("admin") && <Route path="/Singup" element={<Singup />} />}
        <Route path="/UserList" element={<UserListPanel />} />
      </Routes>}
    </Container>
  );
}
export default App;

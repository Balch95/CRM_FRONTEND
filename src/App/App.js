import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from "react-bootstrap";

import './App.css';
import 'bootstrap/dist/css/bootstrap.css'

import BasicPanel from './BasicPanel/BasicPanel';
import AddClienPanel from './AddClientPanel/AddClientPanel';

function App() {

  const [clientList, setClientList] = useState();

    const clientDown = (e) =>{
       
        axios
        .get("http://localhost:5050/api/client/all")
        .then((res)=>{
            setClientList(res.data);
            console.log(res);
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        clientDown();
    },[])

    console.log(clientList);


  return (
   <Container>
    <h1>App</h1>
      {clientList&&<BasicPanel clientList={clientList}/>}
      {<AddClienPanel clientDown={clientDown}/>}
   </Container>
  );
}

export default App;

import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ListGroup, Image, Accordion, Card, AccordionContext, useAccordionButton } from 'react-bootstrap';
import axios from 'axios';

const HomePage = () => {


  function ContextAwareToggle({ children, eventKey, callback }) {
    const { activeEventKey } = useContext(AccordionContext);
  
    const decoratedOnClick = useAccordionButton(
      eventKey,
      () => callback && callback(eventKey),
    );
  
    const isCurrentEventKey = activeEventKey === eventKey;
  
    return (
      <button
        type="button"
        style={{ backgroundColor: isCurrentEventKey ? 'skyblue' : 'lavender' }}
        onClick={decoratedOnClick}
      >
        {children}
      </button>
    );
  }

  const [users, setUsers] = useState([]);

  

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  let navigate = useNavigate();
  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
    getUsersList();
  }, [navigate, userInfo]);

  function getUsersList() {
    axios.get('/api/users')
      .then((response) => {
        const data = response.data;
        setUsers(data);
        console.log('Data has been received!!');
      })
      .catch(() => {
        alert('Error retrieving data!!!');
      });
  }

  let displayUsers;
  if(users.length !== null) {
    displayUsers = (
      users.map((user, index) => (
        <ListGroup as="ol" numbered="true ">
          <ListGroup.Item key={index} as="li" className="d-flex  align-items-start">
          <Image className="rounded-circle" src={`${user.pic}`} width="50"></Image>
          <div className="ms-2 me-auto" style={{marginLeft:"30px"}}>
          <div className="font-weight-bold" style={{fontSize:"20px"}}>{user.name}</div>
          {user.email}
          </div>
          </ListGroup.Item>
        </ListGroup>
      )
      ));
  }
  else{
    displayUsers = (
      <div></div>
    )
  }

  return (
    <>
    <Accordion defaultActiveKey="0">
      <Card>
        <Card.Header>
          <ContextAwareToggle eventKey="0">Show Users</ContextAwareToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>{displayUsers}</Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
    </>
  )
}

export default HomePage
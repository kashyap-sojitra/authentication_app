
import React, { useEffect } from "react";
import { Nav, Navbar, Container, NavDropdown, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../actions/userActions";

const Header = () => {

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  useEffect(() => {
  }, [userInfo]);

  return (
    <Navbar bg="dark" variant="dark">
  <Container>
    <Navbar.Brand >Nudgyt Auth</Navbar.Brand>
    <Navbar.Toggle />
    <Navbar.Collapse className="justify-content-end">
    <Nav>
            {userInfo ? (
              <>
                <Nav.Link style={{color:'white'}} >
                  <Image className="rounded-circle" src={`${userInfo.pic}`} width="25"></Image>
                </Nav.Link>
                <NavDropdown
                  style={{color:'white'}}
                  title={`${userInfo.name}`}
                  id="collasible-nav-dropdown"
                >
                  <NavDropdown.Item onClick={logoutHandler}>
                  <Link to="/" style={{color:'black'}}>Logout</Link>
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <Nav.Link style={{color:'white'}} href="/login">xLogin</Nav.Link>
            )}
          </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
  )
}

export default Header
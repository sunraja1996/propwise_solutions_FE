import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

function Nav() {
  const firstname = sessionStorage.getItem('firstname');
  console.log('First name from session storage:', firstname);
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  return (
    <Navbar className="bg-body-tertiary">
      <Container>
      <Link to={'/'}>
        <Navbar.Brand>PropWise Solutions</Navbar.Brand>
        </Link>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {firstname ? (
            <div className="d-flex align-items-center">
              <span className="me-2">Welcome, {firstname}</span>
              <Button variant="danger" onClick={logout}>
                Logout
              </Button>
            </div>
          ) : (
            <Link to='/login'>
            <Button variant="danger">Login</Button>
        </Link>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Nav;

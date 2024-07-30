import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import { env } from '../api';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function Adduser() {

  const apiurl = process.env.REACT_APP_API_URL;

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'user',
    password: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(`${apiurl}/users/adduser`, formData, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.data.statusCode === 200) {
        toast.success('User Added Successful!', {
            position: 'bottom-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          });
        navigate('/dashboard');
      } else {
        toast.error(res.data.message, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          });
      }
    } catch (error) {
        toast.error(error, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          });
    }
  };

  return (
    <>
    <div className='mb-5 d-flex justify-content-center'>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group className='mb-3' controlId='formBasicFirstName'>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type='text'
                name='firstName'
                placeholder='Enter First Name'
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className='mb-3' controlId='formBasicLastName'>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type='text'
                name='lastName'
                placeholder='Enter Last Name'
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            name='email'
            placeholder='Enter Email'
            value={formData.email}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicRole'>
          <Form.Label>Role</Form.Label>
          <Form.Control
            as='select'
            name='role'
            value={formData.role}
            onChange={handleInputChange}
          >
            <option value='user'>User</option>
            <option value='admin'>Admin</option>
          </Form.Control>
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            name='password'
            placeholder='Enter Password'
            value={formData.password}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </div>
    <ToastContainer/>
    </>
  )
}

export default Adduser

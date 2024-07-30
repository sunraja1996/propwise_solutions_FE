import React , { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import CardTitle from 'react-bootstrap/esm/CardTitle';
import loginimg from '../Images/login.jpg'
import Col from 'react-bootstrap/Col';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {env} from '../api'

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const apiurl = process.env.REACT_APP_API_URL;
  
    const login = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.post(`${apiurl}/users/login`, { email, password });
    
  
        if (response.data.statusCode === 200) {
          toast.success('Login Successful!', {
            position: 'bottom-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          });
          
          sessionStorage.setItem('token', response.data.token);
          sessionStorage.setItem('role', response.data.role);
          sessionStorage.setItem('firstname', response.data.firstname)
  
          if (response.data.role === 'admin') {
            navigate('/dashboard');
          } else if (response.data.role === 'user') {
            navigate('/properties');
          }
        } else {
          toast.error(response.data.message, {
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
        console.error('Login Error:', error);
        toast.error('Network Error. Please try again later.', {
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
    <Card className='mb-3 m-3'>
    <CardTitle><h2 className='text-center text-uppercase mt-2 '>Login</h2></CardTitle>
        <Card.Body>

          <Form className="mb-3 m-3" onSubmit={login}>
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" id='email' placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">

      <Form.Label>Password</Form.Label>
        <Form.Control
        type="password"
        id='password'
        onChange={(e) => setPassword(e.target.value)}
      />
      
      <Form.Text id="passwordHelpBlock" muted>
        Your password must be 8-20 characters long, contain letters and numbers,
        and must not contain spaces, special characters, or emoji.
      </Form.Text>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
      <Link to='/signup'>
      <Button className='m-2' variant="danger">
        Not have an Account, Signup Here
      </Button>
      </Link>
    </Form>


        </Card.Body>
        <Col>
        <Card.Img style={{width : '100%', height : '500px'}} className='object-fit-cover' variant="bottom" src={loginimg} rounded/>
        </Col>
      </Card>
      <ToastContainer/>
    </>
  )
}

export default Login
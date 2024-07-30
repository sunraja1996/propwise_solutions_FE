import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import CardTitle from 'react-bootstrap/esm/CardTitle';
import signupimg from '../Images/signup.jpg'
import FormGroup from 'react-bootstrap/esm/FormGroup';
import axios from 'axios';
import { env } from '../api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const apiurl = process.env.REACT_APP_API_URL;

    const  signup = async(e) =>{
        e.preventDefault();

        const userData = {
          firstname: fname,
          lastname: lname,
            email : email,
            password : password,
        };

        try {
            const response = await axios.post(`${apiurl}/users/signup`, userData);
            if (response.data.statusCode === 200) {
                toast.success('Signup Successful!', {
                  position: 'bottom-right',
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: 'colored',
                });
                setTimeout(() => {
                  navigate('/login');
                }, 2000);
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
            toast.error('An error occurred. Please try again later.', {
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
    }
  
    return (
<>
<Card className='mb-3 m-3'>
    <CardTitle><h2 className='text-center text-uppercase mt-2 '>Signup</h2></CardTitle>
        <Card.Body>

          <Form className="mb-3 m-3"  onSubmit={signup}>

          
      <Form.Group className="mb-3">
        <Form.Label>Firstname</Form.Label>
        <Form.Control 
        type="text" 
        placeholder="Firstname"
        id="firstname"
        onChange={(e) => setFname(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Lastname</Form.Label>
        <Form.Control 
        type="text" 
        placeholder="Lastname"
        id="lastname"
        onChange={(e) => setLname(e.target.value)} />
      </Form.Group>


      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control 
        type="email" 
        placeholder="Enter email"
        id="username"
        onChange={(e) => setEmail(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3">

      <Form.Label>Password</Form.Label>
        <Form.Control
        type="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      
      <Form.Text id="passwordHelpBlock" muted>
        Your password must be 8-20 characters long, contain letters and numbers,
        and must not contain spaces, special characters, or emoji.
      </Form.Text>
      </Form.Group>

<FormGroup>
<Form.Label>User</Form.Label>
      <Form.Select aria-label="Agent / Client">
      <option>Open this select menu</option>
      <option value="1">Agent</option>
      <option value="2">Client</option>
      <option value="3">Guest</option>
    </Form.Select>
    </FormGroup>


      <Button variant="danger" type="submit">
        Submit
      </Button>

<Link to="/login">
      <Button className='m-2' variant="success" type="submit">
      Already have a account! Login
      </Button>
      </Link>
     
    </Form>


        </Card.Body>
        <Col>
        <Card.Img style={{width : '100%', height : '500px'}} className='object-fit-cover' variant="bottom" src={signupimg} rounded/>
        </Col>
      </Card>
       <ToastContainer/>
      </>
  )
}

export default Signup
import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import headerimg from '../Images/header.jpg'
import Button from 'react-bootstrap/Button';
import CardGroup from 'react-bootstrap/CardGroup';
import { Link } from 'react-router-dom';

function Home() {



    return (
      <>
     
     <div className="m-2 card bg-dark text-white">
    <img src={headerimg} alt="Card image"/>
    <div className="card-img-overlay d-flex flex-column justify-content-center align-items-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <h1 className="card-title text-center">Real Estate Management App</h1>
        <h5 className="text-center">The Real Estate Management Platform is a web app for real estate agents to easily manage property listings. Built with the MERN stack (MongoDB, Express, React, Node.js), it allows agents to register, update, view, and delete properties. It also offers a search function for buying listings and lets agents update property statuses. For security, it uses JWT (JSON Web Token) for authentication and authorization.</h5>
        <Link to='/properties'>
        <Button variant="success mb-2" size="lg">View Property</Button>
      </Link>
        
        </div>
</div>


<Card className="m-2">
      <Card.Header>Key Functionalities:</Card.Header>
      <Card.Body>
        <Card.Title>Agent Registration and Authentication:</Card.Title>
        <Card.Text>
        <Card.Title>Sign Up: </Card.Title>
        Agents can register by providing their necessary details.
        </Card.Text>
        <Card.Text>
        <Card.Title>Login: </Card.Title>
        Agents can access the platform using their credentials.
        </Card.Text>
        <Card.Text>
        <Card.Title>JWT Authentication: </Card.Title>
Secure authentication and session management through JWT.
        </Card.Text>
      </Card.Body>
    </Card>

<Card className="m-2">
      <Card.Body>
        <Card.Title>Property Management:</Card.Title>
        <Card.Text>
        <Card.Title>Create Property:</Card.Title>
        Agents can add new property listings, detailing the property type, location, price, and description.
        </Card.Text>
        <Card.Text>
        <Card.Title>Read Property:</Card.Title>
        Agents can view detailed information on all properties they have registered.
        </Card.Text>
        <Card.Text>
        <Card.Title>Update Property:</Card.Title>
        Agents can modify the details of their registered properties.
        </Card.Text>
        <Card.Text>
        <Card.Title>Delete Property:</Card.Title>
        Agents can remove property listings from the platform.
        </Card.Text>
      </Card.Body>
    </Card>

<Card className="m-2">
      <Card.Body>
        <Card.Title>Property Status Management:</Card.Title>
        <Card.Text>
        <Card.Title>Update Status: </Card.Title>
        Agents can change the status of their properties, such as marking them as Sold or Not Sold.
        </Card.Text>
      </Card.Body>
    </Card>

<Card className="m-2">
      <Card.Body>
        <Card.Title>Search Property Listings:</Card.Title>
        <Card.Text>
        <Card.Title>Search Functionality:</Card.Title>
        Agents can search for property listings available for purchase using filters like location, price range, and property type.
        </Card.Text>
      </Card.Body>
    </Card>

    <Card border="danger" className='m-2'>
      <Card.Header><h3>Technical Specifications</h3></Card.Header>
      <Card.Header><h4>Frontend</h4></Card.Header>
      </Card>
    
    <CardGroup className="m-2">
      <Card >
        <Card.Body>
          <Card.Title>React</Card.Title>
          <Card.Text>
          Utilized for constructing the user interface.
          </Card.Text>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Card.Title>React Router</Card.Title>
          <Card.Text>
          Employed for managing navigation within the application.{' '}
          </Card.Text>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Card.Title>Axios</Card.Title>
          <Card.Text>
          Used for making HTTP requests to the backend.
          </Card.Text>
        </Card.Body>
      </Card>
    </CardGroup>


    <Card border="danger" className='m-2'>
      <Card.Header><h4>Backend</h4></Card.Header>
      </Card>
    
    <CardGroup className="m-2">
      <Card>
        <Card.Body>
          <Card.Title>Node.js and Express</Card.Title>
          <Card.Text>
          Utilized for building the RESTful API.
          </Card.Text>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Card.Title>JWT</Card.Title>
          <Card.Text>
          Implemented for secure authentication and authorization.{' '}
          </Card.Text>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Card.Title>Mongoose</Card.Title>
          <Card.Text>
          Used for interacting with MongoDB.
          </Card.Text>
        </Card.Body>
      </Card>
    </CardGroup>


    <Card border="danger" className='m-2'>
      <Card.Header><h3>Authentication and Authorization</h3></Card.Header>
      <Card.Header><h4>JWT Implementation</h4></Card.Header>
      </Card>
    
    <CardGroup className="m-2">
      <Card>
        <Card.Body>
          <Card.Title>Token Generation</Card.Title>
          <Card.Text>
          A JWT token is generated and sent to the client upon successful login.
          </Card.Text>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Card.Title>Token Verification</Card.Title>
          <Card.Text>
          Middleware ensures token verification for protected routes, allowing only authenticated agents access.
          </Card.Text>
        </Card.Body>
      </Card>
    </CardGroup>

      </>
    );
  }

export default Home
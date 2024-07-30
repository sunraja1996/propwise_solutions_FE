import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import axios from 'axios';
import { env } from '../api'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Allproperties() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [propertyPerPage] = useState(6); // Number of properties per page
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const apiurl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${apiurl}/properties`);
        setProperties(response.data.properties);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Properties:', error);
        setLoading(false);
      }
    };

    fetchProperties();

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const indexOfLastProperty = currentPage * propertyPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertyPerPage;
  const currentProperties = properties.slice(indexOfFirstProperty, indexOfLastProperty);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const numPagesToShow = Math.floor(windowWidth / 80);
  
  return (
    <>
      <h1 className='text-center'>Properties</h1>
      <div className="container">
        <div className="row">
          {currentProperties.map(property => (
            <div className="col-md-4 mb-4" key={property._id}>
              <Card className='m-2' style={{ width: '25rem' }}>
                <Card.Img variant="top" src={property.imgurl} />
                <Card.Body>
                  <Card.Title>{property.Name}</Card.Title>
                  <Card.Text>{property.Description}</Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item> <strong>Location:</strong> {property.location}</ListGroup.Item>
                  <ListGroup.Item><strong>Price range:</strong> {property.price}</ListGroup.Item>
                  <ListGroup.Item><strong>Property type:</strong> {property.propertytype.join(', ')}</ListGroup.Item>
                </ListGroup>
                <Card.Body>
                  <Button variant='info'>View Property</Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
        <Pagination className='justify-content-center'>
          {Array.from({ length: Math.ceil(properties.length / propertyPerPage) }, (_, i) => (
            <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => paginate(i + 1)}>
              {i + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
      <ToastContainer />
    </>
  );
}

export default Allproperties;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { env } from '../api';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Properties() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [propertyPerPage] = useState(6);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [filters, setFilters] = useState({
    location: '',
    priceMin: 50000,
    priceMax: 100000000,
    propertyType: ''
  });

  const apiurl = process.env.REACT_APP_API_URL;

  console.log(apiurl);

  useEffect(() => {

    console.log(process.env.REACT_APP_API_URL);
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${apiurl}/properties`);
        setProperties(response.data.properties);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching properties:', error);
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

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFilters({ ...filters, [id]: value });
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiurl}searchedproperties`, {
        params: {
          location: filters.location,
          priceMin: filters.priceMin,
          priceMax: filters.priceMax,
          propertyType: filters.propertyType
        }
      });
      setProperties(response.data.properties);
      setLoading(false);
    } catch (error) {
      console.error('Error searching properties:', error);
      setLoading(false);
      toast.error('Error searching properties.');
    }
  };

  const indexOfLastProperty = currentPage * propertyPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertyPerPage;
  const currentProperties = properties.slice(indexOfFirstProperty, indexOfLastProperty);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <>
      <h1 className='text-center'>Properties</h1>
      <div className="d-flex">
        <div className="bg-light p-3" style={{ width: '20%', height: '100%' }}>
          <h4>Search Filters</h4>
          <div className="mb-3">
            <label htmlFor="location" className="form-label">Location</label>
            <input
              type="text"
              className="form-control"
              id="location"
              value={filters.location}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="priceMin" className="form-label">Price Min</label>
            <input
              type="number"
              className="form-control"
              id="priceMin"
              min="50000"
              value={filters.priceMin}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="priceMax" className="form-label">Price Max</label>
            <input
              type="number"
              className="form-control"
              id="priceMax"
              max="100000000"
              value={filters.priceMax}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="propertyType" className="form-label">Property Type</label>
            <select
              className="form-select"
              id="propertyType"
              value={filters.propertyType}
              onChange={handleInputChange}
            >
              <option value="">Property Type</option>
              <option value="Commercial">Commercial</option>
              <option value="Villa">Villa</option>
              <option value="Apartment">Apartment</option>
            </select>
          </div>
          <Button variant="danger" className="w-100" onClick={handleSearch}>Search</Button>
        </div>

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
                    <ListGroup.Item><strong>Location:</strong> {property.location}</ListGroup.Item>
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
      </div>
    </>
  );
}

export default Properties;

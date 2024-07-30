import React, { useState } from 'react'
import axios from 'axios';
// import { env } from '../api';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function Addproperty() {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [propertyType, setPropertyType] = useState('');

  const apiurl = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiurl}/add-property`, {
        Name: name,
        Description: description,
        imgurl: imageUrl,
        location: location,
        price: price,
        propertytype: propertyType,
      });

      if (response.data.statusCode === 200) {
        toast.success('Property Added Successfully!', {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      } else {
        toast.error('Something went wrong! Property not added.', {
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
      console.error('Error adding property:', error);
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
    <div className='m-3 d-flex justify-content-center'>
    <Form style={{ width: '75%', margin: '0 auto' }} onSubmit={handleSubmit}>
      <FloatingLabel
        controlId="floatingName"
        label="Name"
        className="mb-3"
      >
        <Form.Control type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
      </FloatingLabel>
      <FloatingLabel controlId="floatingDescription" label="Description" className="mb-3">
        <Form.Control type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}/>
      </FloatingLabel>

      <FloatingLabel controlId="floatingImageurl" label="Image URL" className="mb-3">
        <Form.Control type="text" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}/>
      </FloatingLabel>

      <FloatingLabel controlId="floatingLocation" label="Location" className="mb-3">
        <Form.Control type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
      </FloatingLabel>

      <FloatingLabel controlId="floatingPrice" label="Price range" className="mb-3">
        <Form.Control type="text" placeholder="Price Range" value={price} onChange={(e) => setPrice(e.target.value)} />
      </FloatingLabel>

      <FloatingLabel controlId="floatingPropertytype" label="Property Type"  className="mb-3">
      <Form.Select aria-label="Property Type" value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
        <option>Property Type</option>
        <option value="Commercial">Commercial</option>
        <option value="Villa">Villa</option>
        <option value="Apartment">Apartment</option>
      </Form.Select>
    </FloatingLabel>

    <div className="d-flex justify-content-center align-items-center">
      <OverlayTrigger
        placement="bottom"
        overlay={<Tooltip id="button-tooltip-2">Submit to Add Property. Click Me</Tooltip>}
      >
        {({ ref, ...triggerHandler }) => (
          <Button
            variant="success"
            type="submit"
            {...triggerHandler}
            className="d-inline-flex align-items-center"
            style={{width:'20%'}}
          >
            <span className="p-2 text-center">Submit</span>
          </Button>
        )}
      </OverlayTrigger>
    </div>

      </Form>
      </div>
      <ToastContainer/>
    </>
  )
}

export default Addproperty
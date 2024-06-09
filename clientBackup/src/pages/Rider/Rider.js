import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const AddBikeForm = () => {
  const user = useSelector((state) => state?.auth?.user);
  const [formData, setFormData] = useState({
    rider: user._id,
    name: '',
    type: '',
    description:'',
    price: '',
    image: null,
    luggageOptions: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('rider', formData.rider);
    data.append('name', formData.name);
    data.append('type', formData.type);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('image', formData.image);
    data.append('luggageOptions', formData.luggageOptions);

    try {
      const response = await fetch('http://localhost:9000/bikes/add', {
        method: 'POST',
        body: data
      });
      const result = await response.json();
      alert('Bike Added Successfully');
    } catch (error) {
      console.error('Error adding bike:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Add Bike</h2><br/>
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
      </Form.Group>
      <Form.Group controlId="type">
        <Form.Label>Type</Form.Label>
        <Form.Control type="text" name="type" value={formData.type} onChange={handleChange} />
      </Form.Group>
      <Form.Group controlId="type">
        <Form.Label>Bike Description</Form.Label>
        <Form.Control  as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} />
      </Form.Group>
      <Form.Group controlId="price">
        <Form.Label>Price</Form.Label>
        <Form.Control type="number" name="price" value={formData.price} onChange={handleChange} />
      </Form.Group>
      <Form.Group controlId="image">
        <Form.Label>Bike Image</Form.Label>
        <Form.Control type="file" name="image" onChange={onFileChange} />
      </Form.Group>
      <Form.Group controlId="luggage">
        <Form.Label>Luggage Options</Form.Label>
        <Form.Control type="text" name="luggageOptions" value={formData.luggageOptions} onChange={handleChange} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Add Bike
      </Button>
    </Form>
  );
};

export default AddBikeForm;

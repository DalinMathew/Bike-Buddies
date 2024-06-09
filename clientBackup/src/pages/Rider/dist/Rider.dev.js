// import React, { useState } from 'react';
// import { Form, Button } from 'react-bootstrap';
// const AddBikeForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     type: '',
//     price: '',
//     image: '',
//     luggageOptions: []
//   });
//   const [newLuggageOption, setNewLuggageOption] = useState({
//     name: '',
//     description: '',
//     price: ''
//   });
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };
//   const handleLuggageOptionChange = (e) => {
//     const { name, value } = e.target;
//     setNewLuggageOption({ ...newLuggageOption, [name]: value });
//   };
//   const handleAddLuggageOption = () => {
//     setFormData({
//       ...formData,
//       luggageOptions: [...formData.luggageOptions, newLuggageOption]
//     });
//     setNewLuggageOption({
//       name: '',
//       description: '',
//       price: ''
//     });
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('/bikes/add', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(formData)
//       });
//       const data = await response.json();
//       console.log(data);
//     } catch (error) {
//       console.error('Error adding bike:', error);
//     }
//   };
//   return (
//     <Form onSubmit={handleSubmit}>
//       <Form.Group controlId="name">
//         <Form.Label>Name</Form.Label>
//         <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
//       </Form.Group>
//       <Form.Group controlId="type">
//         <Form.Label>Type</Form.Label>
//         <Form.Control type="text" name="type" value={formData.type} onChange={handleChange} />
//       </Form.Group>
//       <Form.Group controlId="price">
//         <Form.Label>Price</Form.Label>
//         <Form.Control type="number" name="price" value={formData.price} onChange={handleChange} />
//       </Form.Group>
//       <Form.Group controlId="image">
//         <Form.Label>Image URL</Form.Label>
//         <Form.Control type="text" name="image" value={formData.image} onChange={handleChange} />
//       </Form.Group>
//       <h2>Luggage Options</h2>
//       {formData.luggageOptions.map((option, index) => (
//         <div key={index}>
//           <Form.Group controlId={`luggageOptionName${index}`}>
//             <Form.Label>Name</Form.Label>
//             <Form.Control type="text" name="name" value={option.name} onChange={(e) => handleLuggageOptionChange(e, index)} />
//           </Form.Group>
//           <Form.Group controlId={`luggageOptionDescription${index}`}>
//             <Form.Label>Description</Form.Label>
//             <Form.Control type="text" name="description" value={option.description} onChange={(e) => handleLuggageOptionChange(e, index)} />
//           </Form.Group>
//           <Form.Group controlId={`luggageOptionPrice${index}`}>
//             <Form.Label>Price</Form.Label>
//             <Form.Control type="number" name="price" value={option.price} onChange={(e) => handleLuggageOptionChange(e, index)} />
//           </Form.Group>
//         </div>
//       ))}
//       <Button variant="secondary" onClick={handleAddLuggageOption}>Add Luggage Option</Button>
//       <Button variant="primary" type="submit">
//         Add Bike
//       </Button>
//     </Form>
//   );
// };
// export default AddBikeForm;
"use strict";
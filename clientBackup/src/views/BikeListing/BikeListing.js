import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Input, DatePicker, Select } from 'antd';
import axios from 'axios';
import booksService from '../../services/bikes'

const { Option } = Select;

const BikeListingPage = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [searchDate, setSearchDate] = useState(null);
  const [searchType, setSearchType] = useState('');
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    fetchBikes();
  }, []); // Fetch bikes when component mounts

  const fetchBikes = async () => {
    try {
      const response = booksService.getAllBikes()
      setBikes(response.data);
    } catch (error) {
      console.error('Error fetching bikes:', error);
    }
  };

  const handleSearch = () => {
    // Implement search logic here based on searchLocation, searchDate, and searchType
    console.log('Search Location:', searchLocation);
    console.log('Search Date:', searchDate);
    console.log('Search Type:', searchType);
  };

  const handleBook = (bikeId) => {
    // Implement booking logic here
    console.log('Booking bike with ID:', bikeId);
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
      <h2>Available Bikes</h2>

        <Input
          placeholder="Enter location"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <DatePicker
          placeholder="Select date"
          onChange={(date) => setSearchDate(date)}
          style={{ marginRight: '10px' }}
        />
        <Select
          placeholder="Select type"
          onChange={(value) => setSearchType(value)}
          style={{ width: '120px', marginRight: '10px' }}
        >
          <Option value="Mountain">Mountain</Option>
          <Option value="Road">Road</Option>
          <Option value="Hybrid">Hybrid</Option>
        </Select>
        <Button type="primary" onClick={handleSearch}>
          Search
        </Button>
      </div>
      <Row gutter={[16, 16]}>
        {bikes?.map((bike) => (
          <Col key={bike.id} xs={24} sm={12} md={8} lg={6}>
            <Card title={bike.name} style={{ height: '100%' }}>
              <img src={bike.image} alt={bike.name} style={{ maxWidth: '100%', marginBottom: '10px' }} />
              <p>Type: {bike.type}</p>
              <p>Price per hour: ${bike.price}</p>
              <ul>
              {bike.luggageOptions.map(option => (
                <li key={option._id}>{option.name}</li>
              ))}
            </ul>
              <Button type="primary" onClick={() => handleBook(bike.id)}>
                Book Now
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default BikeListingPage;

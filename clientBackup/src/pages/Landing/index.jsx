import React from 'react';
import './style.css'; // Import CSS file for styling
import {Container,Row,Col} from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import usersService from '../../services/users';
import {Link} from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import { useState,useEffect } from 'react';
import img from "./tst1.jpg";
import img2 from './bike2.jpeg'
import img3 from './bike3.jpeg'
import bikesService from '../../services/bikes';
import Slider from './Slider';
import Footer from './Footer';


const LandingPage = () => {
  const [loading, setLoading] = useState(true);
  const [bikes, setBikes] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchBikes();
  }, []);

  const fetchBikes = async () => {
    try {
      const response = await bikesService.getAllBikes();
      setBikes(response);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch bikes:', error.message);
      setLoading(false);
      setError(true)
    }
  };
  console.log(bikes)


  // const [bikeList,setBikelist]=useState([

  //   {
  //     "name": "Himalayan",
  //     "type": "Bike",
  //     "price": 500,
  //     "image": "https://example.com/mountain_bike.jpg"
  //   },
  //   {
  //     "name": "Himalayam",
  //     "type": "Bike",
  //     "price": 700,
  //     "image": "https://example.com/road_bike.jpg"
  //   },
  //   {
  //     "name": "Himalayan",
  //     "type": "Accessory",
  //     "price": 50,
  //     "image": "https://example.com/helmet.jpg"
  //   },
  //   {
  //     "name": "Himalayan",
  //     "type": "Accessory",
  //     "price": 10,
  //     "image": "https://example.com/water_bottle.jpg"
  //   }
  // ]);
    return (
      <>
      <Container fluid>
        <Container>       
           <Row className='mt-3 pb-3 border-bottom bg-gray'>
            <Col md={3}>
                <h3 className='text-center text-dark'>Bike Buddies</h3>
            </Col>
            <Col md={3}>
                
              </Col>
              <Col md={3}>
                  <Link to ="/Register"><input type="button" className='btn btn-warning' value="Register"/></Link>
              </Col>
              
              <Col md={3}>
              <Link to ="/login"><input type="button" className='btn btn-success' value="Login"/></Link>
              </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Slider/>
        </Row>
      </Container>
      <Container>
        <Row>
            <Col md={12} className='mt-5'>
            <h4 className='text-center'>Select a bike from the following list and book it</h4>
            </Col>

        </Row>
        <Row>
          {
            bikes.map((item,key = 1)=>{
              return (
                <Col md={3}>
                  <Card style={{ marginBottom: "20px", width: "18rem" }}>
                    <Card.Img
                      style={{ height: "150px" }}
                      variant="top"
                      src={`http://localhost:9000/media/${
                        item && item.image ? item.image : ""
                      }`}
                    />
                    <Card.Body>
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Text>{item.description}</Card.Text>
                      <Card.Text>Amount: ₹{item.price}/KM</Card.Text>
                      <Card.Text>Type: {item.type}</Card.Text>
                      <Link to="/login">
                        <Button variant="warning">Book Now</Button>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              );

            })
          }
        </Row>
      </Container>
      </Container>
<Footer/>
      </>
    );
  }
  
  export default LandingPage;
  
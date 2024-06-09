import React, { useState, useEffect } from 'react';
import bikesService from '../../services/bikes';
import '../Customer/Customer.css';
import {Container,Row,Col} from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom'
import Card from 'react-bootstrap/Card';
function Customer() {
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(false)
  const [bikes, setBikes] = useState([]);
  const [error, setError] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed)
  }

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
  
  const handleBookClick = (bikeId) => {
    // Handle booking logic here
    console.log(`Booking bike with ID: ${bikeId}`);
  };
  console.log(bikes)
  return (
    <>
    <Container fluid>
        <Container>       
           <Row className='mt-3 pb-3 border-bottom bg-gray'>
            <Col md={3}>
                <h3 className='text-center text-primary'>Bike Buddies</h3>
            </Col>
            <Col md={3}>
                
              </Col>
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
            bikes.map((item,key)=>{
              console.log(item.image)
              return(
                <Col md={3}>
                  
                  <Card   >
                  <Card.Img style={{height:'150px'}} variant="top" src={`http://localhost:9000/media/${item.image}`} />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>
                      {item.description}
                    </Card.Text>
                    <Card.Text>
                      {item.price}
                    </Card.Text>
                    <Card.Text>
                      {item.type}
                    </Card.Text>
                    <Link to={`/app/customer/${item._id}`}><Button variant="primary">Book Now</Button></Link>
                  </Card.Body>
                </Card>          
                </Col>
              )
            })
          }
        </Row>
      </Container>
      </Container>

      </>
  );
}

export default Customer;

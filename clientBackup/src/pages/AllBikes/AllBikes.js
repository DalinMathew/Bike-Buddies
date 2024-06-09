// import React, { useState,useEffect } from 'react'
// import bikesService from '../../services/bikes';

// function AllBikes() {
//     const [bikes, setBikes] = useState([]);
//     useEffect(() => {
//         fetchBikes();
//       }, []);

//     const fetchBikes = async () => {
//         try {
//           const response = await bikesService.getAllBikes();
//           setBikes(response);
//         //   setLoading(false);
//         } catch (error) {
//           console.error('Failed to fetch bikes:', error.message);
//         //   setLoading(false);
//         //   setError(true)
//         }
//       };
//       console.log(bikes)
//   return (
//     <div>
//         anbnab
//     </div>
//   )
// }

// export default AllBikes



import axios from 'axios';
import React, { useEffect, useState,useRef } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import PdfConverter from '../../components/ConvertToPdf/PdfConverter';

function Dashboard() {
    const contentRef = useRef()
    const [allData, setAllData] = useState([]);
    const getAllBookings = async () => {
        try {
            const response = await axios.get('http://localhost:9000/bikes/bikeList');
            if(response){
            setAllData(response.data);
        }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        getAllBookings();
    }, []);
    console.log(allData)

    return (
        <Container ref={contentRef}>
            <h1 className="my-4">Bikes</h1>
            <Row>
                {allData.map((item) => (
                    <Col md={4} key={item._id} className="mb-4">
                        <Card>
                            <Card.Img height={'200px'} variant="top" src={`http://localhost:9000/media/${item.image}`} />
                            <Card.Body>
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Text>
                                    <strong>Type:</strong> {item.type} <br />
                                    <strong>Price:</strong> ${item.price} <br />
                                    <strong>Available:</strong> {item.available ? "Yes" : "No"} <br />
                                    <strong>Luggage Options:</strong> {item.luggageOptions} <br />
                                </Card.Text>
                                {/* <Button variant="primary" onClick={() => alert(`Booked ${item.name}`)}>Book Now</Button> */}
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <PdfConverter html={contentRef} />
        </Container>
    );
}

export default Dashboard;

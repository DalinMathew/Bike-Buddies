import React from "react";
import Carousel from "react-bootstrap/Carousel";
import imgs1 from "./DSC05089.jpg";
import imgs2 from "./Harley-Davidson-Roadster-India-Launch-7.jpg";
import imgs3 from "./Ride+the+miles+Scotland+motorbike+trip+Trev+Lesley+Tiger+800.jpg";

export default function Slider() {
  return (
    <>
      <Carousel>
        <Carousel.Item interval={1000}>
          <img src={imgs1} style={{ width: "100%", height: "600px" }} />
          <Carousel.Caption>
            <h3 className="">Book Your Trip With Us</h3>
            <p className="">
              Embark on a journey of unparalleled discovery with "Book Your Trip
              With Us," where every page unveils a new adventure waiting to be
              embraced.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1000}>
          <img src={imgs2} style={{ width: "100%", height: "600px" }} />
          <Carousel.Caption>
            <h3 className="">Safe Passage With Riders</h3>
            <p className="">
              Experience the assurance of safe passage with Riders, where every
              journey is safeguarded with expertise and care, ensuring your
              travels are a seamless blend of security and adventure.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1000}>
          <img src={imgs3} style={{ width: "100%", height: "600px" }} />
          <Carousel.Caption>
            <h3 className="">Flexible Payment Methords</h3>
            <p className="">
              Enjoy the convenience of flexible payment methods with Riders,
              ensuring your travel plans fit your budget and preferences
              seamlessly.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
}

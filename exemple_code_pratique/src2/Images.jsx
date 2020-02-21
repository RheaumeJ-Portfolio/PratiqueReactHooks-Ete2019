import React from "react";
import Carousel from "react-bootstrap/Carousel";

const Images = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img src="https://via.placeholder.com/150" />
      </Carousel.Item>
      <Carousel.Item>
        <img src="https://via.placeholder.com/200" />
      </Carousel.Item>
    </Carousel>
  );
};

export default Images;

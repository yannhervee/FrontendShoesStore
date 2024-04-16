import React from 'react';
import Slider from 'react-slick';

const ImageSlider = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  return (
    <div className='w-full h-auto'>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Product Image ${index + 1}`} className='w-full h-auto' />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;

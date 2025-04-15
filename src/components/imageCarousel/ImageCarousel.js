
import React, { useEffect, useState } from 'react';
import image1 from './1.jpg';
import image2 from './2.jpg';
import image3 from './3.jpg';
import image4 from './4.jpg';

const ImageCarousel = () => {
  const images = [image1, image2, image3, image4];

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const savedImageIndex = localStorage.getItem('selectedImageIndex');
    if (savedImageIndex !== null) {
      setSelectedImageIndex(parseInt(savedImageIndex, 10));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedImageIndex', selectedImageIndex);
  }, [selectedImageIndex]);

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  return (
    <div>
      <div style={{ display: 'flex', overflow: 'auto' }}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${index + 1}`}
            style={{
              width: '300px',
              height: '200px',
              marginRight: '10px',
              cursor: 'pointer',
              border: selectedImageIndex === index ? '2px solid blue' : 'none',
            }}
            onClick={() => handleImageClick(index)}
          />
        ))}
      </div>
      <div style={{ marginTop: '20px' }}>
        <img
          src={images[selectedImageIndex]}
          alt={`Selected ${selectedImageIndex + 1}`}
          style={{ width: '300px', height: '200px', border: '2px solid green' }}
        />
      </div>
    </div>
  );
};

export default ImageCarousel;

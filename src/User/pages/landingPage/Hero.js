'use client';

import { useEffect, useState } from 'react';
import Header from '../../components/Headers';
import food from '../../../images/food.jpg'
import concert from '../../../images/concert.jpg'
import cafe from '../../../images/cafe.jpg'
import cr from '../../../images/cr.jpg'
import thank from '../../../images/thank.jpg'
import vision from '../../../images/vision.jpg'
import { Box } from '@mui/material';


import { CCarousel, CCarouselItem, CImage } from '@coreui/react'

export default function Home() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    document.title = 'SBT Productions';

    const metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    metaDescription.content =
      'Professional videography services for weddings, events, and corporate projects.';
    document.head.appendChild(metaDescription);

    const getLanding = async () => {

      setImages([cr, food, concert, vision, cafe, thank]);

    };

    getLanding();
  }, []);

  return (
    <>
      <Header />
      <Box sx={{ width: '100%', maxWidth: '100vw', overflow: 'hidden' }}>
      <CCarousel controls indicators transition="crossfade" interval={3000}>
        {images.map((img, index) => (
          <CCarouselItem key={index}>
            <CImage
              className="carousel-image d-block w-100"
              src={img}
              alt={`Slide ${index + 1}`}
            />
          </CCarouselItem>
        ))}
      </CCarousel>
    </Box >

    </>
  );
}


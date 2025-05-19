import React, { useState, useRef } from "react";
import Slider from "react-slick";

const LocationCard = ({ location }) => {
  const sliderRef = useRef(null);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
    fade: true,
  };

  // Bir önceki slayta git
  const goPrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  // Bir sonraki slayta git
  const goNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  return (
    <div className="location-card">
      <div className="location-gallery">
        <Slider ref={sliderRef} {...sliderSettings}>
          {location.images.map((image, index) => (
            <div key={index} className="gallery-slide">
              <img
                src={image}
                alt={`${location.name} Görüntü ${index + 1}`}
                className="location-image"
              />
            </div>
          ))}
        </Slider>

        <div className="gallery-navigation">
          <button
            className="gallery-nav-button prev"
            onClick={goPrev}
            aria-label="Previous Image"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 6L9 12L15 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            className="gallery-nav-button next"
            onClick={goNext}
            aria-label="Next Image"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 6L15 12L9 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="location-details">
        <h3 className="location-name">{location.name}</h3>

        <div className="location-features">
          {location.features.map((feature, index) => (
            <span key={index} className="location-feature">
              {feature}
            </span>
          ))}
        </div>

        <p className="location-description">{location.description}</p>

        <a
          href={location.url}
          className="location-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          Location anfragen
        </a>
      </div>
    </div>
  );
};

export default LocationCard;

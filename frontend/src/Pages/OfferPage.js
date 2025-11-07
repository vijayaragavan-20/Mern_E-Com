import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./OfferPage.css";

const slides = [
  {
    id: 1,
    image: "/amazon1.png",
    // title: "Lovable. Drawable. Magical.",
    // subtitle: "Shop now",
    link: "/products/ipad",
  },
  {
    id: 2,
    image: "/amazon2.jpg",
    // title: "Power meets portability.",
    // subtitle: "Explore iPad Pro",
    link: "/products/ipad-pro",
  },
  {
    id: 3,
    image: "/amazon3.png",
    // title: "New colors, new style.",
    // subtitle: "Discover iPad Air",
    link: "/products/ipad-air",
  },
];

const OfferPage = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleRedirect = () => {
    navigate('/Products');
  };

  return (
    <div className="offer-container">
      <h1 className="offer-heading">Special Offers</h1>

      <div className="offer-slider">
        <button onClick={prevSlide} className="nav-button">❮</button>

        <div className="slide-content">
          <h2>{slides[current].title}</h2>
          <p>{slides[current].subtitle}</p>
          <img src={slides[current].image} alt="Slide" className="slide-image" />

          <div className="button-container">
            <button onClick={handleRedirect} className="shop-button">
              Shop Now
            </button>
          </div>
        </div>

        <button onClick={nextSlide} className="nav-button">❯</button>
      </div>

      <div className="dots-container">
        {slides.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrent(index)}
            className={`dot ${current === index ? "active" : "inactive"}`}
          >
            ●
          </span>
        ))}
      </div>
    </div>
  );
};

export default OfferPage;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Offers.css';
import exclusive_img from '../Assets/exclusive_offer.png';

const Offers = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/OfferPage');
  };

  return (
    <div className='offers'>
      <div className='offers-container'>
        <div className='offers-left'>
          <h1>Exclusive</h1>
          <h1>Offers For You</h1>
          <p>ONLY ON BEST SELLERS PRODUCTS</p>
          <button onClick={handleRedirect}>Check Now</button>
        </div>
        <div className='offers-right'>
          <img src={exclusive_img} alt='Exclusive Offer' />
        </div>
      </div>
    </div>
  );
};

export default Offers;

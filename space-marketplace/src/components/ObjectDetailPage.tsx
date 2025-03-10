import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ObjectDetailPage.css'; // Make sure to add the corresponding CSS

const ObjectDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { object } = location.state; // Object passed through navigation state

  // State for offer price
  const [offerPrice, setOfferPrice] = useState("");

  // Handle offer price input change
  const handleOfferPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOfferPrice(e.target.value);
  };

  // Handle create demand and perform API call simulation
  const handleCreateDemand = () => {
    // Simulate API call to backend - /api/demand
    if (offerPrice) {
      alert(`Demand created to buy ${object.name} with an offer price of ${offerPrice}`);
    } else {
      alert('Please enter an offer price.');
    }
  };

  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="object-detail-page">
      <h1>{object.name}</h1>
      <div className="detail-container">
        <div className="info-container">
          <p><strong>Position:</strong> {object.position}</p>
          <p><strong>Date of First Observation:</strong> {object.date}</p>
          <p><strong>Distance from Earth:</strong> {object.distance}</p>
          <p><strong>Size:</strong> {object.size}</p>
          <p><strong>Suggested Action:</strong> {object.suggest}</p>

          <div className="line"></div> {/* Line before the registration text */}
          <div className="offer-price-container">
            <label htmlFor="offer-price">Enter Your Offer Price:</label>
            <input
              type="number"
              id="offer-price"
              value={offerPrice}
              onChange={handleOfferPriceChange}
              placeholder="Enter offer price"
            />
          </div>
          <div className="buttons-container">
            <button onClick={handleCreateDemand}>Create Demand to Buy</button>
            <div className="line"></div> {/* Line before the registration text */}
            <button onClick={handleGoBack} className="go-back-button">Go Back</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ObjectDetailPage;

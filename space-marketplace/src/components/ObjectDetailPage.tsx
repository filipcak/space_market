import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ObjectDetailPage.css'; // Make sure to add the corresponding CSS
import { backenUrl } from '../global/constants';

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
  const handleCreateDemand = async () => {
    if (!offerPrice) {
      alert('Please enter an offer price.');
      return;
    }
  
    const user_id = localStorage.getItem("user_id"); // Replace with real user ID (e.g. from session/auth)
  
    try {
      const response = await fetch(backenUrl + "/demands", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user_id,
          galactic_object_id: object.uuid,
          price_eur: parseFloat(offerPrice),
        }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }
  
      const result = await response.json();
      alert(`✅ Demand created for ${object.name} with offer of €${result.price_eur}`);
      setOfferPrice(""); // Clear input
    } catch (err) {
      console.error("Error creating demand:", err);
      alert("❌ Failed to create demand. Please try again.");
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
      <p><strong>Object Unique ID:</strong> {object.uuid}</p>
      <p><strong>Date of Discovery:</strong> {new Date(object.discovered_at).toLocaleDateString()}</p>
      <p><strong>Distance from Earth:</strong> {object.distance_from_earth_parsec} parsecs</p>
      <p><strong>Radius:</strong> {object.radius_km} km</p>
      <p><strong>Mass:</strong> {object.mass_kg} kg</p>

      <div className="line"></div>

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
        <div className="line"></div>
        <button onClick={handleGoBack} className="go-back-button">Go Back</button>
      </div>
    </div>
  </div>
</div>

  );
};

export default ObjectDetailPage;

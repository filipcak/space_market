import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchSpacePage.css"; // Make sure to add the corresponding CSS
import { backenUrl } from "../global/constants";

// Define SpaceObject interface
export interface SpaceObject {
  uuid: string;
  name: string;
  type_id: string;
  mass_kg: number;
  radius_km: number;
  distance_from_earth_parsec: number;
  discovered_at: string;
  owner_id: string;
  created_at: string;
}


const SearchSpacePage = () => {
  const [spaceObjects, setSpaceObjects] = useState<SpaceObject[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [filteredObjects, setFilteredObjects] = useState(spaceObjects);
  const navigate = useNavigate();

  // Handle search input change
  const handleSearchTest = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Filter objects based on search term
    const filtered = spaceObjects.filter((object) =>
      object.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredObjects(filtered);
  };

  // Define the type for the object parameter
  const handleViewDetail = (object: SpaceObject) => {
    navigate('/object-detail', { state: { object } });
  };

  // Handle Go Back functionality
  const handleGoBack = () => {
    navigate('/space');
  };

  const handleSearch = async () => {
    try {
      const res = await fetch(backenUrl + `/galactic_objects_search?name=${encodeURIComponent(searchTerm)}`);
      if (!res.ok) {
        throw new Error("Search failed");
      }
  
      const data = await res.json();
      if (data.length === 0) {
        setError("No matching galactic object found.");
        setSpaceObjects([]);
      } else {
        setError("");
        setSpaceObjects(data);
        setFilteredObjects(data); 
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
      setSpaceObjects([]);
      setFilteredObjects([]);
    }
  };

  useEffect(() => {
    fetch(backenUrl + "/galactic_objects")
      .then((res) => res.json())
      .then((data) => {
        setSpaceObjects(data);
        setFilteredObjects(data);
      })
      .catch((err) => {
        console.error("Failed to fetch space objects", err);
      });
  }, []);
  

  return (
    <div className="search-space-page">
      <h1>Search Space Objects</h1>
        <div className="search-controls">
          <input
            type="text"
            placeholder="Enter object name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar"
          />
          <button  onClick={handleSearch}>Search</button>
        </div>

      {error && <div className="error-popup">{error}</div>}
      <table className="space-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Object Unique Identifier</th>
            <th>Date of First Observation</th>
            <th>Distance from Earth</th>
            <th>Size</th>
            <th>Weight</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {filteredObjects.map((object) => (
            <tr key={object.uuid}>
              <td>{object.name}</td>
              <td>{object.uuid}</td>
              <td>{new Date(object.discovered_at).toLocaleDateString()}</td>
              <td>{object.distance_from_earth_parsec} pc</td>
              <td>{object.radius_km} km</td>
              <td>{object.mass_kg} kg</td>
              <td><button onClick={() => handleViewDetail(object)}>View Detail</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Go Back Button */}
      <button onClick={handleGoBack} className="go-back-button">Go Back</button>
    </div>
  );
};

export default SearchSpacePage;

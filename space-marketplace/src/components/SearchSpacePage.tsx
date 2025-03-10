import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchSpacePage.css"; // Make sure to add the corresponding CSS

// Define SpaceObject interface
export interface SpaceObject {
  id: number;
  name: string;
  position: string;
  date: string;
  distance: string;
  size: string;
  suggest: string;
}

const SearchSpacePage = () => {
  const spaceObjects: SpaceObject[] = [
    { id: 1, name: "Alpha Centauri", position: "RA: 14h 39m 36s, Dec: -60° 50′ 02″", date: "1995-08-01", distance: "4.37 light years", size: "1.21x10^9 km³", suggest: "Observation needed", },
    { id: 2, name: "Betelgeuse", position: "RA: 05h 55m 10s, Dec: +07° 24′ 25″", date: "2017-02-05", distance: "642.5 light years", size: "1.48x10^15 km³", suggest: "Possible supernova", },
    { id: 3, name: "Sirius", position: "RA: 06h 45m 08s, Dec: -16° 42′ 58″", date: "1844-01-01", distance: "8.6 light years", size: "2.92x10^12 km³", suggest: "Stable", },
    { id: 4, name: "Andromeda Galaxy", position: "RA: 00h 42m 44s, Dec: +41° 16′ 09″", date: "1785-01-01", distance: "2.537 million light years", size: "2.92x10^17 km³", suggest: "Study merger", },
    { id: 5, name: "Proxima Centauri", position: "RA: 14h 29m 42s, Dec: -62° 40′ 46″", date: "1915-03-23", distance: "4.24 light years", size: "1.68x10^9 km³", suggest: "Host planet discovery", },
    { id: 6, name: "Rigel", position: "RA: 05h 14m 32s, Dec: -08° 12′ 06″", date: "1830-01-01", distance: "860 light years", size: "2.84x10^14 km³", suggest: "Alpha star", },
    { id: 7, name: "Vega", position: "RA: 18h 36m 56s, Dec: +38° 47′ 01″", date: "1850-12-12", distance: "25 light years", size: "6.12x10^12 km³", suggest: "Analyze light fluctuations", },
    { id: 8, name: "Antares", position: "RA: 16h 29m 24s, Dec: -26° 25′ 55″", date: "2001-07-20", distance: "550 light years", size: "2.06x10^16 km³", suggest: "Supernova potential", },
    { id: 9, name: "Spica", position: "RA: 13h 25m 11s, Dec: -11° 09′ 41″", date: "1927-04-15", distance: "250 light years", size: "3.44x10^13 km³", suggest: "Binary system", },
    { id: 10, name: "Altair", position: "RA: 19h 50m 47s, Dec: +08° 52′ 06″", date: "1899-09-04", distance: "16.7 light years", size: "2.66x10^12 km³", suggest: "Main sequence star", },
    // Add more objects here to simulate 30 total
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredObjects, setFilteredObjects] = useState(spaceObjects);
  const navigate = useNavigate();

  // Handle search input change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  return (
    <div className="search-space-page">
      <h1>Search Space Objects</h1>
      <input
        type="text"
        placeholder="Search by object name..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-bar"
      />
      <table className="space-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Date of First Observation</th>
            <th>Distance from Earth</th>
            <th>Size</th>
            <th>Suggestions</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {filteredObjects.map((object) => (
            <tr key={object.id}>
              <td>{object.name}</td>
              <td>{object.position}</td>
              <td>{object.date}</td>
              <td>{object.distance}</td>
              <td>{object.size}</td>
              <td>{object.suggest}</td>
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

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SpacePage.css"; // Use same styles
import { backenUrl } from "../global/constants";

const AdminPage = () => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [typeName, setTypeName] = useState("Planet");
  const [mass, setMass] = useState("");
  const [radius, setRadius] = useState("");
  const [distance, setDistance] = useState("");
  const [discoveredAt, setDiscoveredAt] = useState("");
  const [showDeleteTable, setShowDeleteTable] = useState(false);
  const [objects, setObjects] = useState([]);
  

  const owner_id = localStorage.getItem("user_id");

  const handleSubmit = async () => {
    if (!owner_id) return alert("User ID not found.");

    try {
      const res = await fetch(`${backenUrl}/add_galactic_objects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          type_name: typeName,
          mass_kg: parseFloat(mass),
          radius_km: parseFloat(radius),
          distance_from_earth_parsec: parseFloat(distance),
          discovered_at: discoveredAt,
          owner_id,
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to add object");

      alert("✅ Object added successfully!");
      setShowModal(false);
      setName("");
      setMass("");
      setRadius("");
      setDistance("");
      setDiscoveredAt("");
    } catch (err) {
      alert("❌ Error adding object.");
      console.error(err);
    }
  };

  const handleDeleteObject = async (uuid: string) => {
    if (!window.confirm("Are you sure you want to delete this object?")) return;
  
    try {
      const res = await fetch(`${backenUrl}/galactic_objects/${uuid}`, {
        method: "DELETE",
      });
  
      if (!res.ok) throw new Error("Failed to delete");
  
      alert("✅ Object deleted.");
      setObjects(objects.filter((obj: any) => obj.uuid !== uuid));
    } catch (err) {
      console.error("Delete error:", err);
      alert("❌ Error deleting object.");
    }
  };
  

  return (
    <div className="space-page">
      <form>
        <h1>Admin Page</h1>
        <div className="button-container">
          <button type="button" onClick={() => setShowModal(true)}>Add Space Object</button>
          <button
            type="button"
            onClick={() => {
              setShowDeleteTable(true);
              fetch(`${backenUrl}/galactic_objects`)
                .then((res) => res.json())
                .then(setObjects)
                .catch(console.error);
            }}
          >
            Remove Space Object
          </button>
          <button type="button" onClick={() => navigate("/space")}>Go Back</button>
        </div>
      </form>
      {showDeleteTable && (
        <div className="modal">
          <div className="modal-content">
            <h2>Remove Space Object</h2>
            <table className="space-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Discovered</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {objects.map((obj: any) => (
                  <tr key={obj.uuid}>
                    <td>{obj.name}</td>
                    <td>{obj.type_id}</td>
                    <td>{new Date(obj.discovered_at).toLocaleDateString()}</td>
                    <td>
                      <button
                        onClick={() => handleDeleteObject(obj.uuid)}
                        className="delete-button"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="modal-buttons">
              <button type="button" onClick={() => setShowDeleteTable(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}



      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add Space Object</h2>
            <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input placeholder="Mass (kg)" type="number" value={mass} onChange={(e) => setMass(e.target.value)} />
            <input placeholder="Radius (km)" type="number" value={radius} onChange={(e) => setRadius(e.target.value)} />
            <input placeholder="Distance (parsec)" type="number" value={distance} onChange={(e) => setDistance(e.target.value)} />
            <input placeholder="Discovery Date" type="date" value={discoveredAt} onChange={(e) => setDiscoveredAt(e.target.value)} />
            <div className="modal-buttons">
              <button type="button" onClick={handleSubmit}>Submit</button>
              <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;

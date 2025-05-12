import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { backenUrl } from "../global/constants";
import "./SearchSpacePage.css";

interface Demand {
  uuid: string;
  user_id: string;
  galactic_object_id: string;
  price_eur: number;
  status: string;
  created_at: string;
}

interface GalacticObject {
  uuid: string;
  name: string;
  has_offer: boolean;
}

const DemandsPage = () => {
  const [userDemands, setUserDemands] = useState<Demand[]>([]);
  const [objectDemands, setObjectDemands] = useState<Demand[]>([]);
  const [ownedObjects, setOwnedObjects] = useState<GalacticObject[]>([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const user_id = localStorage.getItem("user_id");
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!user_id) {
      setError("User not logged in.");
      return;
    }
  
    // Fetch user demands
    fetch(`${backenUrl}/demands?user_id=${user_id}`)
      .then((res) => res.json())
      .then(setUserDemands)
      .catch((err) => {
        console.error("Failed to fetch user demands:", err);
        setError("Failed to load your demands.");
      });
  
    // Fetch owned objects and all demands
    Promise.all([
      fetch(`${backenUrl}/galactic_objects/owned_by/${user_id}`).then((res) => res.json()),
      fetch(`${backenUrl}/demands`).then((res) => res.json())
    ])
      .then(([ownedObjs, allDemands]) => {
        setOwnedObjects(ownedObjs);
        const ownedIds = new Set(ownedObjs.map((obj: GalacticObject) => obj.uuid));
        const filtered = allDemands.filter((d: Demand) => ownedIds.has(d.galactic_object_id));
        setObjectDemands(filtered);
      })
      .catch((err) => {
        console.error("Failed to fetch object demands:", err);
        setError("Failed to load demands for your objects.");
      });
  
  }, [user_id, refreshKey]); 
  

  const handleGoBack = () => {
    navigate("/space");
  };

  const handleConfirmOffer = async (objectId: string) => {
    // Find the first demand on that object
    const demand = objectDemands.find(d => d.galactic_object_id === objectId && d.status === "pending");
  
    if (!demand) {
      alert("No pending offer found for this object.");
      return;
    }
  
    try {
      const res = await fetch(`${backenUrl}/demands/${demand.uuid}/confirm`, {
        method: "POST",
      });
  
      const result = await res.json();
  
      if (!res.ok) {
        throw new Error(result.error || "Failed to confirm offer");
      }
  
      alert("Offer confirmed!");
      setRefreshKey(prev => prev + 1);
      // Optional: Refresh the page or update state
      setObjectDemands(prev =>
        prev.map(d => d.uuid === demand.uuid ? { ...d, status: "accepted" } : d)
      );
    } catch (err) {
      console.error("Confirm error:", err);
      setRefreshKey(prev => prev + 1);
      alert("Could not confirm offer.");
    }
  };

  const handleDeclineOffer = async (objectId: string) => {
    const demand = objectDemands.find(d => d.galactic_object_id === objectId && d.status === "pending");
  
    if (!demand) {
      alert("No pending offer found to decline.");
      return;
    }
  
    const confirmed = window.confirm("Are you sure you want to decline this offer?");
    if (!confirmed) return;
  
    try {
      const res = await fetch(`${backenUrl}/demands/${demand.uuid}`, {
        method: "DELETE",
      });
  
      if (!res.ok) {
        throw new Error("Failed to decline (delete) offer.");
      }
  
      alert("Offer declined.");
      setRefreshKey(prev => prev + 1);
      setObjectDemands(prev => prev.filter(d => d.uuid !== demand.uuid));
    } catch (err) {
      console.error("Decline error:", err);
      setRefreshKey(prev => prev + 1);
      alert("Could not decline offer.");
    }
  };
  
  

  return (
    <div className="search-space-page">
      <h1>Your Purchase Demands</h1>
      {error && <div className="error-popup">{error}</div>}

      {userDemands.length > 0 ? (
        <>
          <h3>Demands You've Placed</h3>
          <table className="space-table">
            <thead>
              <tr>
                <th>Demand ID</th>
                <th>Object ID</th>
                <th>Price (€)</th>
                <th>Status</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {userDemands.map((demand) => (
                <tr key={demand.uuid}>
                  <td>{demand.uuid}</td>
                  <td>{demand.galactic_object_id}</td>
                  <td>{demand.price_eur}</td>
                  <td>{demand.status}</td>
                  <td>{new Date(demand.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        !error && <p>No demands placed by you.</p>
      )}

    {ownedObjects.length > 0 && (
    <>
        <h3>Your Galactic Objects</h3>
        <table className="space-table">
        <thead>
            <tr>
            <th>Object Name</th>
            <th>Object ID</th>
            <th>Offer Status</th>
            </tr>
        </thead>
        <tbody>
            {ownedObjects.map((obj) => (
            <tr key={obj.uuid}>
                <td>{obj.name}</td>
                <td>{obj.uuid}</td>
                <td>
                    {obj.has_offer ? (
                        <div style={{ display: "flex", gap: "10px" }}>
                        <button onClick={() => handleConfirmOffer(obj.uuid)}>
                            Confirm Offer
                        </button>
                        <button
                            onClick={() => handleDeclineOffer(obj.uuid)}
                            style={{ backgroundColor: "crimson", color: "white" }}
                        >
                            Decline Offer
                        </button>
                        </div>
                    ) : (
                        "No offers"
                    )}
                </td>

            </tr>
            ))}
        </tbody>
        </table>
    </>
    )}
      <button onClick={handleGoBack} className="go-back-button">Go Back</button>
    </div>
  );
};

export default DemandsPage;

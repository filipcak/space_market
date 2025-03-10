import { useNavigate } from "react-router-dom";
import "./SpacePage.css"; // Make sure to add the corresponding CSS

const AdminPage = () => {
  const navigate = useNavigate();

  // Navigate back to the SpacePage
  const handleGoBack = () => {
    navigate("/space"); // Navigate to the Space Page
  };

  // Handle Add Space Object functionality
  const handleAddSpaceObject = () => {
    alert("Work in Progress: Add Space Object");
  };

  // Handle Remove Space Object functionality
  const handleRemoveSpaceObject = () => {
    alert("Work in Progress: Remove Space Object");
  };

  // Handle Update Space Object functionality
  const handleUpdateSpaceObject = () => {
    alert("Work in Progress: Update Space Object");
  };

  return (
    <div className="space-page">
      <form>
        <h1>Admin Page</h1>
        <div className="button-container">
          <button type="button" onClick={handleAddSpaceObject}>Add Space Object</button>
          <button type="button" onClick={handleRemoveSpaceObject}>Remove Space Object</button>
          <button type="button" onClick={handleUpdateSpaceObject}>Update Space Object</button>
          <button type="button" onClick={handleGoBack}>Go Back</button> {/* Go Back Button */}
        </div>
      </form>
    </div>
  );
};

export default AdminPage;

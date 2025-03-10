import { useNavigate } from "react-router-dom";
import "./SpacePage.css"; // Make sure to add corresponding CSS

const SpacePage = () => {
  const navigate = useNavigate();

  // Navigate to the Search Space Page
  const handleSearch = () => {
    navigate("/search-space");
  };

  // Navigate to the Admin Page
  const handleAdmin = () => {
    navigate("/admin");
  };

  // Handle Log Out and navigate to the homepage
  const handleLogout = () => {
    navigate("/"); // This will navigate the user to the homepage
  };

  return (
    <div className="space-page">
      <form>
        <h1>Welcome to the Space Marketplace!</h1>
        <div className="button-container">
          <button type="button" onClick={handleSearch}>Search Space Object</button>
          <button type="button" onClick={handleAdmin}>Admin Page</button>
          <button type="button" onClick={handleLogout}>Log Out</button> {/* Log Out Button */}
        </div>
      </form>
    </div>
  );
};

export default SpacePage;

import React, { useState, useEffect } from "react";
import "../styles/WelcomePage.css";
import "../styles/Profile.css"; // Include Profile.css for profile styles
import { Link } from "react-router-dom";
import Chatbot from "./Chatbot";
import Profile from "./Profile";

const WelcomePage = () => {
  const [userName, setUserName] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserName(`${user.firstName} ${user.lastName}`);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const toggleProfileDrawer = () => {
    setIsProfileOpen(!isProfileOpen);
    if (isSettingsOpen) {
      setIsSettingsOpen(false);
    }
  };

  const toggleSettingsDrawer = () => {
    setIsSettingsOpen(!isSettingsOpen);
    if (isProfileOpen) {
      setIsProfileOpen(false);
    }
  };

  const handleThemeChange = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  const closeSettingsDrawer = () => {
    setIsSettingsOpen(false);
  };

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        setIsProfileOpen(false);
        setIsSettingsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, []);
  return (
    <div className={`welcome-page ${theme === "dark" ? "dark-theme" : ""}`}>
      <div className="navbar">
        <div className="dropdown">
          <button className="dropbtn">☰</button>
          <div className="dropdown-content">
            <button onClick={toggleProfileDrawer}>Profile</button>
            <Link to="/">Home</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/learn">Learn with SmathaKrisan</Link>
            <button onClick={toggleSettingsDrawer}>Settings</button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
      <div className="welcome-popup">
        <h1 className="greet">👋 Hi, {userName ? userName : "Loading..."}!</h1>
      </div>
      <div className={`profile-section ${isProfileOpen ? "open" : ""}`}>
        {isProfileOpen && <Profile onClose={toggleProfileDrawer} />}
      </div>
      <div className={`settings-drawer ${isSettingsOpen ? "open" : ""}`}>
        {isSettingsOpen && (
          <div className="settings-content">
            <button className="close-btn" onClick={closeSettingsDrawer}>
              Close
            </button>
            <h2>Settings</h2>
            <div className="theme-switch">
              <p>Theme</p>
              <label className="switch">
                <input
                  type="checkbox"
                  onChange={handleThemeChange}
                  checked={theme === "dark"}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        )}
      </div>
      <Link to="/learn" className="learn-link">
        Learn with Smathakrisan
      </Link>
      <Chatbot />
    </div>
  );
};

export default WelcomePage;

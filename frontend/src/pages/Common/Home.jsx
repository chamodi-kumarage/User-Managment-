import React from "react";
import "../../styles/Common/Home.css";
import Navbar from "../../components/layout/Navbar";
import homeimg from "../../assets/images/homeimg.png";

const Home = () => {
  return (
    <div 
      className="home-container"
      style={{ backgroundImage: `url(${homeimg})` }}
    >
      <Navbar />

      <div className="home-content">
        <h1 className="home-title">Welcome to User Management System</h1>
        <p className="home-subtitle">
          Manage users securely with role-based login, sign-up & authentication
        </p>

        <div className="home-buttons">
          <a href="/signup" className="btn-primary">Sign Up</a>
          <a href="/signin" className="btn-secondary">Sign In</a>
        </div>
      </div>
    </div>
  );
};

export default Home;

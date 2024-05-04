import React from "react";
import "bootstrap/dist/css/bootstrap.css";
// import "./Navbar.css";
import "../App.css";
import { NavLink, Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav id="navbarSticky" className="navbar">
      <div className="navbar-logo">
        <NavLink to="/">
          <img src="" alt="image1" />
        </NavLink>
      </div>
      <ul className="navbar-links">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : undefined)}
            end
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/register"
            className={({ isActive }) => (isActive ? "active" : undefined)}
            end
          >
            Register
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? "active" : undefined)}
            end
          >
            Login
          </NavLink>
        </li>
        
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            About Us
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : undefined)}
            to="/contactus"
          >
            Contact Us
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

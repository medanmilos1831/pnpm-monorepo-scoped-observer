import React from "react";
import { Link, useLocation } from "react-router-dom";

export const Navigation: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav
      style={{
        background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
        padding: "1rem 2rem",
        borderBottom: "1px solid rgba(64, 64, 64, 0.3)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link
          to="/"
          style={{
            color: "#00bcd4",
            textDecoration: "none",
            fontSize: "1.5rem",
            fontWeight: "bold",
            textShadow: "0 0 20px rgba(0, 188, 212, 0.5)",
          }}
        >
          Scoped Observer
        </Link>

        <div
          style={{
            display: "flex",
            gap: "2rem",
            alignItems: "center",
          }}
        >
          <Link
            to="/"
            style={{
              color: isActive("/") ? "#00bcd4" : "#e0e0e0",
              textDecoration: "none",
              padding: "0.5rem 1rem",
              borderRadius: "8px",
              transition: "all 0.3s ease",
              background: isActive("/") ? "rgba(0, 188, 212, 0.1)" : "transparent",
              border: isActive("/") ? "1px solid rgba(0, 188, 212, 0.3)" : "1px solid transparent",
            }}
          >
            Home
          </Link>

          <Link
            to="/about"
            style={{
              color: isActive("/about") ? "#00bcd4" : "#e0e0e0",
              textDecoration: "none",
              padding: "0.5rem 1rem",
              borderRadius: "8px",
              transition: "all 0.3s ease",
              background: isActive("/about") ? "rgba(0, 188, 212, 0.1)" : "transparent",
              border: isActive("/about") ? "1px solid rgba(0, 188, 212, 0.3)" : "1px solid transparent",
            }}
          >
            About
          </Link>

          <Link
            to="/contact"
            style={{
              color: isActive("/contact") ? "#00bcd4" : "#e0e0e0",
              textDecoration: "none",
              padding: "0.5rem 1rem",
              borderRadius: "8px",
              transition: "all 0.3s ease",
              background: isActive("/contact") ? "rgba(0, 188, 212, 0.1)" : "transparent",
              border: isActive("/contact") ? "1px solid rgba(0, 188, 212, 0.3)" : "1px solid transparent",
            }}
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

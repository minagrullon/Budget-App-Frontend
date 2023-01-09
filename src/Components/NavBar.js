import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  return (
    <div className="navbar">
      <Link className="nav_link" to="/">
        Home{" "}
      </Link>
      <Link className="nav_link" to="/transactions">
        Transactions
      </Link>
      <button className="new_button">
        <Link className="nav_link" to="/transactions/new">
          New
        </Link>
      </button>
    </div>
  );
}

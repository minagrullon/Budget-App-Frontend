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
        <h3>Transactions</h3>
      </Link>
      <button className="new_button">
        <Link className="nav_link" to="/transactions/new">
          New Transaction
        </Link>
      </button>
    </div>
  );
}

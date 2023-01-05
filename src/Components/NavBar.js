import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="navbar">
      <Link className="nav_link" to="/">
        Home{" "}
      </Link>
      <Link className="nav_link" to="/transactions">
        Transactions
      </Link>
      <button>
        <Link className="nav_link" to="/transactions/new">
          New
        </Link>
      </button>
    </div>
  );
}

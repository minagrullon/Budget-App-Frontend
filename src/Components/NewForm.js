import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const API = process.env.REACT_APP_API_URL;

export default function NewForm() {
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState({
    item_name: "",
    amount: 0,
    date: "",
    from: "",
    category: "",
    id: 0,
  });

  const handleTextChanges = (e) => {
    setTransaction({
      ...transaction,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${API}/transactions`, transaction)
      .then(() => navigate("/transactions"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="new_form">
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="item_name" className="item">
          Item Name:{" "}
          <input
            type="text"
            id="item_name"
            name="item_name"
            value={transaction.item_name}
            onChange={handleTextChanges}
            required
          ></input>
        </label>
        <label htmlFor="amount" className="item">
          Amount:{" "}
          <input
            type="number"
            id="amount"
            name="amount"
            value={transaction.amount}
            required
            onChange={handleTextChanges}
          ></input>
        </label>
        <label htmlFor="date" className="item">
          Date:{" "}
          <input
            type="date"
            id="date"
            name="date"
            value={transaction.date}
            required
            onChange={handleTextChanges}
          ></input>
        </label>
        <label htmlFor="from" className="item">
          From:{" "}
          <input
            type="text"
            id="from"
            name="from"
            value={transaction.from}
            required
            onChange={handleTextChanges}
          ></input>
        </label>
        <label htmlFor="category" className="item">
          Category:{" "}
          <input
            type="text"
            id="category"
            name="category"
            value={transaction.category}
            required
            onChange={handleTextChanges}
          ></input>
        </label>
        <button type="submit" className="submit">
          Save
        </button>
      </form>
      <button onClick={() => navigate("/transactions")}>Back</button>
    </div>
  );
}

import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { v4 as uuid } from "uuid";
const API = process.env.REACT_APP_API_URL;

export default function NewForm() {
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState({
    item_name: "",
    amount: 0,
    date: "",
    from: "",
    category: "",
    id: uuid(),
  });

  console.log(transaction.id);
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
      .then(() => {
        navigate("/transactions");
      })
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
        <hr></hr>
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
        <hr></hr>
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
        <hr></hr>
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
        <hr></hr>
        <label htmlFor="category" className="item">
          Category:{" "}
          <select
            onChange={handleTextChanges}
            id="category"
            value={transaction.category}
          >
            <option value="" id="">
              Select...
            </option>

            <option value="Rent">Rent</option>

            <option value="Income">Income</option>

            <option value="Food">Food</option>

            <option value="Furniture">Furniture</option>

            <option value="Clothes">Clothes</option>

            <option value="Pets">Pets</option>

            <option value="Insurance">Insurance</option>

            <option value="Medical">Medical</option>

            <option value="Taxes">Taxes</option>

            <option value="Leisure">Leisure</option>
          </select>
        </label>

        <button type="submit" className="submit">
          Save
        </button>
      </form>
      <button className="back_button" onClick={() => navigate("/transactions")}>
        Back
      </button>
    </div>
  );
}

import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export default function EditForm() {
  let { index } = useParams();
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
    setTransaction({ ...transaction, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    axios
      .get(`${API}/transactions/${index}`)
      .then((res) => {
        setTransaction(res.data);
      })
      .catch((err) => console.log(err));
  }, [index]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${API}/transactions/${index}`, transaction)
      .then((res) => {
        setTransaction(res.data);
        navigate(`/transactions/${index}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="edit_form">
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

      <button
        className="back_button"
        onClick={() => navigate(`/transactions/${index}`)}
      >
        Back{" "}
      </button>
    </div>
  );
}

import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
const API = process.env.REACT_APP_API_URL;

export default function Show() {
  const { index } = useParams();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/transactions/${index}`)
      .then((res) => {
        setTransaction(res.data);
      })
      .catch((err) => navigate("/*"));
  }, [index]);

  function deleteTransaction() {
    axios
      .delete(`${API}/transactions/${index}`)
      .then(() => {
        navigate("/transactions");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <h2>Show</h2>
      <div className="transaction_details" style={{ textAlign: "center" }}>
        <h3>{transaction.item_name}</h3>
        <h4>${transaction.amount}</h4>
        <h5>{transaction.date}</h5>
        <h5>{transaction.from}</h5>
      </div>
      <div className="show_page_buttons">
        <button onClick={() => navigate("/transactions")}>Back</button>
        <button onClick={() => navigate(`/transactions/${index}/edit`)}>
          Edit
        </button>
        <button onClick={deleteTransaction}>Delete</button>
      </div>
    </div>
  );
}

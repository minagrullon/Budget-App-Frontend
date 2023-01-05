import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const API = process.env.REACT_APP_API_URL;

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/transactions`)
      .then((res) => {
        setTransactions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h3>Transactions</h3>
      <div className="transactions_list">
        <hr></hr>
        {transactions.map((transaction, index) => {
          return (
            <div
              className="transaction_item"
              key={transaction.id}
              style={{
                border: "solid 1px black",
                margin: "5px",
                padding: "5px",
              }}
            >
              <Link
                to={`/transactions/${index}`}
                style={{ textDecoration: "none" }}
              >
                <h4>{transaction.item_name}</h4>
                <h5>${transaction.amount}</h5>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

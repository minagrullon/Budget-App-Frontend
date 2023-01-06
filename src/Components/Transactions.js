import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const API = process.env.REACT_APP_API_URL;

export default function Transactions() {
  const [total, setTotal] = useState(0);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/transactions`)
      .then((res) => {
        setTransactions(res.data);
        setTotal(calculateTotal());
      })
      .catch((err) => {
        console.log(err);
      });
  }, [total]);

  function calculateTotal() {
    let calc = transactions.reduce((acc, transaction) => {
      if (transaction.category === "Income") {
        acc += transaction.amount;
      } else {
        acc -= transaction.amount;
      }
      return acc;
    }, 0);
    return calc;
  }

  return (
    <div>
      <h2>Transactions</h2>
      <h3>Total in the bank: $ {total}</h3>
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

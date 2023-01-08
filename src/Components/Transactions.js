import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Transactions.css";
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

  let total = transactions.reduce((acc, transaction) => {
    if (transaction.category === "Income") {
      acc += Number(transaction.amount);
    } else {
      acc -= Number(transaction.amount);
    }
    return acc;
  }, 0);

  return (
    <div className="transactions_index">
      <h2>Transactions</h2>
      <h3>Total in the bank: $ {total}</h3>
      <div className="transactions_list">
        <hr></hr>
        <table
          className="transaction_item"
          style={{
            border: "solid 1px black",
            margin: "5px",
            padding: "5px",
          }}
        >
          <tr>
            <thead>
              <th className="date">Date</th>
              <th>Item</th>
              <th className="amount">Amount</th>
            </thead>
          </tr>
          {transactions.map((transaction, index) => {
            return (
              <>
                <tbody key={transaction.id}>
                  <tr>
                    <td>{transaction.date}</td>
                    <td className="item">
                      <Link
                        to={`/transactions/${index}`}
                        style={{ textDecoration: "none" }}
                      >
                        {transaction.item_name}
                      </Link>
                    </td>
                    <td>{transaction.amount}</td>
                  </tr>
                </tbody>
              </>
            );
          })}
        </table>
      </div>
    </div>
  );
}

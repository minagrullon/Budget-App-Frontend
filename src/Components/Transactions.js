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

  let sorted = transactions.sort((a, b) => a.date - b.date);

  return (
    <div className="transactions_index">
      <h2>Transactions</h2>
      <h3>Total in the bank: $ {total}</h3>
      <div className="transactions_list">
        <hr></hr>
        <div
          className="transaction_item"
          style={{
            border: "solid 1px black",
            margin: "5px",
            padding: "5px",
          }}
        >
          <div className="headers">
            <h3 className="date">Date</h3>
            <h3>Item</h3>
            <h3 className="amount">Amount</h3>
          </div>
          {transactions
            .map((transaction, index) => {
              return (
                <div className="details" key={transaction.id}>
                  <h5>{transaction.date}</h5>
                  <h4 className="item">
                    <Link
                      to={`/transactions/${index}`}
                      style={{ textDecoration: "none" }}
                    >
                      {transaction.item_name}
                    </Link>
                  </h4>
                  <h5>$ {transaction.amount}</h5>
                </div>
              );
            })
            .sort((a, b) => a.date - b.date)}
          {/* {sorted.map((transaction, index) => {
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
          })} */}
        </div>
      </div>
    </div>
  );
}

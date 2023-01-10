import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Transactions.css";
const API = process.env.REACT_APP_API_URL;

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API}/transactions`)
      .then((res) => {
        setTransactions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [transactions]);

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
      <h3>Total in the bank: </h3>
      <h3
        style={{ color: total >= 1000 ? "green" : total >= 1 ? "grey" : "red" }}
      >
        $ {total}
      </h3>
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
          {transactions.map((transaction, index) => {
            return (
              <div className="details" key={transaction.id}>
                <h4>{transaction.date}</h4>
                <h4 className="item">
                  <Link
                    to={`/transactions/${index}`}
                    style={{ textDecoration: "none", color: "brown" }}
                  >
                    {transaction.item_name}
                  </Link>
                </h4>
                <h4>$ {transaction.amount}</h4>
                <div className="buttons">
                  <Link
                    to={`/transactions/${index}/edit`}
                    style={{ textDecoration: "none", color: "brown" }}
                  >
                    Edit{" "}
                  </Link>
                </div>
              </div>
            );
          })}
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

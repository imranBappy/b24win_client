/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from "react";
import { connect } from "react-redux";
import validateNumber from "../../utils/validateNumber";
import { TransactionInputRequestAction } from "../../store/actions/transactionAction";
import { ModalContext } from "../Layout/Layout";
import "./TransactionInput.css";
import axios from "axios";
import {useHistory} from 'react-router-dom'
const TransactionInput = (props) => {
  const methods = ["Bkash", "Rocket", "Nagad"];
  const history = useHistory()
  const defaultValue = props.transaction === "deposit" ? 300 : 500;
  const [, setOpen] = useContext(ModalContext);
  const [TransactionInput, setTransactionInput] = useState({
    amount: defaultValue,
    type: "personal",
    method: "",
    number: "",
    trxId: "",
    transaction: props.transaction,
  });
  const [number, setNumber] = useState([]);

  const [error, setError] = useState({
    amount: "",
    number: "",
    trxId: "",
    method: "",
  });
  useEffect(() => {
    if (props.user.balance < defaultValue && props.transaction === "withdraw") {
      setTransactionInput({
        ...TransactionInput,
        message: "There is not enough balance",
      });
      setError({ ...error, amount: "There is not enough balance" });
    }

    if (props.user.balance > -1) {
      axios
        .get("https://b24win.herokuapp.com/option/number")
        .then((res) => res)
        .then((data) => {
          setNumber(data.data.data);
        });
    }
  }, [props.user.balance]);
  const handelChange = (e) => {
    const name = e.target.name,
      value = e.target.value.trim();
    switch (name) {
      case "amount":
        let number;
        if (Number(value)) number = typeof Number(value);
        if (number === "number" || value === "") {
          if (props.transaction === "deposit") {
            setTransactionInput({ ...TransactionInput, [name]: value });
            setError({ ...error, [name]: "" });
          } else {
            if (props.user.balance >= Number(value)) {
              setTransactionInput({ ...TransactionInput, [name]: value });
              setError({ ...error, [name]: "" });
            } else {
              setTransactionInput({ ...TransactionInput, [name]: value });
              setError({ ...error, [name]: "There is not enough balance" });
            }
          }

          if (!(Number(value) >= 100)) {
            setTransactionInput({ ...TransactionInput, [name]: value });
            setError({
              ...error,
              [name]: "You can withdraw at least 100 Taka",
            });
          }
        }
        break;
      case "number":
        if (validateNumber(value)) {
          setTransactionInput({ ...TransactionInput, [name]: value });
          setError({ ...error, [name]: "" });
        } else {
          setTransactionInput({ ...TransactionInput, [name]: value });
          setError({ ...error, [name]: `You ${name} is wrong` });
        }
        break;
      case "trxId":
        if (value.length >= 8) {
          setTransactionInput({ ...TransactionInput, [name]: value });
          setError({ ...error, [name]: "" });
        } else {
          setTransactionInput({ ...TransactionInput, [name]: value });
          setError({ ...error, [name]: `You ${name} ID is wrong` });
        }
        break;
      case "method":
        if (value) {
          setTransactionInput({ ...TransactionInput, [name]: value });
          setError({ ...error, [name]: "" });
        } else {
          setTransactionInput({ ...TransactionInput, [name]: value });
          setError({ ...error, [name]: `Please select method` });
        }
        break;
      default:
        break;
    }
  };
  const checkValid = (obb, type) => {
    for (const key in obb) {
      const value = obb[key];
      if (type === "TransactionInput") {
        if (props.transaction === "withdraw" && key === "trxId") {
        } else {
          if (!value) {
            return false;
          }
        }
      } else {
        if (value) return false;
      }
    }
    return true;
  };
  const handleSubmit = () => {
    if (checkValid(TransactionInput, "TransactionInput")) {
      if (checkValid(error)) {
        props.TransactionInputRequestAction(TransactionInput, props.user);
        setTransactionInput({
          amount: defaultValue,
          trxId: "",
          method: "",
          number: "",
        });
        setOpen({ display: "none" });
        history.push('/statement/transaction?page=0')
      }
    }
  };
 
  return (
    <div className="container">
      {props.transaction === "deposit" ? (
        <>
          <ul style={{ listStyle: "none" }}>
            {number.map((n) => (
              <li>
                {n.method} {n.type} {n.number}
              </li>
            ))}
          </ul>
          <br />
          <p>Deposit 300 to 20000</p>
          <br />
        </>
      ) : (
        <p>withdraw 500 to 15000</p>
      )}

      <input
        onChange={handelChange}
        placeholder="Please Enter you amount"
        type="number"
        name="amount"
        value={TransactionInput.amount}
      />
      {error.amount && <p className="error">{error.amount}</p>}
      <input
        onChange={handelChange}
        placeholder="Please Enter you Number"
        name="number"
        value={TransactionInput.number}
        type="text"
      />
      {error.number && <p className="error">{error.number}</p>}
      {props.transaction === "deposit" && (
        <>
          <input
            onChange={handelChange}
            placeholder="Please Enter you TrxID"
            type="text"
            value={TransactionInput.trxId}
            name="trxId"
          />
          {error.trxId && <p className="error">{error.trxId}</p>}
        </>
      )}

      <select onChange={handelChange} name="method" id="club">
        <option value="">Select Method*</option>
        {methods.map((club) => (
          <option key={club} value={club.toLowerCase()}>
            {club}
          </option>
        ))}
      </select>
      {props.transaction === "withdraw" && (
        <select onChange={handelChange} name="type" id="club">
          <option value="personal">Personal</option>
          <option value="agent">Agent</option>
        </select>
      )}

      {error.method && <p className="error">{error.method}</p>}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};
const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps, { TransactionInputRequestAction })(
  TransactionInput
);

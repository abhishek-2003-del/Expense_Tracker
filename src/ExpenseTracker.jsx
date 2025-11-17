import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { addTransaction,deleteTransaction,updateTransaction,getTransactions } from "./Services/allApi";

const ExpenseTracker = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");

  const [list, setList] = useState([]);

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    let res = await getTransactions();
    if (res.status === 200) {
      setList(res.data);
    } else {
      alert("Error fetching data");
    }
  };

  const onAdd = async () => {
    let body = {
      title,
      amount: Number(amount),
      type,
    };

    let res = await addTransaction(body);

    if (res.status === 201) {
      alert("Added Successfully");
      setTitle("");
      setAmount("");
      setType("income");
      fetchTransactions();
    } else {
      alert("Something went wrong");
    }
  };

  const onEditClick = (item) => {
    setEditId(item.id);
    setTitle(item.title);
    setAmount(item.amount);
    setType(item.type);
  };

  const onUpdate = async () => {
    let body = {
      title,
      amount: Number(amount),
      type,
    };

    let res = await updateTransaction(editId, body);

    if (res.status === 200) {
      alert("Updated Successfully");
      setEditId(null);
      setTitle("");
      setAmount("");
      setType("income");
      fetchTransactions();
    } else {
      alert("Something went wrong");
    }
  };

  const onDelete = async (id) => {
    let res = await deleteTransaction(id);
    if (res.status === 200) {
      alert("Deleted Successfully");
      fetchTransactions();
    } else {
      alert("Something went wrong");
    }
  };

  const totalIncome = list
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpense = list
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <div>
      <h1 className="text-center mt-3" style={{ color: "white" }}>
        Expense Tracker
      </h1>

      <div className="container mt-4">
        <div className="d-flex gap-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Title"
            className="form-control"
          />

          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            placeholder="Enter Amount"
            className="form-control"
          />

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="form-select"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          {editId ? (
            <button className="btn btn-warning" onClick={onUpdate}>
              Update
            </button>
          ) : (
            <button className="btn btn-success" onClick={onAdd}>
              Add
            </button>
          )}
        </div>
      </div>


      <div className="container mt-4 text-center">
        <h4 style={{ color: "lightgreen" }}>Total Income: {totalIncome}</h4>
        <h4 style={{ color: "red" }}>Total Expense: {totalExpense}</h4>
        <h3 style={{ color: "yellow" }}>Balance: {balance}</h3>
      </div>

      <Table striped bordered hover className="container mt-4">
        <thead>
          <tr>
            <th>Index</th>
            <th>Title</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {list.length > 0 ? (
            list.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>{item.amount}</td>
                <td
                  style={{
                    color: item.type === "income" ? "lightgreen" : "red",
                    fontWeight: "bold",
                  }}
                >
                  {item.type}
                </td>

                <td>
                  <button
                    onClick={() => onEditClick(item)}
                    className="btn btn-warning me-2"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(item.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <h4 className="text-center">No Transactions</h4>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default ExpenseTracker;

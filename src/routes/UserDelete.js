import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line
import styles from "../styles/UserDelete.module.css";

const UserDelete = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleDelete = async () => {
    try {
      await axios.delete(`http://35.176.189.56/api/users/${email}`, {
        auth: {
          username: "api",
          password: "api",
        },
      });
      setSuccessMessage("User deleted successfully.");
      setErrorMessage("");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      setErrorMessage("Failed to delete user.");
      setSuccessMessage("");
      console.error("Failed to delete user:", error);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "90vh" }}>
      <h1>Delete User</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={() => navigate("/")}>Go back</button>
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </div>
  );
};

export default UserDelete;

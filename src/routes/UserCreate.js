import React, { useState } from "react";
import axios from "axios";
import styles from "../styles/UserCreate.module.css";
import BackButton from "../components/BackButton";

const CreateUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    birthdate: "",
    bio: "",
    city: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    const intValue = name === "phone_number" ? parseInt(value, 10) : value;
    setFormData({ ...formData, [name]: intValue });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://35.176.189.56/api/users",
        formData,
        {
          auth: {
            username: "api",
            password: "api",
          },
        }
      );
      console.log("User created successfully:", response.data);
      setMessage("User created successfully!");
      setFormData({
        name: "",
        email: "",
        phone_number: "",
        birthdate: "",
        bio: "",
        city: "",
      });
    } catch (error) {
      console.error("Failed to create user:", error);
      let errorMessage;
      switch (error.response.status) {
        case 400:
          errorMessage = "Bad request. Please check your input values.";
          break;
        case 401:
          errorMessage = "Unauthorized. Please provide valid credentials.";
          break;
        case 403:
          errorMessage = "Forbidden. You are not allowed to perform this action.";
          break;
        case 404:
          errorMessage = "User not found. Please check the user email.";
          break;
        case 409:
          errorMessage = "Conflict. User with that email already exists.";
          break;
        case 500:
          errorMessage = "Internal server error. Please try again later.";
          break;
        default:
          errorMessage = "Something went wrong. Please try again later.";
          break;
      }
      setMessage(errorMessage);
    }
  };

  return (
    <div className={styles.container}>
    <BackButton />
      <h1 className={styles.title}>Create User</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Phone Number:
          <input
            type="number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
          />
        </label>
        <label>
          Birthdate:
          <input
            type="date"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleChange}
          />
        </label>
        <label>
          Bio:
          <textarea name="bio" value={formData.bio} onChange={handleChange} />
        </label>
        <label>
          City:
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Create User</button>
      </form>
      
      {message && (
        <div className={styles.message}>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default CreateUser;

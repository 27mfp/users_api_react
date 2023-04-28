import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import styles from "../styles/UserUpdate.module.css";

const UserUpdate = () => {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const [newEmail, setNewEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [bio, setBio] = useState("");
  const [city, setCity] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://35.176.189.56/api/users/${email}`,
        {
          auth: {
            username: "api",
            password: "api",
          },
        }
      );
      setUser(response.data.data);
    } catch (error) {
      console.error(`Failed to fetch user with email ${email}:`, error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://35.176.189.56/api/users/${user.email}`,
        {
          email: newEmail,
          name,
          phone_number: parseInt(phoneNumber),
          birthdate,
          bio,
          city,
        },
        {
          auth: {
            username: "api",
            password: "api",
          },
        }
      );
      setUpdateSuccess(true);
      setTimeout(() => {
        navigate(`/users`);
      }, 2000);
    } catch (error) {
      console.error(`Failed to update user with email ${user.email}:`, error);
    }
  };

  return (
    <div className={styles.container}>
      <BackButton />
      <h1>Update User</h1>
      <form onSubmit={handleEmailSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Fetch User</button>
      </form>
      {user && (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="New Email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <input
            type="date"
            placeholder="Birthdate"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
          />
          <input
            type="text"
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit">Update</button>
        </form>
      )}
      {updateSuccess && <div>User updated successfully!</div>}
    </div>
  );
};

export default UserUpdate;

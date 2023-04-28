import React, { useState, useEffect } from "react";
import axios from "axios";
import UserDetail from "./UserDetail";
import "../styles/UserList.css";
import BackButton from "../components/BackButton";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // Add state for selected user

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://35.176.189.56/api/users", {
          auth: {
            username: "api",
            password: "api",
          },
        });
        setUsers(response.data.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleUserClick = (user) => {
    if (user && user.email) {
      setSelectedUser(user);
    } else {
      console.error("User object is undefined or missing email property");
    }
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  return (
    <div className="user-list-container">
       <BackButton />
      <h1 className="user-list-title">User List</h1>
      <ul className="user-list">
        {users.map((user) => (
          <li
            key={user.id}
            className="user-list-item"
            onClick={() => handleUserClick(user)}
          >
            <div className="user-list-item-name">{user.name}</div>
            <div className="user-list-item-email">{user.email}</div>
            <div className="user-list-item-address">
              {user.address && (
                <div>
                  {user.address.street}, {user.address.city},{" "}
                  {user.address.zipcode}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
      {selectedUser && (
        <div className="user-list-modal">
          <div className="user-list-modal-content">
            <UserDetail user={selectedUser} />
            <button
              className="user-list-modal-close"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;

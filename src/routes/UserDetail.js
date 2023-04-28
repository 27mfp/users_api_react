import React from "react";

const UserDetail = ({ user }) => {
  return (
    <div>
      <h1>User Details</h1>
      <p>ID: {user.id}</p>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Phone Number: {user.phone_number}</p>
      <p>Birthdate: {user.birthdate}</p>
      <p>Bio: {user.bio}</p>
      <p>City: {user.city}</p>
      <p>Created At: {user.created_at}</p>
      <p>Updated At: {user.updated_at}</p>
    </div>
  );
};

export default UserDetail;

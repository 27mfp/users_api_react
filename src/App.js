import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import UserList from "./routes/UserList";
import UserCreate from "./routes/UserCreate";
import UserEdit from "./routes/UserEdit";
import UserDelete from "./routes/UserDelete";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/create" element={<UserCreate />} />
        <Route path="/update" element={<UserEdit />} />
        <Route path="/delete" element={<UserDelete />} />
      </Routes>
    </Router>
  );
};

export default App;
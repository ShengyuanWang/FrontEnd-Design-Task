import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateUserPage.css";

const CreateUserPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCreateUser = (event) => {
    event.preventDefault();

    const userData = {
      username,
      password,
      email,
      name,
    };

    fetch("http://127.0.0.1:5000/api/create-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          navigate("/login");
        } else {
          setError("Failed to create user");
        }
      })
      .catch(() => {
        setError("Failed to create user");
      });
  };

  return (
    <div className="create-user-page">
      <h1 className="title">Create User</h1>
      <form onSubmit={handleCreateUser}>
        <div className="input-group">
          <div className="input-icon">
            <i className="fa fa-id-card"></i>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="input-group">
          <div className="input-icon">
            <i className="fa fa-user"></i>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="input-group">
          <div className="input-icon">
            <i className="fa fa-lock"></i>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="input-group">
          <div className="input-icon">
            <i className="fa fa-envelope"></i>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit" className="create-button">
          Create User
        </button>
      </form>
    </div>
  );
};

export default CreateUserPage;

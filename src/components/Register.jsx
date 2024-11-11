import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://healtether-backend-v66t.onrender.com/api/register",
        {
          name,
          email,
          password,
        }
      );
      alert(res.data.message);
      if (res.data.success) {
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message || "An error occurred");
      } else if (error.request) {
        alert("No response from the server");
      } else {
        alert(error.message || "An unexpected error occurred");
      }
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div>
        <h1>Welcome to my Web App!</h1>
      </div>
      <div>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "1px black solid",
            borderRadius: "10px",
            padding: "20px",
          }}
          onSubmit={handleSubmit}
        >
          <div>
            <label style={{ minWidth: "100px" }}>User Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label style={{ minWidth: "100px" }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label style={{ minWidth: "100px" }}>Password</label>
            <input
              type="password"
              autoComplete="true"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            className="bg-primary"
            style={{
              color: "white",
              borderRadius: "10px",
              border: "white",
              width: "100px",
              height: "30px",
              marginTop: "5px",
              marginBottom: "5px",
            }}
          >
            Register
          </button>
          <Link
            to="/"
            style={{ fontSize: "12px", textDecoration: "underline" }}
          >
            Existing User?Login Now!
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;

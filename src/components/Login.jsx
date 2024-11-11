import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../slices/authSlice.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/login", {
        email,
        password,
      });
  
      dispatch(loginSuccess({ token: res.data.token }));
      alert(res.data.message);
      if(res.data.success){
      navigate("/home");
      }
    } catch (error) {
      if (error.response) {
        // Error response from the server
        alert(error.response.data.message || "An error occurred");
      } else if (error.request) {
        // No response from the server
        alert("No response from the server");
      } else {
        // Some other error
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
      <h1>Please Login!</h1>
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
        <div>
          <button
            className="bg-primary"
            style={{
              color: "white",
              borderRadius: "10px",
              border: "white",
              width: "100px",
              height: "30px",
              marginRight: "5px",
            }}
          >
            Login
          </button>
          <Link
            to="/forgot-password"
            style={{ fontSize: "12px", textDecoration: "underline" }}
          >
            Forgot Password?
          </Link>{" "}
          |{" "}
          <Link
            to="/register"
            style={{ fontSize: "12px", textDecoration: "underline" }}
          >
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;

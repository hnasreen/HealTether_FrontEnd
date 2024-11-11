import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { loginSuccess } from "../slices/authSlice.js";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://healtether-backend-v66t.onrender.com/api/forgot-password",
        { email },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data.success === true) {
        dispatch(loginSuccess({ token: res.data.token }));
        navigate("/reset-password");
      } else {
        alert(res.data.message);
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
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "150px",
      }}
    >
      <div style={{ marginBottom: "10px" }}>
        <h2>Forgot Password</h2>
      </div>
      <div>
        {" "}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            style={{ fontSize: "20px" }}
          />
          <button
            type="submit"
            className="btn btn-outline-success"
            style={{ marginLeft: "5px", marginBottom: "6px" }}
          >
            Reset Password
          </button>
        </form>
      </div>
      <Link
        to="/"
        style={{
          fontSize: "15px",
          textDecoration: "underline",
          marginLeft: "10px",
          marginTop: "20px",
        }}
      >
        Login
      </Link>
    </div>
  );
};

export default ForgotPassword;

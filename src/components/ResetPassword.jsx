import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { clearAuth } from "../slices/authSlice.js";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/reset-password",
        { password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(res.data.message);
      if (res.data.success === true) {
        dispatch(clearAuth());
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
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "150px",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New Password"
          //   autoComplete="true"
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
  );
};

export default ResetPassword;

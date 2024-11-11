import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAuth, setUser } from "../slices/authSlice.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const res = await axios.get(
          "https://healtether-backend-v66t.onrender.com/api/getuser",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        dispatch(setUser(res.data.username));
      } catch (error) {
        console.error("Error fetching user details", error);
      }
    };

    if (token) {
      fetchUserName();
    }
  }, [token, dispatch]);

  const handleLogout = () => {
    dispatch(clearAuth());
    alert("Logged out successfully");
    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "150px",
      }}
    >
      <div>
        <h1>
          Hi, <span className="text-danger">{user ? user : "Guest"}</span>!
          Welcome to my web page!!!
        </h1>{" "}
      </div>

      <div>
        <button
          onClick={handleLogout}
          className="btn btn-outline-danger"
          style={{ marginTop: "20px" }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { clearAuth,setUser } from '../slices/authSlice.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.auth);  // Get the token and user from Redux state

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/getuser', {
          headers: {
            Authorization: `Bearer ${token}`,  // Send the token as a Bearer token
          },
        });
        // Dispatch the action to set the user in Redux state
        dispatch(setUser(res.data.username));  
      } catch (error) {
        console.error("Error fetching user details", error);
      }
    };

    if (token) {
      fetchUserName();  // Only fetch if the token is available
    }
  }, [token, dispatch]);  // Add dispatch as a dependency

  const handleLogout = () => {
    dispatch(clearAuth());
    alert('Logged out successfully');
    navigate('/');
  };

  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',marginTop:'150px'}}>
      <div><h1>Hi, <span className='text-danger'>{user ? user : 'Guest'}</span>! Welcome to my web page!!!</h1>  </div>
     
     <div><button onClick={handleLogout} className="btn btn-outline-danger" style={{marginTop:'20px'}}>Logout</button></div> 
    </div>
  );
};

export default Home;

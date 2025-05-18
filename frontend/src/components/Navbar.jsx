import React, { useContext } from 'react'
import { AppContext } from '../AppProvider';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Navbar component displays navigation links and user info.
const Navbar = () => {
  // Uses AppContext for authentication state.
  // Uses react-router for navigation.
  const { loggedIn, setLoggedIn, user } = useContext(AppContext);
  const navigate = useNavigate();

  const authenticate = () => {
    console.log("Authenticating...");
    navigate('/authenticate');
  }

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:5000/api/logout', {
        withCredentials: true,
      });

      setLoggedIn(false);
      alert("Logged out successfully");

      // Redirect to the authenticate page
      navigate('/authenticate');
    }
    catch (error) {
      console.error("Error logging out:", error.message);
    }
  }

  return (
    <div>
      <nav className='navbar'>
        <h1>
          Blogger
        </h1>

        <span className='user-info'>
          {loggedIn && <p className='user-name'>Welcome, {user.name}!</p>}
        </span>

        <ul className='nav-links'>
          <li><Link to="/">Home</Link></li>
          {/* <li><a href="/posts">My Posts</a></li> */}

          {/* Shows "Login / Signup" if user is not logged in. */}
          {!loggedIn && <li><button className='nav-buttons' onClick={() => authenticate()}>Login / Signup</button></li>}

          {/* Shows "Logout" and welcome message if user is logged in. */}
          {loggedIn && <li><button className='nav-buttons' onClick={() => handleLogout()}>Logout</button></li>}
        </ul>
      </nav>
    </div>
  )
}

export default Navbar

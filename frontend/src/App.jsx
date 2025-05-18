import { useContext, useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { AppContext } from './AppProvider';
import { ToastContainer } from 'react-toastify'

import Editor from './components/Editor'
import Viewer from './components/Viewer'
import Navbar from './components/Navbar'
import Authenticate from './components/Authenticate'
import axios from 'axios'

import './App.css'
import 'react-toastify/dist/ReactToastify.css';

// url for the backend server
const backendURL = import.meta.env.VITE_BACKEND_URL;

// Main application router component to handle different routes
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<><Editor /><Viewer /></>} />
      <Route path="/authenticate" element={<Authenticate />} />
    </Routes>
  )
}

function App() {
  const { setLoggedIn, setUser } = useContext(AppContext);
  const navigate = useNavigate();

  // Check if the user is logged in and fetch the user profile
  // if logged in, set the user and loggedIn state
  // if not logged in, redirect to the authenticate page
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${backendURL}/api/user/profile`, {
          withCredentials: true,
        });

        if (response.data) {
          // User is logged in
          setUser(response.data)
          setLoggedIn(true)
        }
      }
      catch (error) {
        // User is not logged in
        setUser(undefined)
        setLoggedIn(false)

        // Redirect to the authenticate page
        navigate('/authenticate');
        alert('Please Login first!');
      }
    }

    fetchUser()
  }, [])

  return (
    <div>
      <Navbar />
      <main>
        <AppRouter />
      </main>
      <ToastContainer />
    </div>
  )
}

export default App

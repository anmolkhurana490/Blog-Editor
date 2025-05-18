import React, { useContext } from 'react'
import { useForm } from "react-hook-form";
import axios from 'axios';
import { AppContext } from '../AppProvider';
import { useNavigate } from 'react-router-dom';

// Authenticate component renders both Login and Signup cards.
// Users can either log in or create a new account.
// both cards use 'react-hook-form' for form handling and validation.
const Authenticate = () => {
    return (
        <div className='authenticate'>
            <LoginCard />
            <SignupCard />
        </div>
    );
}


const LoginCard = () => {
    // Uses context to update authentication state on login.
    const { setLoggedIn, setUser } = useContext(AppContext);
    const navigate = useNavigate();

    const {
        register: registerLogin,
        handleSubmit: handleLoginSubmit,
        formState: { errors: loginErrors },
    } = useForm();

    // handle login
    const onLogin = async (data) => {
        try {
            const response = await axios.post('http://localhost:5000/api/login', data, { withCredentials: true });
            console.log("Login Response:", response.data);
            alert("Login successful!");

            // handle successful login
            setLoggedIn(true);
            setUser(response.data.user);

            navigate('/');
        }
        catch (error) {
            console.error("Login Error:", error);
            alert("Login failed!", error.message);
            // handle login error
        }
    };

    return (
        <div className='auth-card'>
            <h2>Login</h2>
            <form onSubmit={handleLoginSubmit(onLogin)}>
                {/* Input fields for email and password, with error messages */}
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        {...registerLogin("email", { required: "Email is required" })}
                    />
                    {loginErrors.email && <p style={{ color: "red" }}>{loginErrors.email.message}</p>}
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        {...registerLogin("password", { required: "Password is required" })}
                    />
                    {loginErrors.password && <p style={{ color: "red" }}>{loginErrors.password.message}</p>}
                </div>
                <button type="submit" style={{ marginTop: "1rem" }}>Login</button>
            </form>
        </div>
    )
}

const SignupCard = () => {
    const {
        register: registerSignup,
        handleSubmit: handleSignupSubmit,
        formState: { errors: signupErrors },
    } = useForm();

    // handle signup
    const onSignup = async (data) => {
        // handle signup
        try {
            const response = await axios.post('http://localhost:5000/api/register', data, { withCredentials: true });
            console.log("Signup Response:", response.data);
            alert("Signup successful! Now you can login.");
            // handle successful signup
        }
        catch (error) {
            console.error("Signup Error:", error);
            alert("Signup failed!", error.message);
            // handle signup error
        }
    };

    return (
        <div className='auth-card'>
            <h2>Sign Up</h2>
            <form onSubmit={handleSignupSubmit(onSignup)}>
                {/* Input fields for name, email, and password, with error messages */}
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        {...registerSignup("name", { required: "Name is required" })}
                    />
                    {signupErrors.name && <p style={{ color: "red" }}>{signupErrors.name.message}</p>}
                </div>

                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        {...registerSignup("email", { required: "Email is required" })}
                    />
                    {signupErrors.email && <p style={{ color: "red" }}>{signupErrors.email.message}</p>}
                </div>

                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        {...registerSignup("password", { required: "Password is required" })}
                    />
                    {signupErrors.password && <p style={{ color: "red" }}>{signupErrors.password.message}</p>}
                </div>
                <button type="submit" style={{ marginTop: "1rem" }}>Sign Up</button>
            </form>
        </div>
    )
}

export default Authenticate;
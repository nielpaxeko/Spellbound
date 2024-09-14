import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/auth.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png"

function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        country_of_origin: "",
        password: "",
        confirmPassword: "",
    });

    const toggleForm = () => {
        setIsLogin(!isLogin);
        // Reset form data when toggling
        setFormData({
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            country_of_origin: "",
            password: "",
            confirmPassword: "",
        });
    };

    // Handle form input change
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle Sign Up form submission
    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/auth/signup", {
                firstName: formData.firstName,
                lastName: formData.lastName,
                username: formData.username,
                email: formData.email,
                password: formData.password,
                country_of_origin: formData.country_of_origin,
                confirmPassword: formData.confirmPassword,
            });
            alert("Sign up successful!");
            navigate('/home');
        } catch (error) {
            console.error("Sign up failed:", error);
            alert(`Sign up failed: ${error.response?.data?.message || error.message}`);
        }
    };

    // Handle Sign In form submission
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/auth/login", {
                username: formData.email,
                password: formData.password,
            }, { withCredentials: true });
            console.log("Login response:", response);
            if (response.data.message === "Login successful") {
                alert("Login successful!");
                navigate('/home');
            } else {
                alert("Login failed!");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert(`Login failed: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <div className="auth-wrapper">
            <div className={`auth-container container-lg  ${!isLogin ? 'active' : ''}`}>
                {/* Sign Up Form */}
                <div className={`sign-up ${isLogin ? 'hidden' : ''}`}>
                    <form onSubmit={handleSignup}>
                        <h1 style={{ color: "#921A40" }}>Create Account</h1>
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                        />
                        <button className="btn w-100" type="submit">Sign Up</button>
                        <p>Already have an account?</p>
                        <button type="button" onClick={toggleForm} className="btn hidden" id="login-button">Login</button>
                    </form>
                </div>

                {/* Sign In Form */}
                <div className={`sign-in ${isLogin ? '' : 'hidden'}`}>
                    <form onSubmit={handleLogin}>
                        <h1 style={{ color: "#921A40" }}>Sign In</h1>
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                        <button className="btn w-100" type="submit">Sign In</button>
                        <p>Don&apos;t have an account?</p>
                        <button type="button" onClick={toggleForm} className="btn hidden" id="signup-button">Create Account</button>
                    </form>
                </div>

                {/* Toggle Panels */}
                <div className="toggle-container">
                    <div className="toggle">
                        {/* Toggle Sign In */}
                        <div className="toggle-panel toggle-left">

                            <img src={logo} className="logo"></img>
                            <h1 className="welcome-msg title text-light">Welcome to Rover!</h1>
                        </div>
                        {/* Toggle Sign Up */}
                        <div className="toggle-panel toggle-right">

                            <img src={logo} className="logo"></img>
                            <h1 className="welcome-msg title text-light">Welcome back to Rover!</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthPage;

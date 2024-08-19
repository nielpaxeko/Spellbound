import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/auth.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/spellbound-logo.png"

function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
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
                username: formData.email, // Update this line
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
        <div className="page-wrapper">
            <div className={`auth-container container-lg primary ${!isLogin ? 'active' : ''}`}>
                {/* Sign Up Form */}
                <div className={`sign-up ${isLogin ? 'hidden' : ''}`}>
                    <form onSubmit={handleSignup}>
                        <h1>Create Account</h1>
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
                        <button className="btn" type="submit">Sign Up</button>
                    </form>
                </div>

                {/* Sign In Form */}
                <div className={`sign-in ${isLogin ? '' : 'hidden'}`}>
                    <form onSubmit={handleLogin}>
                        <h1>Sign In</h1>
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
                        <button className="btn" type="submit">Sign In</button>
                    </form>
                </div>

                {/* Toggle Panels */}
                <div className="toggle-container">
                    <div className="toggle">
                        {/* Toggle Sign In */}
                        <div className="toggle-panel toggle-left">
                            <h1>Welcome to SpellBound</h1>
                            <img src={logo} height="200px">

                            </img>
                            <p>Already have an account?</p>
                            <button onClick={toggleForm} className="btn hidden" id="login-button">Sign In</button>
                        </div>

                        {/* Toggle Sign Up */}
                        <div className="toggle-panel toggle-right">
                            <h1>Welcome back to SpellBound!</h1>
                            <p>Don&apos;t have an account?</p>
                            <button onClick={toggleForm} className="btn hidden" id="signup-button">Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthPage;
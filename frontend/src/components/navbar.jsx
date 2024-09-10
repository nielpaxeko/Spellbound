import React, { useState, useEffect } from 'react';
import logo from "../assets/rover.png";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container } from 'react-bootstrap';
import axios from 'axios';

function NavigationBar() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch authentication status
        fetch('/api/auth/status', { credentials: 'include' })
            .then(response => response.json())
            .then(data => {
                setIsAuthenticated(data.isAuthenticated);
                if (data.isAuthenticated) {
                    // If authenticated, fetch the current user's username
                    axios.get('/api/auth/currentUser', { withCredentials: true })
                        .then(response => setUser(response.data.username))
                        .catch(error => console.error('Error fetching current user:', error));
                }
            })
            .catch(error => console.error('Error fetching auth status:', error));
    }, []);

    // Deathenticate user and send to auth screen
    const handleLogout = () => {
        fetch('/api/auth/logout', {
            method: 'POST',
            credentials: 'include'
        })
            .then(response => {
                if (response.ok) {
                    setIsAuthenticated(false);
                    window.location.href = '/auth';
                }
            })
            .catch(error => console.error('Error logging out:', error));
    };

    return (
        <Navbar className="p-2 navbar-dark" collapseOnSelect expand="md">
            <Container fluid className="container-xxl">
                <Navbar.Brand href={isAuthenticated ? "/home" : "/landing"} className="navbar-brand">
                    <img src={logo} alt="brand" width="40" height="40" />
                    <span className="fw-bold text-light">Rover</span>
                </Navbar.Brand>
                <Navbar.Toggle className="navbar-toggler" aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
                    <Nav className="navbar-nav">
                        <Nav.Link className="nav-link text-light" href={isAuthenticated ? "/home" : "/landing"}>
                            <i className="nav-icon bi bi-house"></i> Home  {/* Home */}
                        </Nav.Link>
                        {/* Display different Navbar based on wether the user is authenticated or not  */}
                        {isAuthenticated ? (
                            <>
                                <Nav.Link className="nav-link text-light" href="/messages">
                                    <i className="nav-icon bi bi-chat"></i> Messages
                                </Nav.Link>
                                {user && (
                                    <Nav.Link className="nav-link text-light" href={`/profile/${user}`}>
                                        <i className="nav-icon bi bi-person-circle"></i> Profile
                                    </Nav.Link>
                                )}
                                <Nav.Link className="nav-link text-light d-md-none" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                                    Log out
                                </Nav.Link>
                            </>
                        ) : (
                            <Nav.Link className="nav-link text-light d-md-none" href="/auth">
                                Login
                            </Nav.Link>
                        )}
                    </Nav>
                    {isAuthenticated ? (
                        <Nav className="ms-2 d-none d-md-inline">
                            <Nav.Link className="btn btn-pink nav-link rounded-pill" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                                Log out
                            </Nav.Link>
                        </Nav>
                    ) : (
                        <Nav className="ms-2 d-none d-md-inline">
                            <Nav.Link className="btn btn-pink nav-link rounded-pill" href="/auth" style={{ cursor: 'pointer' }}>
                                Login
                            </Nav.Link>
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;

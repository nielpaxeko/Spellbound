import logo from "../assets/logo.png";
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';

function NavigationBar() {
    return (
        <Navbar className="p-2 navbar-dark" collapseOnSelect expand="md">
            <Container fluid className="container-xxl">
                <Navbar.Brand href="/home" className="navbar-brand">
                    <img src={logo} alt="brand" width="40" height="40" />
                    <span className="fw-bold text-light">Spellbound</span>
                </Navbar.Brand>
                <Navbar.Toggle className="navbar-toggler" aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
                    <Nav className="navbar-nav">
                        <Nav.Link className="nav-link text-light" href="/home">Home</Nav.Link>
                        <Nav.Link className="nav-link text-light" href="#">Messages</Nav.Link>
                        <Nav.Link className="nav-link text-light" href="#">Profile</Nav.Link>
                        <Nav.Link className="nav-link text-light d-md-none" href="#">Log out</Nav.Link>
                    </Nav>
                    <Nav className="ms-2 d-none d-md-inline">
                        <Nav.Link className="btn btn-light nav-link rounded-pill" href="#">Log out</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;
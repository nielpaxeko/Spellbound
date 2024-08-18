import logo from "../assets/spellbound-logo.png"
import 'bootstrap/dist/css/bootstrap.css';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-md p-2 align-items-center navbar-light">
            <div className="container-xxl">
                {/* Should also redirect to either landing page or home depending on if user is logged in or not */}
                <a className="navbar-brand" href="/home">
                    <img src={logo} className="rounded-pill" alt="brand" width="40" height="40" />
                    <span className="fw-bold text-light">Spellbound</span>
                </a>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-nav"
                    aria-controls="main-nav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>


                <div className="collapse navbar-collapse justify-content-end align-center" id="main-nav">
                    <ul className="navbar-nav">
                        {/* The home link should redirect to the landing page if the user is not logged in and to the main page if they are */}
                        <li className="nav-item">
                            <a className="nav-link text-light" href="/home">Home</a>
                        </li>
                        {/* Shouold only appear if the user is logged in */}
                        <li className="nav-item">
                            <a className="nav-link text-light" href="#">Messages</a>
                        </li>
                        {/* Shouold only appear if the user is logged in */}
                        <li className="nav-item">
                            <a className="nav-link text-light" href="#">Profile</a>
                        </li>
                        {/* Should only appear if the screen is large enough and if the user is logged in */}
                        <li className="nav-item ms-2 d-none d-md-inline">
                            <a className="btn btn-light rounded-pill" href="#">Log out</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
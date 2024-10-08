import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../assets/logo.svg";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Navbar.css"; // Import the custom CSS

const Navbar = () => {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link to="/">
          <img src={logo} alt="My Icon" width="30" height="30"/>
        </Link>
        <Link className="navbar-brand mx-1" to="/">
          TeerexStore
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
          <span className="navbar-text">
            <ul className="navbar-nav  mb-2 mb-lg-0 ml-auto">
              <li className="nav-item ml-auto">
                <Link className="nav-link active " aria-current="page" to="/">
                  Home
                </Link>
              </li>
                <li className="nav-item">
                  <Link
                    className="nav-link position-relative cart-icon"
                    to="/cart"
                  >
                    <i className="bi bi-cart"></i>
                    <span className="badge rounded-pill bg-danger cart-badge">
                      {totalQuantity}
                    </span>
                  </Link>
                </li>
            </ul>
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

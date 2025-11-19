import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useLocation, useNavigate } from "react-router-dom";

function MyNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <nav className="navbar navbar-expand-lg sticky-top ">
      <div className="container-fluid">
        <div>
          <Button
            className="bg-azzurroPolvere rounded-start-5"
            onClick={() => {
              navigate(-1);
            }}
          >
            <i className="bi bi-caret-left"></i>
          </Button>
          <Button
            className="bg-azzurroPolvere rounded-end-5"
            onClick={() => {
              navigate(+1);
            }}
          >
            <i className="bi bi-caret-right"></i>
          </Button>
        </div>
        <button
          className="navbar-toggler text-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100 justify-content-around">
            <li className="nav-item ">
              <Link
                className={
                  "nav-link " + (location.pathname === "/" && " active")
                }
                aria-current="page"
                to={"/"}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={
                  "nav-link " +
                  (location.pathname.startsWith("/immobili") && " active")
                }
                to={"/immobili"}
              >
                Immobili
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={
                  "nav-link " +
                  (location.pathname.startsWith("/clienti") && " active")
                }
                to={"/clienti"}
              >
                Clienti
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={
                  "nav-link " +
                  (location.pathname.startsWith("/visite") && " active")
                }
                to={"/visite"}
              >
                Visite
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default MyNavbar;

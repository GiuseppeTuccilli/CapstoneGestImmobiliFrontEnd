import { Button, Form, Navbar, Container, Card } from "react-bootstrap";
import apple from "../../assets/logos/apple-white.svg";
import Accordion from "react-bootstrap/Accordion";

const MyNavbar = () => {
  return (
    <>
      <div
        className="bg-grigio d-flex align-items-center justify-content-evenly"
        style={{ height: "4em" }}
      >
        <div id="player" className="d-flex  h-100 align-content-center">
          <Button>
            <i className="bi bi-shuffle"></i>
          </Button>
          <Button>
            <i className="bi bi-skip-backward-fill"></i>
          </Button>
          <Button className="fs-1">
            <i className="bi bi-play-fill d-flex"></i>
          </Button>
          <Button>
            <i className="bi bi-fast-forward-fill"></i>
          </Button>
          <Button>
            <i className="bi bi-repeat"></i>
          </Button>
        </div>
        <div id="centralLogo" className="d-flex align-items-center">
          <img src={apple} />
        </div>
        <div id="range" className="d-flex align-items-center">
          <Form.Range id="vol" style={{ width: "6em" }} />
        </div>
        <div className="d-flex align-items-center">
          <Button variant="danger">
            <i className="bi bi-person-fill" style={{ height: "2em" }}></i>
            Accedi
          </Button>
        </div>
      </div>
    </>
  );
};

export default MyNavbar;

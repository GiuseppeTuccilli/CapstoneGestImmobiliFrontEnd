import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import base from "../variabili";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

function HomePage() {
  const [token, setToken] = useState(
    localStorage.getItem("token").slice(1, -1)
  );

  const [userNome, setUserNome] = useState("");
  const [userCognome, setUserCognome] = useState("");
  const [userRuolo, setUserRuolo] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  const getMe = () => {
    fetch(base + "/utenti/me", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(res.status);
        }
      })
      .then((data) => {
        setUserNome(data.nome);
        setUserCognome(data.cognome);
        setUserRuolo(data.ruolo);
        setLoading(false);
      })
      .catch((er) => {
        console.log(er);
        setError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (token === null) {
      navigate("/login");
    }
    getMe();
  }, [token]);

  return (
    <Container>
      {error && (
        <Alert variant="danger" className="text-center">
          Errore nel recupero dati
        </Alert>
      )}
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Log-out</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Eseguire il log-out e tornare alla pagina di log-in?
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                handleClose();
              }}
            >
              Annulla
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
                handleClose();
              }}
            >
              Conferma
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      <Row className="mt-3 ">
        <Col className="border border-3 border-polvereScuro bg-azzurroPolvere p-3">
          <h3 className="mb-0">Utente:</h3>
          <p className="fs-5 pb-0 ">
            <span>{loading ? <Spinner animation="grow" /> : userNome} </span>
            <span>{loading ? <Spinner animation="grow" /> : userCognome}</span>
          </p>
          <div className="d-flex align-items-end">
            <h4 className="mb-0">Ruolo: </h4>
            <p className="m-0 ms-2 fs-5">
              <span> {loading ? <Spinner animation="grow" /> : userRuolo}</span>
            </p>
          </div>
          {userRuolo !== "" && (
            <Button className="my-1 bg-danger " onClick={handleShow}>
              Log-out
            </Button>
          )}
        </Col>
        <Col className="d-flex flex-column align-items-center justify-content-center border border-3 border-polvereScuro bg-azzurroPolvere p-3">
          <Button className="my-1 bg-success w-50 ">Nuovo cliente</Button>
          <Button className="my-1 bg-success w-50 ">Visite</Button>
          {userRuolo === "ADMIN" && (
            <Button
              className="my-1 bg-success w-50 "
              onClick={() => {
                navigate("/NuovoImmobile");
              }}
            >
              Nuovo Immobile
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;

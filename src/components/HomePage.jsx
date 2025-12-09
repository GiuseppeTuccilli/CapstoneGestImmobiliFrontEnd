import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import base from "../variabili";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import ElencoUtenti from "./ElencoUtenti";

function HomePage() {
  const [userNome, setUserNome] = useState("");
  const [userCognome, setUserCognome] = useState("");
  const [userRuolo, setUserRuolo] = useState("");
  const [userId, setUserId] = useState(0);
  const [showUtenti, setShowUtenti] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  let token = "";

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
        setUserId(data.id);
        setLoading(false);
      })
      .catch((er) => {
        console.log(er);
        setError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/login");
    } else {
      token = localStorage.getItem("token").slice(1, -1);
      getMe();
    }
  }, []);

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
        <Col
          xs={12}
          md={6}
          className="border border-3 border-bluGuado bg-polvereScuro p-3"
        >
          <div className="p-2 border border-1 border-bluGuado bg-sabbia">
            <h3 className="mb-0">Utente:</h3>
            <p className="fs-5 pb-0 ">
              <span>{loading ? <Spinner /> : userNome} </span>
              <span>{loading ? <Spinner /> : userCognome}</span>
            </p>
          </div>
          <div className="d-flex p-2 border border-1 border-bluGuado bg-sabbia ">
            <h4 className="mb-0">Ruolo: </h4>
            <p className="m-0 ms-2 fs-5">
              <span> {loading ? <Spinner /> : userRuolo}</span>
            </p>
          </div>
          <div className="text-end">
            {userRuolo !== "" && (
              <div className="d-flex justify-content-between">
                <Button variant="primary" className="my-1">
                  Cambia Password
                </Button>
                <Button variant="danger" className="my-1" onClick={handleShow}>
                  Log-out
                </Button>
              </div>
            )}
          </div>
        </Col>
        <Col
          xs={12}
          md={6}
          className="d-flex flex-column align-items-center justify-content-center border border-3 border-bluGuado bg-polvereScuro p-3"
        >
          <Row className="d-flex justify-content-center">
            <Col
              xs={12}
              className="d-flex flex-column justify-content-center p-2 border border-1 border-beige bg-bluGuado"
            >
              <Button
                variant="success"
                className="my-1  "
                onClick={() => {
                  navigate("/nuovoCliente");
                }}
              >
                + Cliente
              </Button>
              {userRuolo === "ADMIN" && (
                <Button
                  variant="success"
                  className="my-1 "
                  onClick={() => {
                    navigate("/NuovoUtente");
                  }}
                >
                  + Utente
                </Button>
              )}
              {userRuolo === "ADMIN" && (
                <Button
                  variant="success"
                  className="my-1  "
                  onClick={() => {
                    navigate("/NuovoImmobile");
                  }}
                >
                  + Immobile
                </Button>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="bg-bluGuado p-2 border border-1 border-sabbia">
        <div className="text-center">
          <Button
            variant="primary"
            onClick={() => {
              if (showUtenti) {
                setShowUtenti(false);
              } else {
                setShowUtenti(true);
              }
            }}
          >
            {" "}
            {showUtenti ? (
              <i className="bi bi-x-lg"></i>
            ) : (
              <i className="bi bi-arrow-90deg-down"></i>
            )}{" "}
            Utenti
          </Button>
        </div>
      </Row>

      <Row className={!showUtenti && "d-none"}>
        <ElencoUtenti base={base} ruolo={userRuolo} mioId={userId} />
      </Row>
    </Container>
  );
}

export default HomePage;

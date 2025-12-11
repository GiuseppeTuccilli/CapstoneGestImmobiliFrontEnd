import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import base from "../variabili";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import ElencoUtenti from "./ElencoUtenti";
import ModaleCambioPassword from "./ModaleCambioPassword";
import Offcanvas from "react-bootstrap/Offcanvas";
import ModaleModificaEmail from "./ModaleModificaEmail";
import ModaleModificaDati from "./ModaleModificaDati";
import ModaleCancellazioneProfilo from "./ModaleCancellazioneProfilo";

function HomePage() {
  const [userNome, setUserNome] = useState("");
  const [userCognome, setUserCognome] = useState("");
  const [userRuolo, setUserRuolo] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userTelefono, setUserTelefono] = useState("");
  const [userId, setUserId] = useState(0);
  const [showUtenti, setShowUtenti] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [show, setShow] = useState(false);
  const [showCanva, setShowCanva] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [modEmail, setModEmail] = useState(false);
  const [modDati, setModDati] = useState(false);
  const [cancProfilo, setCancProfilo] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowCanva = () => setShowCanva(true);
  const handleCloseCanva = () => setShowCanva(false);

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
        setUserEmail(data.email);
        setUserTelefono(data.telefono);
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
        <ModaleCambioPassword
          show={modalShow}
          onHide={() => {
            setModalShow(false);
          }}
        />
        <ModaleModificaEmail
          userEmail={userEmail}
          show={modEmail}
          onHide={() => {
            setModEmail(false);
          }}
        />
        <ModaleModificaDati
          show={modDati}
          nome={userNome}
          cognome={userCognome}
          telefono={userTelefono}
          onHide={() => {
            setModDati(false);
          }}
        />
        <ModaleCancellazioneProfilo
          show={cancProfilo}
          onHide={() => {
            setCancProfilo(false);
          }}
        />

        {/*modale logout */}
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
      <Offcanvas
        show={showCanva}
        onHide={handleCloseCanva}
        className="bg-bluGuado"
      >
        <Offcanvas.Header
          className="border border-2 border-azzurroPolvere bg-sabbia"
          closeButton
        >
          <Offcanvas.Title>
            <i className="bi bi-person-circle"></i> Impostazioni Profilo
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="d-flex flex-column border border-2 border-sabbia p-3">
            <Link
              className="text-white fw-semibold d-flex align-items-center my-1"
              onClick={() => {
                setModalShow(true);
              }}
            >
              <i className="bi bi-lock"> </i>
              <p className="mb-0 ms-1">Modifica Password</p>
            </Link>
            <Link
              className="text-white fw-semibold d-flex align-items-center my-1"
              onClick={() => {
                setModEmail(true);
              }}
            >
              <i class="bi bi-envelope"></i>
              <p className="mb-0 ms-1">Modifica Email</p>
            </Link>
            <Link
              className="text-white fw-semibold d-flex align-items-center my-1"
              onClick={() => {
                setModDati(true);
              }}
            >
              <i className="bi bi-person-vcard"></i>
              <p className="mb-0 ms-1">Modifica Dati Profilo</p>
            </Link>
          </div>
          <div className="border border-2 border-sabbia p-3 mt-3">
            <Link
              className="text-white fw-semibold d-flex align-items-center "
              onClick={handleShow}
            >
              <i className="bi bi-person-dash"></i>
              <p className="mb-0 ms-1">Log-out</p>
            </Link>
          </div>
          <div className="border border-2 border-sabbia p-3 mt-5">
            <Link
              className="text-white fw-semibold d-flex align-items-center"
              onClick={() => {
                setCancProfilo(true);
              }}
            >
              <i className="bi bi-x-octagon"></i>
              <p className="mb-0 ms-1 ">Cancella Profilo Utente</p>
            </Link>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
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
                <Button
                  variant="primary"
                  className="my-1"
                  onClick={handleShowCanva}
                >
                  <i className="bi bi-arrow-bar-right"></i> Profilo Utente
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

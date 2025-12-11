import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Modal, Alert } from "react-bootstrap/";
import Button from "react-bootstrap/Button";
import base from "../variabili";
import { useNavigate } from "react-router-dom";

function ModaleCancellazioneProfilo(props) {
  const [showConferma, setShowConferma] = useState(false);
  const handleClose = () => setShowConferma(false);
  const handleShow = () => setShowConferma(true);
  const navigate = useNavigate();

  const eliminaProfilo = () => {
    fetch(base + "/utenti/me", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token").slice(1, -1),
      },
    })
      .then((res) => {
        if (res.ok) {
          alert("profilo eliminato");
          props.onHide();
          navigate("/register");
        } else {
          throw new Error(res.status.toString());
        }
      })
      .catch((er) => {
        alert("errore: " + er);
      });
  };

  return (
    <>
      <Modal
        show={showConferma}
        size="sm"
        id="confermaFattura"
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Cancellazione </Modal.Title>
        </Modal.Header>
        <Modal.Body>Confermare l'eliminazione del profilo?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Annulla
          </Button>
          <Button
            variant="success"
            onClick={() => {
              handleClose();
              eliminaProfilo();
            }}
          >
            Conferma
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        id="cambioPassword"
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton className="bg-azzurroPolvere">
          <Modal.Title id="contained-modal-title-vcenter ">
            Cancellazione Profilo Utente
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="grid-example bg-bluGuado">
          <Container>
            <Row className="mb-2 justify-content-center bg-polvereScuro border border-1 border-beige">
              <Col xs={12} className=" p-2 d-flex flex-column">
                <h6 className="text-black text-center text-decoration-underline ">
                  Proseguendo, il tuo profilo utente verrà eliminato
                  definitivamente
                </h6>
              </Col>
            </Row>

            <Row className="border border-1 border-sabbia p-2">
              <h5 className="text-center">Sicuro di voler proseguire?</h5>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer className="bg-polvereScuro">
          <Button variant="danger" onClick={props.onHide}>
            Annulla
          </Button>
          <Button
            variant="success"
            form="form"
            type="submit"
            onClick={handleShow}
          >
            Elimina Profilo
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModaleCancellazioneProfilo;

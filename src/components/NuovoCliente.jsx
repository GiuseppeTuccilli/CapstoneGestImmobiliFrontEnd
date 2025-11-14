import { Container, Row, Col, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { PatternFormat } from "react-number-format";
import { NumericFormat } from "react-number-format";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import base from "../variabili";

function NuovoCliente() {
  const [token, setToken] = useState(
    localStorage.getItem("token").slice(1, -1)
  );
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [email, setEmail] = useState("");
  const [indirizzo, setIndirizzo] = useState("");
  const [telefono, setTelefono] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showSalvato, setShowSalvato] = useState(false);
  const handleCloseSalvato = () => setShowSalvato(false);
  const handleShowSalvato = () => setShowSalvato(true);

  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const payload = {
    nome: nome,
    cognome: cognome,
    telefono: telefono,
    indirizzo: indirizzo,
    email: email,
  };

  useEffect(() => {
    if (token === null) {
      navigate("/login");
    }
  }, [token]);

  const submitForm = () => {
    fetch(base + "/clienti", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.ok) {
          console.log("ok");
          handleShowSalvato();
        } else {
          throw new Error(res.status);
        }
      })
      .catch((er) => {
        console.log(er.toString());
        setError(true);
      });
  };

  return (
    <>
      <Container>
        {/*modale conferma */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Nuovo Cliente</Modal.Title>
          </Modal.Header>
          <Modal.Body>Confermare e salvare?</Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Annulla
            </Button>
            <Button
              variant="success"
              onClick={() => {
                handleClose();
                submitForm();
              }}
            >
              Salva
            </Button>
          </Modal.Footer>
        </Modal>
        {/*modale cliente salvato */}
        <Modal show={showSalvato} onHide={handleCloseSalvato}>
          <Modal.Header closeButton>
            <Modal.Title>Nuovo Cliente</Modal.Title>
          </Modal.Header>
          <Modal.Body>Confermare e salvare?</Modal.Body>
          <Modal.Footer>
            <Button
              variant="success"
              onClick={() => {
                handleCloseSalvato();
                navigate("/clienti");
              }}
            >
              Ok
            </Button>
          </Modal.Footer>
        </Modal>
        {/*alert errore */}
        {error && (
          <Alert variant="danger" className="text-center">
            C'è stato un errore nel salvataggio
          </Alert>
        )}
        <Row className="d-flex justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Form
              onSubmit={(e) => {
                e.preventDefault();

                handleShow();
              }}
              className="border border-1 border-beige bg-polvereScuro p-3"
            >
              <Form.Group className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  placeholder="Nome"
                  required
                  value={nome}
                  onChange={(e) => {
                    setNome(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Cognome</Form.Label>
                <Form.Control
                  placeholder="Cognome"
                  required
                  value={cognome}
                  onChange={(e) => {
                    setCognome(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Indirizzo</Form.Label>
                <Form.Control
                  placeholder="Indirizzo"
                  required
                  value={indirizzo}
                  onChange={(e) => {
                    setIndirizzo(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="phone">
                <Form.Label>Telefono Cellulare</Form.Label>

                <PatternFormat
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  format="### ## ## ###"
                  mask="_"
                  allowEmptyFormatting={true}
                  //isNumericString={true}
                  customInput={Form.Control}
                  size="sm"
                />
              </Form.Group>
              <div className="d-flex justify-content-center">
                <Button variant="success" type="submit" className="w-50">
                  {" "}
                  Salva Cliente{" "}
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default NuovoCliente;

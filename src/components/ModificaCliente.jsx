import { Container, Row, Col, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { PatternFormat } from "react-number-format";
import { NumericFormat } from "react-number-format";
import Form from "react-bootstrap/Form";
import { Link, useNavigate, useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import base from "../variabili";

function ModificaCliente() {
  const [id, setId] = useState(0);
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
  const params = useParams();

  const payload = {
    nome: nome,
    cognome: cognome,
    telefono: telefono,
    indirizzo: indirizzo,
    email: email,
  };
  const getCliente = (token) => {
    fetch(base + "/clienti/" + params.idCliente, {
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
        setId(data.id);
        setNome(data.nome);
        setCognome(data.cognome);
        setIndirizzo(data.indirizzo);
        setEmail(data.email);
        setTelefono(data.telefono);
      })
      .catch((er) => {
        console.log(er.toString());
      });
  };
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/login");
    } else {
      let tok = localStorage.getItem("token").slice(1, -1);
      getCliente(tok);
    }
  }, []);

  const submitForm = (token) => {
    fetch(base + "/clienti/" + id, {
      method: "PUT",
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
      <Container className="pb-3">
        {/*modale conferma */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modifica Cliente</Modal.Title>
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
                if (localStorage.getItem("token") === null) {
                  alert("errore nel token, effettua il login");
                  navigate("/login");
                } else {
                  let tok = localStorage.getItem("token").slice(1, -1);
                  submitForm(tok);
                }
              }}
            >
              Salva
            </Button>
          </Modal.Footer>
        </Modal>
        {/*modale cliente salvato */}
        <Modal show={showSalvato} onHide={handleCloseSalvato}>
          <Modal.Header closeButton>
            <Modal.Title>Modifica Cliente</Modal.Title>
          </Modal.Header>
          <Modal.Body>Cliente Modificato</Modal.Body>
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
          <div>
            <h2 className="text-center border border-1 border-azzurroPolvere p-3 bg-beige ">
              Modifica Cliente
            </h2>
          </div>
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
                  Salva Modifiche{" "}
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ModificaCliente;

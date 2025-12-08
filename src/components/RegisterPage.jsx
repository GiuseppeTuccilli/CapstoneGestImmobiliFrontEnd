import { useState } from "react";
import { Col, Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Value } from "sass";
import Modal from "react-bootstrap/Modal";
import { Link, useNavigate } from "react-router-dom";
import base from "../variabili";
import { PatternFormat } from "react-number-format";
import { NumericFormat } from "react-number-format";
import Alert from "react-bootstrap/Alert";
function RegisterForm() {
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telefono, setTelefono] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  const navigate = useNavigate();

  const handleClose = () => {
    setShow(false);

    navigate("/login");
  };
  const handleShow = () => setShow(true);

  const payload = {
    nome: nome,
    cognome: cognome,
    email: email,
    password: password,
    telefono: telefono,
  };

  const submitForm = () => {
    fetch(base + "/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          console.log(res);
          handleShow();
        } else {
          throw new Error(res.status);
        }
      })
      .catch((er) => {
        if (er.toString() === "Error: 400") {
          setShowAlert(true);
        }
      });
  };

  return (
    <>
      <Container className="p-5 d-flex justify-content-center pb-0">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Registrazione avvenuta con successo</Modal.Title>
          </Modal.Header>
          <Modal.Body>Grazie, {nome} per esserti registrato</Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={handleClose}>
              ok
            </Button>
          </Modal.Footer>
        </Modal>

        <Col xs={12} md={6}>
          <h1 className="text-center border border-1 border-azzurroPolvere p-3 bg-beige ">
            Gestionale Immobili
          </h1>
          <h2 className="text-center border border-1 border-azzurroPolvere p-3 bg-bluGuado text-light">
            Registrazione utente
          </h2>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              if (password !== confPassword) {
                setErrorPassword(true);
              } else {
                submitForm();
              }
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
            {/* alert errore */}
            <Alert show={showAlert} variant="danger">
              <Alert.Heading>email già in uso</Alert.Heading>

              <hr />
              <div className="d-flex justify-content-end">
                <Button
                  onClick={() => setShowAlert(false)}
                  variant="outline-danger"
                >
                  Ok
                </Button>
              </div>
            </Alert>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formConfPassword">
              <Form.Label>Conferma Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Conferma Password"
                required
                value={confPassword}
                onChange={(e) => {
                  setConfPassword(e.target.value);
                }}
              />
            </Form.Group>
            {/* alert errore password*/}
            <Alert show={errorPassword} variant="danger">
              <Alert.Heading>La Password non corrisponde</Alert.Heading>

              <hr />
              <div className="d-flex justify-content-end">
                <Button
                  onClick={() => setErrorPassword(false)}
                  variant="outline-danger"
                >
                  Ok
                </Button>
              </div>
            </Alert>
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

            <Button variant="primary" type="submit">
              {" "}
              Submit{" "}
            </Button>
            <p className="mt-2">
              Sei già registrato? effetua il{" "}
              <span>
                <Link to={"/login"} className="text-danger fw-semibold">
                  login
                </Link>
              </span>
            </p>
          </Form>
        </Col>
      </Container>
    </>
  );
}

export default RegisterForm;

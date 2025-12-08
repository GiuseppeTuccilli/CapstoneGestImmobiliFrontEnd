import { useState } from "react";
import { Col, Container, Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Value } from "sass";
import Modal from "react-bootstrap/Modal";
import { Link, useNavigate, useParams } from "react-router-dom";
import base from "../variabili";

function ResetPassword() {
  const [error, setError] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [codice, setCodice] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [show, setShow] = useState(false);
  const [errorConfPass, setErrorConfPass] = useState(false);

  const navigate = useNavigate();

  const params = useParams();

  const payload = {
    codice: codice,
    newPassword: newPassword,
    email: params.email,
  };

  const verificaAndReset = () => {
    fetch(base + "/auth/resetPassword", {
      method: "PATCH",
      body: JSON.stringify(payload),
      headers: { "Content-type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          setShow(true);
        } else {
          throw new error(res.status);
        }
      })
      .catch((er) => {
        console.log(er.toString());
        setError(true);
      });
  };

  return (
    <>
      {/* modale reset riuscito */}
      <Modal show={show} size="sm" id="confermaFattura">
        <Modal.Header closeButton>
          <Modal.Title>Password Modificata</Modal.Title>
        </Modal.Header>
        <Modal.Body>Torna al login</Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              setShow(false);
              navigate("/login");
            }}
          >
            Ok
          </Button>
        </Modal.Footer>
      </Modal>

      {error && (
        <Alert variant="danger">
          <p className="text-center mb-2">codice errato</p>
          <div className="text-center">
            <Button
              variant="danger"
              onClick={() => {
                setError(false);
              }}
            >
              Riprova
            </Button>
          </div>
        </Alert>
      )}
      {errorConfPass && (
        <Alert variant="danger">
          <p className="text-center mb-2">Le password non corrispondono</p>
          <div className="text-center">
            <Button
              variant="danger"
              onClick={() => {
                setErrorConfPass(false);
              }}
            >
              Riprova
            </Button>
          </div>
        </Alert>
      )}
      <Container className="p-5 pb-0 d-flex justify-content-center">
        <Col xs={12} md={6}>
          <div>
            <h1 className="text-center border border-1 border-azzurroPolvere p-3 bg-beige ">
              Gestionale Immobili
            </h1>
            <h3 className="text-center border border-1 border-azzurroPolvere p-3 bg-bluGuado text-light">
              Reset Password
            </h3>
          </div>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              if (newPassword !== confPassword) {
                setErrorConfPass(true);
              } else {
                verificaAndReset();
              }
            }}
            className="border border-1 border-beige bg-polvereScuro p-3"
          >
            <p className="border corder-1 border-bluGuado bg-sabbia fw-semibold p-2">
              Inserisci il codice ricevuto da Mailgun Sandbox, se non vedi
              l'email, controlla negli spam
            </p>
            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Label>Inserisci il codice </Form.Label>
              <Form.Control
                type="text"
                placeholder="Codice"
                required
                value={codice}
                onChange={(e) => {
                  setCodice(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Nuova Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Nuova Password"
                required
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicConfPassword">
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

            <Button variant="primary" type="submit">
              {" "}
              Conferma{" "}
            </Button>
          </Form>
        </Col>
      </Container>
    </>
  );
}
export default ResetPassword;

import { useState } from "react";
import { Col, Container, Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Value } from "sass";
import Modal from "react-bootstrap/Modal";
import { Link, useNavigate } from "react-router-dom";
import base from "../variabili";

function RichiediCodice() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const payload = {
    email: email,
  };

  const richiediCodice = () => {
    fetch(base + "/auth/richiediCodice", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          setError(false);
          navigate("/reset/" + email);
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
      {error && (
        <Alert variant="danger">
          <p className="text-center mb-2">email non valida </p>
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
      <Container className="p-5 pb-0 d-flex justify-content-center">
        <Col xs={12} md={6}>
          <div>
            <h1 className="text-center border border-1 border-azzurroPolvere p-3 bg-beige ">
              Gestionale Immobili
            </h1>
            <h3 className="text-center border border-1 border-azzurroPolvere p-3 bg-bluGuado text-light">
              Richiedi codice reset password
            </h3>
          </div>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              richiediCodice();
            }}
            className="border border-1 border-beige bg-polvereScuro p-3"
          >
            <p className="border corder-1 border-bluGuado bg-sabbia fw-semibold p-2">
              Verrà inviata una email dal dominio Mailgun Sandbox al tuo
              indirizzo con un codice per resettare la password del tuo profilo,
              se non la vedi, controlla negli spam
            </p>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Inserisci la tua email </Form.Label>
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

            <Button variant="primary" type="submit">
              {" "}
              Richiedi Codice{" "}
            </Button>
          </Form>
        </Col>
      </Container>
    </>
  );
}

export default RichiediCodice;

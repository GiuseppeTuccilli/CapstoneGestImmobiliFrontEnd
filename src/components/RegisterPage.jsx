import { useState } from "react";
import { Col, Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Value } from "sass";
function RegisterForm() {
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telefono, setTelefono] = useState("");

  const payload = {
    nome: nome,
    cognome: cognome,
    email: email,
    password: password,
    telefono: telefono,
  };

  const submitForm = () => {
    fetch("http://localhost:8080/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-type": "application/json" },
    }).then((res) => {
      if (res.ok) {
        console.log(res);
      }
    });
  };

  return (
    <Container className="p-5 d-flex justify-content-center">
      <Col xs={12} md={6}>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            console.log(payload);
            submitForm();
          }}
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
          <Form.Group className="mb-3">
            <Form.Label>Telefono</Form.Label>
            <Form.Control
              placeholder="Telefono"
              type=""
              required
              value={telefono}
              onChange={(e) => {
                setTelefono(e.target.value);
              }}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            {" "}
            Submit{" "}
          </Button>
        </Form>
      </Col>
    </Container>
  );
}

export default RegisterForm;

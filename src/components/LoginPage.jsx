import { useState } from "react";
import { Col, Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Value } from "sass";
import Modal from "react-bootstrap/Modal";
import { Link, useNavigate } from "react-router-dom";
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const payload = {
    email: email,
    password: password,
  };

  const Login = () => {
    fetch("http://localhost:8080/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(res.statusText);
        }
      })
      .then((data) => {
        console.log(data);
        localStorage.setItem("token", JSON.stringify(data.token));
        navigate("/home");
      })
      .catch((er) => {
        console.log(er);
      });
  };

  return (
    <Container className="p-5 pb-0 d-flex justify-content-center">
      <Col xs={12} md={6}>
        <h2 className="text-center">Login</h2>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            Login();
          }}
        >
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

          <Button variant="primary" type="submit">
            {" "}
            login{" "}
          </Button>
        </Form>
      </Col>
    </Container>
  );
}

export default LoginPage;

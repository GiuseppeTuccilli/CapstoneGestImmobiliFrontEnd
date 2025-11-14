import { useState } from "react";
import { Col, Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Value } from "sass";
import Modal from "react-bootstrap/Modal";
import { Link, useNavigate } from "react-router-dom";
import base from "../variabili";
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const payload = {
    email: email,
    password: password,
  };

  const Login = () => {
    fetch(base + "/auth/login", {
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
        console.log(localStorage.getItem("token"));
        //navigate("/");
      })
      .catch((er) => {
        console.log(er);
      });
  };

  return (
    <Container className="p-5 pb-0 d-flex justify-content-center">
      <Col xs={12} md={6}>
        <div>
          <h1 className="text-center border border-1 border-azzurroPolvere p-3 bg-beige ">
            Gestionale Immobili
          </h1>
          <h2 className="text-center border border-1 border-azzurroPolvere p-3 bg-bluGuado text-light">
            Login
          </h2>
        </div>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            Login();
          }}
          className="border border-1 border-beige bg-polvereScuro p-3"
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
          <p className="mt-2">
            Non sei registrato registrato? <br />{" "}
            <span>
              <Link to={"/register"} className="text-danger fw-semibold">
                registrati
              </Link>
            </span>
          </p>
        </Form>
      </Col>
    </Container>
  );
}

export default LoginPage;

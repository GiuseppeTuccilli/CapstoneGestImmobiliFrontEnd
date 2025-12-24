import { useState } from "react";
import { Container, Row, Col, Image, Spinner, Table } from "react-bootstrap";
import { Modal, Alert } from "react-bootstrap/";
import Button from "react-bootstrap/Button";
import base from "../variabili";
import { useNavigate } from "react-router-dom";

function ModaleCambioPassword(props) {
  const [nuovaPassword, setNuovaPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);
  const [tooShort, setTooShort] = useState(false);
  const [passwordErrata, setPasswordErrata] = useState(false);

  const navigate = useNavigate();

  const payload = {
    oldPassword: oldPassword,
    password: nuovaPassword,
  };

  const cambiaPassword = (token) => {
    fetch(base + "/utenti/me", {
      method: "PATCH",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.ok) {
          alert("password modificata");
          props.onHide();
        } else {
          throw new Error(res.status);
        }
      })
      .catch((er) => {
        console.log(er.toString());
        if (er.toString() === "Error: 400") {
          setPasswordErrata(true);
        }
      });
  };

  return (
    <>
      <Modal
        id="cambioPassword"
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton className="bg-azzurroPolvere">
          <Modal.Title id="contained-modal-title-vcenter ">
            Cambio Password
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="grid-example bg-bluGuado">
          <Container>
            <Row className="mb-2 justify-content-center bg-polvereScuro border border-1 border-beige">
              <Col xs={12} lg={6} className=" p-2 d-flex flex-column">
                <h6 className="text-black">Inserisci la password corrente</h6>
                <input
                  type="password"
                  required
                  value={oldPassword}
                  onChange={(e) => {
                    setOldPassword(e.target.value);
                  }}
                ></input>
              </Col>
            </Row>

            <Row className="border border-1 border-sabbia p-2">
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
              {/* alert password corta*/}
              <Alert show={tooShort} variant="danger">
                <Alert.Heading>
                  La Password deve avere almeno 8 caratteri
                </Alert.Heading>

                <hr />
                <div className="d-flex justify-content-end">
                  <Button
                    onClick={() => setTooShort(false)}
                    variant="outline-danger"
                  >
                    Ok
                  </Button>
                </div>
              </Alert>
              {/* alert password errata*/}
              <Alert show={passwordErrata} variant="danger">
                <Alert.Heading>Password errata</Alert.Heading>

                <hr />
                <div className="d-flex justify-content-end">
                  <Button
                    onClick={() => setPasswordErrata(false)}
                    variant="outline-danger"
                  >
                    Ok
                  </Button>
                </div>
              </Alert>
              <h5>Nuova Password</h5>
              <Col xs={12} md={6}>
                <div className="bg-polvereScuro border border-1 border-beige p-2">
                  <h6 className="text-black">Nuova password</h6>
                  <input
                    type="password"
                    className="w-100"
                    required
                    minLength={8}
                    value={nuovaPassword}
                    onChange={(e) => {
                      setNuovaPassword(e.target.value);
                    }}
                  ></input>
                </div>
              </Col>
              <Col xs={12} md={6}>
                <div className="bg-polvereScuro border border-1 border-beige p-2">
                  <h6 className="text-black">Conferma password</h6>
                  <input
                    type="password"
                    className="w-100"
                    required
                    minLength={8}
                    value={confPassword}
                    onChange={(e) => {
                      setConfPassword(e.target.value);
                    }}
                  ></input>
                </div>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer className="bg-polvereScuro">
          <Button variant="danger" onClick={props.onHide}>
            Annulla
          </Button>
          <Button
            variant="success"
            onClick={() => {
              if (nuovaPassword !== confPassword) {
                setErrorPassword(true);
                return;
              }
              if (nuovaPassword.length < 8) {
                setTooShort(true);
                return;
              }
              if (localStorage.getItem("token") === null) {
                alert("errore nel token, effettua il login");
                navigate("/login");
              } else {
                let tok = localStorage.getItem("token").slice(1, -1);
                cambiaPassword(tok);
              }
            }}
          >
            Conferma
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModaleCambioPassword;

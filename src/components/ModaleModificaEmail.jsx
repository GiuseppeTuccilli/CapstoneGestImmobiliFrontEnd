import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Modal, Alert } from "react-bootstrap/";
import Button from "react-bootstrap/Button";
import base from "../variabili";

function ModaleModificaEmail(props) {
  const [newEmail, setNewEmail] = useState("");
  const [uguali, setUguali] = useState(false);

  let userEmail = props.userEmail;

  const payload = {
    newEmail: newEmail,
  };

  const modificaEmail = () => {
    fetch(base + "/utenti/me/email", {
      method: "PATCH",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token").slice(1, -1),
      },
    })
      .then((res) => {
        if (res.ok) {
          alert("email modificata");
          props.onHide();
        } else {
          return res.json().then((text) => {
            throw new Error(res.status.toString() + " " + text);
          });
        }
      })
      .catch((er) => {
        console.log(er);
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
            Modifica Email
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="grid-example bg-bluGuado">
          <Container>
            <Row className="mb-2 justify-content-center bg-polvereScuro border border-1 border-beige">
              <Col xs={12} className=" p-2 d-flex flex-column">
                <h6 className="text-black text-center text-decoration-underline">
                  Indirizzo email attuale:
                </h6>
                <p className="text-center m-0  p-2 px-3 border border-1 border-sabbia bg-bluGuado fw-semibold">
                  {userEmail}
                </p>
              </Col>
            </Row>
            {uguali && (
              <Alert variant="primary">
                <p className="m-0 mb-3 text-center fw-semibold">
                  {" "}
                  La nuova email è uguale a quella attuale
                </p>
                <div className="text-center">
                  <Button
                    variant="promary"
                    onClick={() => {
                      setUguali(false);
                    }}
                  >
                    Ok
                  </Button>
                </div>
              </Alert>
            )}

            <Row className="border border-1 border-sabbia p-2">
              <h5 className="text-center">Desideri cambiare la tua email?</h5>
              <Col xs={12}>
                <form
                  id="form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (newEmail === userEmail) {
                      setUguali(true);
                      return;
                    }
                    modificaEmail();
                  }}
                >
                  <div className="bg-polvereScuro border border-1 border-beige p-2">
                    <h6 className="text-black">
                      Inserisci il nuovo indirizzo email:
                    </h6>
                    <input
                      type="email"
                      className="w-100"
                      required
                      value={newEmail}
                      onChange={(e) => {
                        setNewEmail(e.target.value);
                      }}
                    ></input>
                    <p className="m-0 mt-2 p-2 text-black border border-1 border-bluGuado bg-bianchetto sizePiccola fw-semibold">
                      Verrà inviata una email da Mailgun Sandbox con un link da
                      cliccare, se non lo si clicca non sarà possibilie ricevere
                      un codice di reset della password in caso di smarrimento
                    </p>
                  </div>
                </form>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer className="bg-polvereScuro">
          <Button variant="danger" onClick={props.onHide}>
            Annulla
          </Button>
          <Button variant="success" form="form" type="submit">
            Conferma
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModaleModificaEmail;

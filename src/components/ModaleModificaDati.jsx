import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Modal, Alert } from "react-bootstrap/";
import Button from "react-bootstrap/Button";
import { PatternFormat } from "react-number-format";
import base from "../variabili";
import Form from "react-bootstrap/Form";

function ModaleModificaDati(props) {
  const [newNome, setNewNome] = useState(props.nome);
  const [newCognome, setNewCognome] = useState(props.cognome);
  const [newTelefono, setNewTelefono] = useState(props.telefono);

  let userNome = props.nome;
  let userCognome = props.cognome;
  let userTelefono = props.telefono;

  const payload = {
    newNome: newNome,
    newCognome: newCognome,
    newTelefono: newTelefono,
  };

  const modificaDati = () => {
    fetch(base + "/utenti/me", {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token").slice(1, -1),
      },
    })
      .then((res) => {
        if (res.ok) {
          alert("dati modificati");
          props.onHide();
          window.location.reload();
        } else {
          throw new Error(res.status.toString());
        }
      })
      .catch((er) => {
        alert("errore: " + er);
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
            Modifica Dati Profilo
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="grid-example bg-bluGuado">
          <Container>
            <Row className="border border-1 border-sabbia p-2">
              <h5 className="text-center">Desideri modificare i tuoi dati?</h5>
              <Col xs={12}>
                <form
                  id="form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    modificaDati();
                  }}
                >
                  <div className="bg-polvereScuro border border-1 border-beige p-2">
                    <h6 className="text-black mt-2 mb-1">Nome:</h6>
                    <Form.Group>
                      <Form.Control
                        placeholder="Nome"
                        required
                        defaultValue={userNome}
                        onChange={(e) => {
                          setNewNome(e.target.value);
                        }}
                      />
                    </Form.Group>
                    <h6 className="text-black mt-3 mb-1">Cognome:</h6>
                    <Form.Group>
                      <Form.Control
                        placeholder="Cognome"
                        required
                        defaultValue={userCognome}
                        onChange={(e) => {
                          setNewCognome(e.target.value);
                        }}
                      />
                    </Form.Group>
                    <h6 className="text-black mt-3 mb-1">Telefono:</h6>
                    <Form.Group controlId="phone">
                      <PatternFormat
                        defaultValue={userTelefono}
                        onChange={(e) => {
                          setNewTelefono(e.target.value);
                        }}
                        format="### ## ## ###"
                        mask="_"
                        allowEmptyFormatting={true}
                        //isNumericString={true}
                        customInput={Form.Control}
                        size="sm"
                      />
                    </Form.Group>
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

export default ModaleModificaDati;

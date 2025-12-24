import { useState } from "react";
import { Container, Row, Col, Image, Spinner, Table } from "react-bootstrap";
import { Modal, Alert } from "react-bootstrap/";
import Button from "react-bootstrap/Button";
import base from "../variabili";
import { useNavigate } from "react-router-dom";

function ModaleNuovaFattura(props) {
  let idC = props.idClient;
  let nome = props.nome;
  let cognome = props.cognome;

  const [data, setData] = useState("");
  const [causale, setCausale] = useState("");
  const [importo, setImporto] = useState(0);
  const [showConferma, setShowConferma] = useState(false);
  const [salvInCorso, setSalvInCorso] = useState(false);
  const handleClose = () => setShowConferma(false);
  const handleShow = () => setShowConferma(true);

  const navigate = useNavigate();

  const payload = {
    importo: importo,
    data: data,
    causale: causale,
    idCliente: idC,
  };

  const salvaFattura = (token) => {
    setSalvInCorso(true);
    fetch(base + "/fatture", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.ok) {
          setSalvInCorso(false);
          alert("fattura salvata");
          window.location.reload();
        } else {
          throw new Error(res.status);
        }
      })
      .catch((er) => {
        setSalvInCorso(false);
        alert("errore nel salvataggio: " + er.toString());
      });
  };

  return (
    <>
      {/*modale salvataggio in corso*/}
      <Modal size="sm" show={salvInCorso}>
        <div className="text-center py-3">
          <p className="fw-semibold">Salvataggio in corso</p>
          <Spinner />
        </div>
      </Modal>
      {/*modale conferma */}
      <Modal
        show={showConferma}
        size="sm"
        id="confermaFattura"
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Nuova Fattura</Modal.Title>
        </Modal.Header>
        <Modal.Body>Confermare e salvare?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Annulla
          </Button>
          <Button
            variant="success"
            onClick={() => {
              if (localStorage.getItem("token") === null) {
                alert("token non valido, effettua il login");
                navigate("/login");
              } else {
                let tok = localStorage.getItem("token").slice(1, -1);
                handleClose();
                props.onHide();
                salvaFattura(tok);
              }
            }}
          >
            Salva
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        id="nuovaFattura"
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton className="bg-azzurroPolvere">
          <Modal.Title id="contained-modal-title-vcenter ">
            Nuova fattura per {nome + " "}
            {cognome}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="grid-example bg-bluGuado">
          <Container>
            <Row className="mb-2">
              <Col xs={12} md={6}>
                <div className="bg-polvereScuro border border-1 border-beige p-2">
                  <h6>Importo (€)</h6>
                  <input
                    type="number"
                    min={0}
                    value={importo}
                    onChange={(e) => {
                      setImporto(e.target.value);
                    }}
                  ></input>
                </div>
              </Col>
              <Col xs={12} md={6}>
                <div className="bg-polvereScuro border border-1 border-beige p-2">
                  <h6>Seleziona la data</h6>
                  <input
                    value={data}
                    onChange={(e) => {
                      setData(e.target.value);
                    }}
                    type="date"
                    max={new Date().toISOString().split("T")[0]}
                  ></input>
                </div>
              </Col>
            </Row>

            <Row>
              <div className="bg-beige pb-2">
                <h4 className="m-0 p-2 border border-1 border-bluGuado my-1 text-center ">
                  Causale
                </h4>
                <div className=" w-100">
                  <textarea
                    style={{ height: "10em" }}
                    className="form-control mb-1"
                    placeholder="causale..."
                    id="causale"
                    value={causale}
                    onChange={(e) => {
                      setCausale(e.target.value);
                    }}
                  ></textarea>
                </div>
              </div>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer className="bg-polvereScuro">
          <Button onClick={props.onHide}>Annulla</Button>
          <Button
            onClick={() => {
              if (importo <= 0) {
                alert("l' importo non può essere 0");
                return;
              }
              if (data === "") {
                alert("selezionare una data");
                return;
              }
              handleShow();
              //props.onHide();
            }}
            variant="success"
          >
            Salva
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModaleNuovaFattura;

import { Container, Row, Col, Image, Spinner, Table } from "react-bootstrap";
import { Modal, Alert } from "react-bootstrap/";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import ModaleNuovaFattura from "./ModaleNuovaFattura";
function FattureCliente(props) {
  let idCliente = props.idCliente;
  let base = props.base;
  let ruolo = props.ruolo;
  const [fatture, setFatture] = useState([]);
  const [idFatturaSel, setIdFatturaSel] = useState(0);
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  const getFatture = (token) => {
    fetch(base + "/clienti/" + idCliente + "/fatture", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(res.status);
        }
      })
      .then((data) => {
        setError(false);
        setFatture(data);
      })
      .catch((er) => {
        console.log(er.toString());
        setError(true);
      });
  };

  const cancellaFattura = (token) => {
    if (idFatturaSel <= 0) {
      return;
    }
    fetch(base + "/fatture/" + idFatturaSel, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.ok) {
          alert("fattura eliminata");
          window.location.reload();
        } else {
          throw new Error(res.status);
        }
      })
      .catch((er) => {
        alert(er.toString() + " errori nell'eliminazione");
      });
  };

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/login");
    } else {
      let tok = localStorage.getItem("token").slice(1, -1);
      getFatture(tok);
    }
  }, []);

  return (
    <>
      {/*modale nuova fattura */}
      <ModaleNuovaFattura
        show={modalShow}
        onHide={() => setModalShow(false)}
        idClient={idCliente}
        nome={props.nomeCliente}
        cognome={props.cognomeCliente}
      />

      {/*modale elimina */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cancellazione Fattura</Modal.Title>
        </Modal.Header>
        <Modal.Body>Sicuro di voler cancellare questa fattura?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Annulla
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              handleClose();
              if (localStorage.getItem("token") === null) {
                alert("token non valido, effettua il login");
                navigate("/login");
              } else {
                let tok = localStorage.getItem("token").slice(1, -1);
                cancellaFattura(tok);
              }
            }}
          >
            Elimina
          </Button>
        </Modal.Footer>
      </Modal>
      <Col style={{ height: "20em", overflowY: "auto" }}>
        <Row className="d-flex justify-content-center">
          <Table striped bordered hover className="mb-0">
            <thead className="position-sticky" style={{ top: "-0.5%" }}>
              <th colSpan={3}>
                <div className="d-flex  justify-content-around p-3 border border-1 border-beige bg-polvereScuro">
                  <div>
                    <h4 className="m-0 p-2 border border-1 border-azzurroPolvere bg-beige">
                      Fatture
                    </h4>
                  </div>
                  <div className="d-flex align-items-center p-2 border border-1 border-beige">
                    <h6
                      className="m-0 me-1"
                      style={{
                        textDecoration: "underline",
                        textDecorationColor: "beige",
                        textUnderlineOffset: "0.2em",
                      }}
                    >
                      Totale Fatturato:{" "}
                    </h6>
                    <p className="m-0 fw-semibold p-1 border border-1 border-beige bg-beigeChiaro">
                      {fatture.reduce((sum, f) => sum + f.importo, 0) + " €"}
                    </p>
                  </div>

                  {ruolo === "ADMIN" && idFatturaSel > 0 && (
                    <Button variant="danger" onClick={handleShow}>
                      {" "}
                      Elimina <i className="bi bi-trash3-fill"></i>
                    </Button>
                  )}
                  {ruolo === "ADMIN" && (
                    <Button
                      variant="success"
                      onClick={() => setModalShow(true)}
                    >
                      {" "}
                      + Fattura
                    </Button>
                  )}
                </div>
              </th>
              <tr>
                <th className="text-center">Data</th>

                <th className="text-center">Importo (€)</th>
                <th className="text-center">Causale</th>
              </tr>
            </thead>

            <tbody>
              {fatture.map((f) => {
                return (
                  <tr
                    key={f.numero}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setIdFatturaSel(f.numero);
                    }}
                    className={
                      idFatturaSel === f.numero &&
                      "border border-2 border-success"
                    }
                  >
                    <td>{f.data}</td>
                    <td>{f.importo}</td>
                    <td>{f.causale !== "" ? f.causale : "non specificata"}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          {error && (
            <>
              <Alert variant="danger" className="text-center">
                Errore nel caricamento delle fatture
              </Alert>
            </>
          )}
        </Row>
      </Col>
    </>
  );
}

export default FattureCliente;

import { Container, Row, Col, Image, Spinner, Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import base from "../variabili";
import { Modal, Alert } from "react-bootstrap/";
import { useParams, useNavigate, Link } from "react-router-dom";

function MieVisite() {
  const [token, setToken] = useState(
    localStorage.getItem("token").slice(1, -1)
  );

  const [visite, setVisite] = useState([]);
  const [idVisitaSel, setIdVisitaSel] = useState(0);
  const [idImmobileSel, setIdImmobileSel] = useState(0);
  const [idClienteSel, setIdClienteSel] = useState(0);
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getVisite = () => {
    fetch(base + "/visite/mieVisite", {
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
        setVisite(data);
      })
      .catch((er) => {
        console.log(er.toString());
      });
  };

  const cancellaVisita = () => {
    if (idVisitaSel <= 0) {
      return;
    }
    fetch(base + "/visite/mieVisite/" + idVisitaSel, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.ok) {
          alert("visita eliminata");
          window.location.reload();
        } else {
          throw new Error(res.status);
        }
      })
      .catch((er) => {
        alert(er.toString() + " errore nell'eliminazine");
      });
  };

  useEffect(() => {
    getVisite();
  }, [token]);

  return (
    <>
      {/*modale elimina */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cancellazione Visita</Modal.Title>
        </Modal.Header>
        <Modal.Body>Sicuro di voler cancellare questa visita?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Annulla
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              handleClose();
              cancellaVisita();
            }}
          >
            Elimina
          </Button>
        </Modal.Footer>
      </Modal>
      <Container className="mb-3">
        <Row className="d-flex justify-content-center border border-1 border-beige p-4 bg-polvereScuro">
          <Col xs={12} md={8}>
            <div className="d-flex flex-column  justify-content-center">
              <div className="border border-1 border-beige p-3 bg-bianchetto">
                <h2 className="text-center m-0">Le Mie Visite</h2>
              </div>
              <h5 className="m-0 mt-2 text-center ">
                Per prenotare una visita consulta{" "}
                <span>
                  <Link
                    to={"/immobili"}
                    className="text-bianchetto"
                    style={{
                      textDecoration: "underline",
                      textDecorationColor: "beige",
                    }}
                  >
                    l'elenco degli immobili
                  </Link>
                </span>
              </h5>
            </div>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center border border-1 border-azzurroPolvere bg-polvereScuro p-3">
          <Col xs={12} md={6} className="d-flex justify-content-evenly">
            {idImmobileSel > 0 && (
              <Button
                variant="primary"
                onClick={() => {
                  navigate("/immobili/" + idImmobileSel);
                }}
              >
                Immobile <i class="bi bi-box-arrow-up-right"></i>
              </Button>
            )}
            {idClienteSel > 0 && (
              <Button
                variant="primary"
                onClick={() => {
                  navigate("/clienti/" + idClienteSel);
                }}
              >
                Cliente <i class="bi bi-box-arrow-up-right"></i>
              </Button>
            )}
            {idVisitaSel > 0 && (
              <Button variant="danger" onClick={handleShow}>
                {" "}
                Elimina <i className="bi bi-trash3-fill"></i>
              </Button>
            )}
          </Col>
        </Row>
        <Row className="d-flex justify-content-center border border-1 border-polvereScuro  bg-bluGuado">
          <Col style={{ height: "20em", overflowY: "auto" }}>
            <Row>
              <Table striped bordered hover className="mb-0">
                <thead className="position-sticky" style={{ top: "-0.5%" }}>
                  <tr>
                    <th className="text-center">Data</th>

                    <th className="text-center">Indirizzo Immobile</th>
                    <th colSpan={2} className="text-center">
                      Cliente
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {visite.map((v) => {
                    return (
                      <tr
                        key={v.id}
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setIdVisitaSel(v.id);
                          setIdImmobileSel(v.immobile.id);
                          setIdClienteSel(v.cliente.id);
                        }}
                        className={
                          idVisitaSel === v.id &&
                          "border border-2 border-success"
                        }
                      >
                        <td>{v.data}</td>
                        <td>{v.immobile.indirizzo}</td>
                        <td>{v.cliente.nome}</td>
                        <td>{v.cliente.cognome}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default MieVisite;

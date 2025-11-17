import { Container, Row, Col, Image, Spinner, Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import base from "../variabili";
import { Modal, Alert } from "react-bootstrap/";
import { useParams, useNavigate } from "react-router-dom";

function DettagliCliente() {
  const [token, setToken] = useState(
    localStorage.getItem("token").slice(1, -1)
  );
  const [show, setShow] = useState(false);
  const [nome, SetNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [telefono, setTelefono] = useState("");
  const [indirizzo, setIndirizzo] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errElimina, setErrElimina] = useState(false);
  const [showVisite, setShowVisite] = useState(false);

  const [visite, setVisite] = useState([]);
  const [richieste, setRichieste] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [ruolo, setRuolo] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  const getMe = () => {
    fetch(base + "/utenti/me", {
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
        setRuolo(data.ruolo);
      })
      .catch((er) => {
        console.log(er);
        console.log("catch");
      });
  };

  const getCliente = () => {
    fetch(base + "/clienti/" + params.idCliente, {
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
        setId(data.id);
        SetNome(data.nome);
        setCognome(data.cognome);
        setIndirizzo(data.indirizzo);
        setEmail(data.email);
        setTelefono(data.telefono);
        setLoading(false);
        setError(false);
      })
      .catch((er) => {
        console.log(er.toString());
        setLoading(false);
        setError(true);
      });
  };

  const getVisite = () => {
    fetch(base + "/clienti/" + params.idCliente + "/visite", {
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
        alert("errore nel recupero visite " + er.toString());
      });
  };

  const eliminaCliente = () => {
    fetch(base + "/clienti/" + id.toString(), {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.ok) {
          alert("cliente eliminato");
          navigate("/clienti");
        } else {
          throw new Error(res.status);
        }
      })
      .catch((er) => {
        console.log(er.toString());
        if (er.toString() === "Error 500") {
          alert("non hai i permessi per eliminare i clienti");
        }
        setErrElimina(true);
      });
  };

  useEffect(() => {
    if (token === null) {
      navigate("/login");
    }
    getMe();
    getCliente();
    getVisite();
  }, [token]);

  return (
    <>
      {/*modale elimina */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminazione Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>Sicuro di voler eliminare questo cliente?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Annulla
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              eliminaCliente();
            }}
          >
            Elimina
          </Button>
        </Modal.Footer>
      </Modal>
      <Container className="mb-3">
        <Row className="d-flex justify-content-center border border-1 border-beige p-4 bg-polvereScuro">
          <Col xs={12} md={8}>
            <div className="d-flex justify-content-between">
              <Button
                className="px-4 h-100"
                variant="primary"
                onClick={() => {
                  navigate(-1);
                }}
              >
                <i className="bi bi-arrow-bar-left"></i>
              </Button>

              <div className="border border-1 border-beige p-3 bg-bianchetto">
                <h2>Cliente</h2>
              </div>
              {ruolo === "ADMIN" && (
                <div className="d-flex justify-content-between">
                  <Button
                    variant="danger"
                    className="px-4 h-75"
                    onClick={handleShow}
                  >
                    <i className="bi bi-trash3-fill"></i>
                  </Button>
                  <Button
                    variant="primary"
                    className="px-4 h-75"
                    onClick={() => {
                      if (!ruolo === "ADMIN") {
                        alert("non hai i permessi per modificare i clienti");
                        return;
                      }
                      navigate(`/clienti/${id}/modifica`);
                    }}
                  >
                    <i className="bi bi-pencil-fill"></i>
                  </Button>
                </div>
              )}
            </div>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center border border-1 border-polvereScuro p-3 bg-bluGuado">
          <Col xs={6} md={3} className="px-3">
            <div className="p-1 border border-1 border-polvereScuro bg-beigeChiaro">
              <p className="mb-0">Nome</p>
              <h6>{nome}</h6>
            </div>
            <div className="p-1 border border-1 border-polvereScuro bg-beigeChiaro">
              <p className="mb-0">Cognome</p>
              <h6>{cognome}</h6>
            </div>
          </Col>
          <Col xs={6} md={3} className="px-3">
            <div className="p-1 border border-1 border-polvereScuro bg-beigeChiaro">
              <p className="mb-0">Indirizzo</p>
              <h6 style={{ fontSize: "0.8em" }}>{indirizzo}</h6>
            </div>
            <div className="p-1 border border-1 border-polvereScuro bg-beigeChiaro">
              <p className="mb-0">Telefono</p>
              <h6>{telefono}</h6>
            </div>
          </Col>
          <Col xs={12} md={3} className="px-3">
            <div className="p-1 border border-1 border-polvereScuro bg-beigeChiaro">
              <p className="mb-0">Email</p>
              <h6 style={{ fontSize: "0.7em" }}>{email}</h6>
            </div>
          </Col>
          <Col xs={0} md={3} className="d-md-none"></Col>
        </Row>
        <Row className="d-flex justify-content-center border border-1 border-azzurroPolvere bg-polvereScuro p-3">
          <Col xs={12} md={6} className="d-flex justify-content-evenly">
            <Button variant="primary">Richieste</Button>
            <Button
              variant="primary"
              onClick={() => {
                if (showVisite) {
                  setShowVisite(false);
                } else {
                  setShowVisite(true);
                }
              }}
            >
              {showVisite ? (
                <i className="bi bi-x-lg"></i>
              ) : (
                <i className="bi bi-arrow-90deg-down"></i>
              )}{" "}
              Visite
            </Button>
            <Button
              variant="success"
              onClick={() => {
                navigate(`/clienti/${id}/nuovaRichiesta`);
              }}
            >
              + Richiesta
            </Button>
          </Col>
        </Row>

        {/*Row visite cliente */}
        <Row className={!showVisite && "d-none"}>
          <Col style={{ height: "20em", overflowY: "auto" }}>
            <Row>
              <Table striped bordered hover className="mb-0">
                <thead className="position-sticky" style={{ top: "-0.5%" }}>
                  <tr>
                    <th className="text-center">Data</th>

                    <th colSpan={2} className="text-center">
                      Immobile
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr style={{ cursor: "pointer" }}>
                    <td>primo</td>
                    <td>sdfsdfsdfdsf</td>
                    <td>sdfsdfsdf</td>
                  </tr>
                  <tr style={{ cursor: "pointer" }}>
                    <td>sdfsdfsdfsdf</td>
                    <td>sdfsdfsdfdsf</td>
                    <td>sdfsdfsdf</td>
                  </tr>
                  <tr style={{ cursor: "pointer" }}>
                    <td>sdfsdfsdfsdf</td>
                    <td>sdfsdfsdfdsf</td>
                    <td>sdfsdfsdf</td>
                  </tr>
                  <tr style={{ cursor: "pointer" }}>
                    <td>sdfsdfsdfsdf</td>
                    <td>sdfsdfsdfdsf</td>
                    <td>sdfsdfsdf</td>
                  </tr>
                  <tr style={{ cursor: "pointer" }}>
                    <td>sdfsdfsdfsdf</td>
                    <td>sdfsdfsdfdsf</td>
                    <td>sdfsdfsdf</td>
                  </tr>
                  <tr style={{ cursor: "pointer" }}>
                    <td>sdfsdfsdfsdf</td>
                    <td>sdfsdfsdfdsf</td>
                    <td>sdfsdfsdf</td>
                  </tr>
                  <tr style={{ cursor: "pointer" }}>
                    <td>sdfsdfsdfsdf</td>
                    <td>sdfsdfsdfdsf</td>
                    <td>sdfsdfsdf</td>
                  </tr>
                  <tr style={{ cursor: "pointer" }}>
                    <td>sdfsdfsdfsdf</td>
                    <td>sdfsdfsdfdsf</td>
                    <td>sdfsdfsdf</td>
                  </tr>
                </tbody>
              </Table>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default DettagliCliente;

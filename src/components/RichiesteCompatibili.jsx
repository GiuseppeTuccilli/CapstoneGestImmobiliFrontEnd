import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Modal,
  Alert,
  Spinner,
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

function RichiesteCompatibili(props) {
  const [idRichiestaSel, setIdRichiestaSel] = useState(0);

  const [error, setError] = useState(false);

  const [richieste, setRichieste] = useState([]);

  const [idClienteSel, setIdClienteSel] = useState(0);
  const [nomeSel, setNomeSel] = useState("");
  const [cognomeSel, setCognomeSel] = useState("");
  const [salvInCorso, setSalvInCorso] = useState(false);

  const [data, setData] = useState("");
  const [showConferma, setShowConferma] = useState(false);
  const [errSalv, setErrSalv] = useState(false);
  const handleClose = () => setShowConferma(false);
  const handleShow = () => setShowConferma(true);

  let idImmo = props.idImmo;
  let base = props.base;

  const params = useParams();

  const visitaPayload = {
    data: data,
    idImmobile: parseInt(params.idImmobile),
    idCliente: idClienteSel,
  };

  const navigate = useNavigate();

  const salvaVisita = (token) => {
    setSalvInCorso(true);
    fetch(base + "/visite", {
      method: "POST",
      body: JSON.stringify(visitaPayload),
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.ok) {
          setSalvInCorso(false);
          alert("visita salvata");
          window.location.reload();
        } else {
          throw new Error(res.status);
        }
      })
      .catch((er) => {
        setSalvInCorso(false);
        setErrSalv(true);
        console.log(er.toString());
      });
  };

  const getRichiesteCompatibili = (token) => {
    fetch(base + "/immobili/" + idImmo + "/incroci", {
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
        setRichieste(data);
      })
      .catch((er) => {
        setError(true);
        console.log(er.toString());
      });
  };

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/login");
    } else {
      let tok = localStorage.getItem("token").slice(1, -1);
      getRichiesteCompatibili(tok);
    }
  }, []);

  return (
    <>
      {errSalv && (
        <Alert variant="danger" className="text-center">
          Questo immobile ha bià una visita prenotata per la data{" "}
          <span className="fw-semibold">{data}</span>
          <div className="d-flex justify-content-center ">
            <Button onClick={() => setErrSalv(false)} variant="outline-danger">
              Ok
            </Button>
          </div>
        </Alert>
      )}
      {/*modale conferma */}
      <Modal
        show={showConferma}
        size="sm"
        id="confermaFattura"
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Nuova Visita</Modal.Title>
        </Modal.Header>
        <Modal.Body>Confermare e salvare?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Annulla
          </Button>
          <Button
            variant="success"
            onClick={() => {
              handleClose();
              if (localStorage.getItem("token") === null) {
                alert("errore nel token, effettuta il login");
                navigate("/login");
              } else {
                let tok = localStorage.getItem("token").slice(1, -1);
                salvaVisita(tok);
              }
            }}
          >
            Salva
          </Button>
        </Modal.Footer>
      </Modal>
      {/*modale salvataggio in corso*/}
      <Modal size="sm" show={salvInCorso}>
        <div className="text-center py-3">
          <p className="fw-semibold">Salvataggio in corso</p>
          <Spinner />
        </div>
      </Modal>
      <Container fluid>
        <Row className="p-3 border border-2 border-sabbia bg-bluGuado ">
          <Col xs={12} md={6} className="d-flex align-items-center">
            <h6 className="m-0 p-2 border border-1 border-azzurroPolvere bg-sabbia text-center">
              Richieste Compatibili con questo Immobile
            </h6>
          </Col>
          <Col xs={12} md={6} className="d-flex justify-content-between py-1">
            {idRichiestaSel !== 0 && (
              <>
                <Button
                  onClick={() => {
                    navigate("/clienti/" + idClienteSel);
                  }}
                >
                  Scheda Cliente <i className="bi bi-box-arrow-up-right"></i>
                </Button>
                <DropdownButton
                  align="end"
                  title="Prenota Visita"
                  id="dropdown-menu-align-end"
                >
                  <div className="d-flex flex-column align-items-center mx-1 p-2 border border-1 border-azzurroPolvere bg-sabbia ">
                    <div className="w-100 p-2 border border-1 bprder-azzurroPolvere bg-bluGuado mb-2">
                      <h6 className="m-0 text-white">Cliente:</h6>
                      <p className="m-0 text-decoration-underline text-white">
                        {nomeSel + " "}
                        {cognomeSel}
                      </p>
                    </div>
                    <h6>Seleziona la data</h6>
                    <input
                      value={data}
                      onChange={(e) => {
                        setData(e.target.value);
                      }}
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                    ></input>
                  </div>{" "}
                  <Dropdown.Divider />
                  <div className="text-center">
                    <Button
                      variant="success"
                      onClick={() => {
                        if (data === "") {
                          alert("seleziona una data");
                          return;
                        }
                        handleShow();
                      }}
                    >
                      Salva Visita
                    </Button>
                  </div>
                </DropdownButton>
              </>
            )}
          </Col>
        </Row>
        <Row className="border border-2 border-bluGuado">
          <Col style={{ height: "20em", overflowY: "auto" }}>
            <Row>
              <Table striped bordered hover className="mb-0">
                <thead className="position-sticky" style={{ top: "-0.5%" }}>
                  <tr>
                    <th colSpan={2} className="text-center">
                      Cliente
                    </th>

                    <th>Indirizzo</th>
                  </tr>
                </thead>

                <tbody>
                  {richieste.length > 0 &&
                    richieste.map((r) => {
                      return (
                        <tr
                          style={{ cursor: "pointer" }}
                          key={r.id}
                          onClick={() => {
                            setIdRichiestaSel(r.id);
                            setIdClienteSel(r.cliente.id);
                            setNomeSel(r.cliente.nome);
                            setCognomeSel(r.cliente.cognome);
                          }}
                          className={
                            idRichiestaSel === r.id &&
                            "border border-2 border-primary"
                          }
                        >
                          <td>{r.cliente.nome}</td>
                          <td>{r.cliente.cognome}</td>
                          <td>{r.cliente.indirizzo}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
              {error && (
                <>
                  <Alert variant="danger" className="text-center">
                    Errore nel recupero dati
                  </Alert>
                </>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default RichiesteCompatibili;

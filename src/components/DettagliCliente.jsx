import { Container, Row, Col, Image, Spinner, Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import base from "../variabili";
import { Modal, Alert } from "react-bootstrap/";
import { useParams, useNavigate } from "react-router-dom";
import FattureCliente from "./FattureCliente";

function DettagliCliente() {
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
  const [showRichieste, setShowRichieste] = useState(false);
  const [showImmobili, setShowImmobili] = useState(false);
  const [showFatture, setShowFatture] = useState(false);

  const [visite, setVisite] = useState([]);
  const [richieste, setRichieste] = useState([]);
  const [immoComp, setImmoComp] = useState([]);

  const [idImmobileSel, setIdImmobileSel] = useState(0);
  const [idVisitaSel, setIdVisitaSel] = useState(0);
  const [idRichiestaSel, setIdRichiestaSel] = useState(0);
  const [idImmoCompSel, setIdImmoCompSel] = useState(0);
  const [showEliminaRich, setShowEliminaRich] = useState(false);

  const [isFirstRender, setIsFirstRender] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [ruolo, setRuolo] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  const getMe = (token) => {
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

  const getCliente = (token) => {
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

  const getVisite = (token) => {
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
        console.log(er.toString());
      });
  };

  const eliminaCliente = (token) => {
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

  const getRichieste = (token) => {
    fetch(base + "/clienti/" + params.idCliente + "/richieste", {
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
        setRichieste(data);
      })
      .catch((er) => {
        console.log(er.toString());
      });
  };

  const getImmoCompatibili = (token) => {
    fetch(base + "/richieste/" + idRichiestaSel + "/incroci", {
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
        console.log(data);
        setImmoComp(data);
      })
      .catch((er) => {
        alert("errore recupero dati immobili " + er.toString());
      });
  };

  const eliminaRichiesta = (token) => {
    fetch(base + "/richieste/" + idRichiestaSel, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.ok) {
          alert("richiesta eliminata");
          window.location.reload();
        } else {
          throw new Error(res.status);
        }
      })
      .catch((er) => {
        alert("errore nell'eliminazione: " + er.toString());
      });
  };

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/login");
    } else {
      let tok = localStorage.getItem("token").slice(1, -1);
      getMe(tok);
      getCliente(tok);
      getVisite(tok);
      getRichieste(tok);
    }
  }, []);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }
    if (idRichiestaSel === 0) {
      return;
    }
    if (localStorage.getItem("token") === null) {
      navigate("/login");
    } else {
      let tok = localStorage.getItem("token").slice(1, -1);
      getImmoCompatibili(tok);
    }
  }, [idRichiestaSel]);

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
              if (localStorage.getItem("token") === null) {
                navigate("/login");
              } else {
                let tok = localStorage.getItem("token").slice(1, -1);
                eliminaCliente(tok);
                handleClose();
              }
            }}
          >
            Elimina
          </Button>
        </Modal.Footer>
      </Modal>
      {/*modale elimina richiesta*/}
      <Modal
        show={showEliminaRich}
        onHide={() => {
          setShowEliminaRich(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Eliminazione Richiesta</Modal.Title>
        </Modal.Header>
        <Modal.Body>Sicuro di voler eliminare questo Richiesta?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowEliminaRich(false);
            }}
          >
            Annulla
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              if (localStorage.getItem("token") === null) {
                navigate("/login");
              } else {
                let tok = localStorage.getItem("token").slice(1, -1);
                eliminaRichiesta(tok);
                setShowEliminaRich(false);
              }
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
        {error && (
          <Alert variant="danger" className="text-center">
            Errore nel recupero dati
          </Alert>
        )}
        {errElimina && (
          <>
            <Alert variant="danger">
              <Alert.Heading className="text-center">
                Errore nell'eliminazione
              </Alert.Heading>

              <hr />
              <div className="d-flex justify-content-center">
                <Button
                  onClick={() => {
                    setErrElimina(false);
                  }}
                  variant="outline-danger"
                >
                  Ok
                </Button>
              </div>
            </Alert>
          </>
        )}
        <Row className="d-flex justify-content-center border border-1 border-polvereScuro p-3 bg-bluGuado">
          {loading ? (
            <Spinner />
          ) : (
            <>
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
            </>
          )}
        </Row>
        <Row className="d-flex justify-content-center border border-1 border-azzurroPolvere bg-polvereScuro p-3">
          <Col xs={12} md={6} className="d-flex justify-content-evenly">
            <Button
              variant="primary"
              onClick={() => {
                if (showRichieste) {
                  setShowRichieste(false);
                  setShowImmobili(false);
                  setIdImmobileSel(0);
                  setIdRichiestaSel(0);
                } else {
                  setShowVisite(false);
                  setShowRichieste(true);
                  setShowFatture(false);
                  setIdVisitaSel(0);
                  setIdImmobileSel(0);
                }
              }}
            >
              {showRichieste ? (
                <i className="bi bi-x-lg"></i>
              ) : (
                <i className="bi bi-arrow-90deg-down"></i>
              )}{" "}
              Richieste
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                if (showVisite) {
                  setShowVisite(false);
                  setIdVisitaSel(0);
                  setIdImmobileSel(0);
                } else {
                  setShowRichieste(false);
                  setShowImmobili(false);
                  setShowFatture(false);
                  setShowVisite(true);
                  setIdRichiestaSel(0);
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
              variant="primary"
              onClick={() => {
                if (showFatture) {
                  setShowFatture(false);
                  setIdVisitaSel(0);
                  setIdImmobileSel(0);
                  setIdRichiestaSel(0);
                } else {
                  setShowRichieste(false);
                  setShowImmobili(false);
                  setShowVisite(false);
                  setShowFatture(true);
                  setIdImmobileSel(0);
                  setIdVisitaSel(0);
                }
              }}
            >
              {showFatture ? (
                <i className="bi bi-x-lg"></i>
              ) : (
                <i className="bi bi-arrow-90deg-down"></i>
              )}{" "}
              Fatture
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
        <Row className={"bg-bluGuado " + (!showVisite && "d-none")}>
          <Col style={{ height: "20em", overflowY: "auto" }}>
            <Row>
              <Table striped bordered hover className="mb-0">
                <thead className="position-sticky" style={{ top: "-0.5%" }}>
                  <th colSpan={3}>
                    <div className="d-flex  justify-content-around p-3 border border-1 border-beige bg-polvereScuro">
                      <div>
                        <h4 className="m-0 p-2 border border-1 border-azzurroPolvere bg-beige">
                          Visite
                        </h4>
                      </div>
                      {idImmobileSel > 0 && (
                        <Button
                          variant="success"
                          onClick={() => {
                            navigate("/immobili/" + idImmobileSel);
                          }}
                        >
                          Vedi Immobile{" "}
                        </Button>
                      )}
                    </div>
                  </th>
                  <tr>
                    <th className="text-center">Data</th>

                    <th colSpan={2} className="text-center">
                      Immobile
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
                        }}
                        className={
                          idVisitaSel === v.id &&
                          "border border-2 border-success"
                        }
                      >
                        <td>{v.data}</td>
                        <td>{v.immobile.indirizzo}</td>
                        <td>
                          {v.immobile.comune.denominazione +
                            " (" +
                            v.immobile.comune.provincia.sigla +
                            ")"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Row>
          </Col>
        </Row>

        {/*Row richieste cliente */}
        <Row className={"bg-bluGuado " + (!showRichieste && "d-none")}>
          <Col style={{ height: "20em", overflowY: "auto" }}>
            <Row className="d-flex justify-content-center">
              <Table striped bordered hover className="mb-0">
                <thead className="position-sticky" style={{ top: "-0.5%" }}>
                  <th colSpan={3}>
                    <div className="d-flex  justify-content-around p-3 border border-1 border-beige bg-polvereScuro">
                      <div>
                        <h4 className="m-0 p-2 border border-1 border-azzurroPolvere bg-beige">
                          Richieste
                        </h4>
                      </div>
                      {idRichiestaSel > 0 && showImmobili === false && (
                        <>
                          <Button
                            variant="success"
                            onClick={() => {
                              setShowImmobili(true);
                            }}
                          >
                            Immobili Compatibili{" "}
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => {
                              setShowEliminaRich(true);
                            }}
                          >
                            <i className="bi bi-trash3-fill"></i>
                          </Button>
                        </>
                      )}
                    </div>
                  </th>
                  <tr>
                    <th className="text-center">Data</th>

                    <th className="text-center">Prezzo Massimo (€)</th>
                    <th className="text-center">Comune</th>
                  </tr>
                </thead>

                <tbody>
                  {richieste.map((r) => {
                    return (
                      <tr
                        key={r.id}
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setIdRichiestaSel(r.id);
                        }}
                        className={
                          idRichiestaSel === r.id &&
                          "border border-2 border-success"
                        }
                      >
                        <td>{r.data}</td>
                        <td>{r.prezzoMassimo}</td>
                        <td>
                          {r.comune !== "" ? r.comune : "non specificato"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Row>
          </Col>
          <Col
            style={{ height: "20em", overflowY: "auto" }}
            xs={10}
            md={8}
            className={!showImmobili && "d-none"}
          >
            <Row>
              <Table striped bordered hover className="mb-0">
                <thead className="position-sticky" style={{ top: "-0.5%" }}>
                  <th colSpan={3}>
                    <div className="border border-1 border-beige bg-polvereScuro d-flex justify-content-evenly">
                      <Button
                        variant="primary"
                        onClick={() => {
                          setShowImmobili(false);
                        }}
                      >
                        <i className="bi bi-arrow-bar-left"></i>
                      </Button>
                      <h6 className="m-0 text-center pt-2">
                        Immobili Compatibili
                      </h6>
                      {idImmoCompSel !== 0 && (
                        <Button
                          variant="success"
                          onClick={() => {
                            navigate("/immobili/" + idImmoCompSel);
                          }}
                        >
                          <i className="bi bi-box-arrow-up-right"></i>
                        </Button>
                      )}
                    </div>
                  </th>

                  <tr>
                    <th>Indirizzo</th>
                    <th>Comune</th>
                    <th>Tipologia</th>
                  </tr>
                </thead>

                <tbody>
                  {immoComp.length > 0 &&
                    immoComp.map((i) => {
                      return (
                        <tr
                          key={i.id}
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setIdImmoCompSel(i.id);
                          }}
                          className={
                            idImmoCompSel === i.id &&
                            "border border-2 border-success"
                          }
                        >
                          <td>{i.indirizzo}</td>
                          <td>
                            {i.comune.denominazione +
                              " (" +
                              i.comune.provincia.sigla +
                              ")"}
                          </td>
                          <td>{i.macroTipologia.split("_")[1]}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </Row>
          </Col>
        </Row>
        {/*Row fatture cliente */}
        <Row className={"bg-bluGuado " + (!showFatture && "d-none")}>
          <FattureCliente
            ruolo={ruolo}
            idCliente={params.idCliente}
            base={base}
            nomeCliente={nome}
            cognomeCliente={cognome}
          />
        </Row>
      </Container>
    </>
  );
}

export default DettagliCliente;

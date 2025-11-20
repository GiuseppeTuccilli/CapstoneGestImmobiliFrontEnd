import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import base from "../variabili";
import { useParams, useNavigate } from "react-router-dom";
import CurrencyInput from "react-currency-input-field";

function NuovaRichiesta() {
  const [token, setToken] = useState(
    localStorage.getItem("token").slice(1, -1)
  );

  //per il payload
  const [prezzoMax, setPrezzoMax] = useState(0);
  const [superficieMin, setSuperficieMin] = useState(0);
  const [vaniMin, setVaniMin] = useState(0);
  const [localiMin, setLocaliMin] = useState(0);
  const [comune, setComune] = useState("");
  const [provincia, setProvincia] = useState("");
  const [cantina, setCantina] = useState(false);
  const [ascensore, setAscensore] = useState(false);
  const [postoAuto, setPostAuto] = useState(false);
  const [giardinoPrivato, setGiardinoPrivato] = useState(false);
  const [terrazzo, setTerrazzo] = useState(false);
  const [arredato, SetArredato] = useState(false);
  //---------------------------------------------

  const [idProvincia, setIdProvincia] = useState(null);
  const [show, setShow] = useState(false);
  const [showConferma, setShowConferma] = useState(false);
  const [showCom, setShowCom] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [province, setProvince] = useState([]);
  const [comuni, setComuni] = useState([]);
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleCloseProv = () => setShow(false);
  const handleShowProv = () => setShow(true);
  const handleCloseCom = () => setShowCom(false);
  const handleShowCom = () => setShowCom(true);
  const handleClose = () => setShowConferma(false);
  const handleShow = () => setShowConferma(true);

  const params = useParams();
  const navigate = useNavigate();

  const payload = {
    prezzoMassimo: prezzoMax,
    superficieMinimo: superficieMin,
    superficieMassimo: 0,
    vaniMinimo: vaniMin,
    vaniMassimo: 0,
    localiMinimo: localiMin,
    localiMassimo: 0,
    comune: comune,
    provincia: provincia,
    cantina: cantina,
    ascensore: ascensore,
    postoAuto: postoAuto,
    giardinoPrivato: giardinoPrivato,
    terrazzo: terrazzo,
    arredato: arredato,
  };

  const getProvince = () => {
    fetch(base + "/province", {
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
        setProvince(data);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  const getComuniProvincia = () => {
    if (provincia === "") {
      setShowAlert(true);
      return;
    }
    fetch(base + "/comuni/" + idProvincia, {
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
      .then((comData) => {
        setComuni(comData);
      })
      .catch((er) => {
        console.log(er);
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
        setNome(data.nome);
        setCognome(data.cognome);

        setLoading(false);
        setError(false);
      })
      .catch((er) => {
        console.log(er.toString());
        setLoading(false);
        setError(true);
      });
  };

  const salvaRichiesta = () => {
    fetch(base + "/clienti/" + params.idCliente + "/richieste", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.ok) {
          alert("richiesta salvata correttamente");
          navigate("/clienti/" + params.idCliente);
        } else {
          throw new Error(res.status);
        }
      })
      .catch((er) => {
        alert("errore salvataggio dati: " + er.toString());
      });
  };

  useEffect(() => {
    if (token === null) {
      navigate("/login");
    }
    getCliente();
  }, [token, params.idCliente]);

  return (
    <>
      {/*alert*/}
      <>
        <Alert show={showAlert} variant="danger">
          <p>Seleziona prima una provincia</p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button
              onClick={() => setShowAlert(false)}
              variant="outline-danger"
            >
              Ok
            </Button>
          </div>
        </Alert>
        {error && (
          <Alert variant="danger">Errore caricamento dati cliente</Alert>
        )}
      </>
      {/*modale province*/}
      <Modal show={show} onHide={handleCloseProv} style={{ height: "20em" }}>
        <Modal.Header className="sticky-top top-0 z-1 bg-light" closeButton>
          <Modal.Title>Seleziona Provincia</Modal.Title>
        </Modal.Header>
        {province.map((p) => {
          return (
            <Modal.Body
              className="provinciaSelect"
              onClick={() => {
                setProvincia(p.nomeProvincia);
                setIdProvincia(p.id);
                handleCloseProv();
              }}
            >
              {p.nomeProvincia}
            </Modal.Body>
          );
        })}
      </Modal>
      {/*modale comuni*/}
      <Modal show={showCom} onHide={handleCloseCom} style={{ height: "20em" }}>
        <Modal.Header className="sticky-top top-0 z-1 bg-light" closeButton>
          <Modal.Title>Seleziona Comune</Modal.Title>
        </Modal.Header>
        {comuni.map((p) => {
          return (
            <Modal.Body
              className="provinciaSelect"
              onClick={() => {
                setComune(p.denominazione);
                handleCloseCom();
              }}
            >
              {p.denominazione}
            </Modal.Body>
          );
        })}
      </Modal>
      {/*modale conferma */}
      <Modal show={showConferma} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nuova Richiesta</Modal.Title>
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
              salvaRichiesta();
            }}
          >
            Salva
          </Button>
        </Modal.Footer>
      </Modal>
      <Container>
        <Row className="p-2 border border-1 border-beige bg-bluGuado">
          <Col xs={12} md={6}>
            <div className="p-3 border border-1 border-bluGuado bg-beige">
              <h2 className="text-center m-0">Nuova Richiesta</h2>
            </div>
          </Col>
          <Col xs={12} md={4}>
            <div className="p-2 border border-1 border-beige bg-polvereScuro">
              <h6 className="m-0 mb-1">Cliente:</h6>
              {loading ? (
                <Spinner />
              ) : (
                <p className="m-0 border border-1 border-white ps-1">
                  {nome} {cognome}
                </p>
              )}
            </div>
          </Col>
          <Col xs={12} md={2}>
            <div className="d-flex flex-column ">
              <Button
                variant="danger"
                onClick={() => {
                  navigate("/clienti/" + params.idCliente);
                }}
              >
                Annulla
              </Button>
              <Button variant="success" onClick={handleShow}>
                Salva
              </Button>
            </div>
          </Col>
        </Row>
        <Row className="p-2 border border-1 border-azzurroPolvere bg-beige">
          <h6 className="m-0 text-center">
            I parametri vuoti o con valore "0" non verranno presi in
            considerazione per gli incroci
          </h6>
        </Row>
        <Row>
          <Col
            xs={12}
            md={4}
            className="d-flex flex-column p-2 border border-2 border-beige bg-polvereScuro"
          >
            <div className="d-flex flex-column mb-1">
              <h6 className="m-0 mb-1 ">Prezzo Massimo (€)</h6>
              <CurrencyInput
                id="input-example"
                name="input-name"
                placeholder="Please enter a number"
                value={prezzoMax}
                // decimalsLimit={2}

                onValueChange={(value, name, values) => {
                  //console.log(value, name, values);
                  setPrezzoMax(value);
                }}
              />
              {/*  <input
                type="number"
                min={0}
                value={prezzoMax}
                onChange={(e) => {
                  setPrezzoMax(e.target.value);
                }}
              ></input>*/}
            </div>
            <div className="d-flex flex-column mb-1">
              <h6 className="m-0 mb-1 ">Superficie Minimo (mq)</h6>
              <input
                type="number"
                min={0}
                max={2000}
                value={superficieMin}
                onChange={(e) => {
                  setSuperficieMin(e.target.value);
                }}
              ></input>
            </div>
            <div className="d-flex flex-column mb-1">
              <h6 className="m-0 mb-1 ">Vani Minimo (mq)</h6>
              <input
                type="number"
                min={0}
                max={30}
                value={vaniMin}
                onChange={(e) => {
                  setVaniMin(e.target.value);
                }}
              ></input>
            </div>
            <div className="d-flex flex-column mb-1">
              <h6 className="m-0 mb-1 ">Locali Minimo (mq)</h6>
              <input
                type="number"
                min={0}
                max={30}
                value={localiMin}
                onChange={(e) => {
                  setLocaliMin(e.target.value);
                }}
              ></input>
            </div>
          </Col>
          <Col
            xs={12}
            md={5}
            className="d-flex flex-column  p-2 border border-2 border-beige bg-polvereScuro"
          >
            <div className="d-flex justify-content-center p-2 m-2 border border-1 border-bluGuado bg-beige">
              <h5 className="m-0">Accessori</h5>
            </div>
            <Row>
              <Col xs={6}>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="cantina"
                    checked={cantina}
                    onChange={(e) => {
                      setCantina(e.target.checked);
                    }}
                  />
                  <label
                    className="form-check-label fw-semibold"
                    htmlFor="cantina"
                  >
                    Cantina
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="ascensore"
                    checked={ascensore}
                    onChange={(e) => {
                      setAscensore(e.target.checked);
                    }}
                  />
                  <label
                    className="form-check-label fw-semibold"
                    htmlFor="cantina"
                  >
                    Ascensore
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="auto"
                    checked={postoAuto}
                    onChange={(e) => {
                      setPostAuto(e.target.checked);
                    }}
                  />
                  <label
                    className="form-check-label fw-semibold"
                    htmlFor="cantina"
                  >
                    Posto Auto
                  </label>
                </div>
              </Col>
              <Col xs={6}>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="giardino"
                    checked={giardinoPrivato}
                    onChange={(e) => {
                      setGiardinoPrivato(e.target.checked);
                    }}
                  />
                  <label
                    className="form-check-label fw-semibold"
                    htmlFor="cantina"
                  >
                    Giardino
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="terrazzo"
                    checked={terrazzo}
                    onChange={(e) => {
                      setTerrazzo(e.target.checked);
                    }}
                  />
                  <label
                    className="form-check-label fw-semibold"
                    htmlFor="cantina"
                  >
                    Terrazzo
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="arredato"
                    checked={arredato}
                    onChange={(e) => {
                      SetArredato(e.target.checked);
                    }}
                  />
                  <label
                    className="form-check-label fw-semibold"
                    htmlFor="cantina"
                  >
                    Arredato
                  </label>
                </div>
              </Col>
            </Row>
            <div className="d-flex justify-content-center p-2 m-2 border border-1 border-bluGuado bg-beige">
              <p className="m-0">
                Gli immobili che non includono gli accessori selezionati verrano
                esclusi{" "}
              </p>
            </div>
          </Col>
          <Col
            xs={12}
            md={3}
            className="d-flex flex-column  p-2 border border-2 border-beige bg-polvereScuro"
          >
            <h6 className="m-0 mb-1">Provincia</h6>
            <div className="d-flex mb-2">
              <input
                type="text"
                value={provincia}
                style={{ maxWidth: "70%" }}
              ></input>
              <Button
                onClick={() => {
                  handleShowProv();
                  getProvince();
                }}
              >
                <i className="bi bi-search"></i>
              </Button>
            </div>

            <h6 className="m-0 mb-1">Comune</h6>
            <div className="d-flex mb-2 ">
              <input
                style={{ maxWidth: "70%" }}
                type="text"
                value={comune}
                onChange={(e) => {
                  setComune(e.target.value);
                }}
              ></input>
              <Button
                onClick={() => {
                  if (provincia === "") {
                    setShowAlert(true);
                  } else {
                    handleShowCom();
                    getComuniProvincia();
                  }
                }}
              >
                <i className="bi bi-search"></i>
              </Button>
            </div>

            <Button
              variant="danger"
              className="mt-4 mx-4 mb-1"
              onClick={() => {
                setComune("");
                setProvincia("");
              }}
            >
              <i className="bi bi-eraser-fill"></i>
            </Button>

            <p className="m-0 fw-semibold">Rimuonvi Provincia e Comune</p>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default NuovaRichiesta;

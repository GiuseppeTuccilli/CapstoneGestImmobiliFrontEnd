import { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import base from "../variabili";
import { useNavigate } from "react-router-dom";
import CurrencyInput from "react-currency-input-field";

function NuovoImmobile() {
  const [token, setToken] = useState(
    localStorage.getItem("token").slice(1, -1)
  );
  const [comune, setComune] = useState("");
  const [provincia, setProvincia] = useState("");
  const [idProvincia, setIdProvincia] = useState(null);
  const [show, setShow] = useState(false);
  const [showCom, setShowCom] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [province, setProvince] = useState([]);
  const [comuni, setComuni] = useState([]);
  const [erroreSalvataggio, isErroreSalvataggio] = useState(false);
  const [salvatoShow, setSalvatoShow] = useState(false);

  //parametri payload--------------
  const [macro, setMacroTipo] = useState("Entità Urbana");
  const [sup, setSuperficie] = useState(null);
  const [local, setLocali] = useState(1);
  const [van, setVani] = useState(1);
  const [desc, setDescrizione] = useState("");
  const [prez, setPrezzo] = useState(1);
  const [indi, setIndirizzo] = useState("");
  const [cant, setCantina] = useState(false);
  const [asc, setAscensore] = useState(false);
  const [posto, setPostoAuto] = useState(false);
  const [giardino, setGiardinoPrivato] = useState(false);
  const [ter, setTerrazzo] = useState(false);
  const [arr, setArredato] = useState(false);

  const payload = {
    macroTipo: macro,
    superficie: sup,
    locali: local,
    vani: van,
    descrizione: desc,
    prezzo: prez,
    indirizzo: indi,
    comune: comune,
    cantina: cant,
    ascensore: asc,
    postoAuto: posto,
    giardinoPrivato: giardino,
    terrazzo: ter,
    arredato: arr,
  };

  //------------

  const handleCloseProv = () => setShow(false);
  const handleShowProv = () => setShow(true);
  const handleCloseCom = () => setShowCom(false);
  const handleShowCom = () => setShowCom(true);
  const handleCloseSalvato = () => setSalvatoShow(false);
  const handleShowSalvato = () => setSalvatoShow(true);

  const navigate = useNavigate();

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

  const salvaImmobile = () => {
    fetch(base + "/immobili", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.ok) {
          console.log(res.status.valueOf());
          setSalvatoShow(true);
        } else {
          throw new Error(res.status.toString());
        }
      })
      .catch((er) => {
        console.log(er);
        isErroreSalvataggio(true);
      });
  };

  return (
    <Container fluid>
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

      {/*modale immobile salvato*/}
      <Modal show={salvatoShow} onHide={handleCloseSalvato}>
        <Modal.Header closeButton>
          <Modal.Title>Salvataggio Completato</Modal.Title>
        </Modal.Header>
        <Modal.Body>Immobile salvato correttamente</Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={() => {
              handleCloseSalvato();
              navigate("/immobili");
            }}
          >
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
      <Form
        className="pb-3"
        id="formImmobile"
        onSubmit={(e) => {
          e.preventDefault();
          console.log(payload);
          salvaImmobile();
        }}
      >
        <h3 className="text-center my-2 py-2 border border-1 border-beige bg-azzurroPolvere">
          Nuovo Immobile
        </h3>
        <Row className="g-1">
          <Col
            xs={12}
            md={6}
            className="d-flex flex-column align-items-start border border-1 border-beige bg-polvereScuro p-2 "
          >
            <h4>Seleziona Macro Tipologia</h4>
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => {
                setMacroTipo(e.target.value);
              }}
              value={macro}
            >
              <option value="Entità Urbana">Entità Urbana</option>
              <option value="Destinazione Speciale">
                Destinazione Speciale
              </option>
              <option value="Destinazione Particolare">
                Destinazione Particolare
              </option>
            </Form.Select>
            <div className="d-flex my-2 justify-content-start w-100">
              <h4 className="m-0 w-50">Numero locali</h4>
              <input
                type="number"
                min={1}
                max={12}
                value={local}
                onChange={(e) => {
                  setLocali(e.target.value);
                }}
              ></input>
            </div>
            <div className="d-flex my-2 justify-content-start w-100">
              <h4 className="m-0 w-50">Numero vani</h4>
              <input
                type="number"
                min={1}
                max={12}
                value={van}
                onChange={(e) => {
                  setVani(e.target.value);
                }}
              ></input>
            </div>
            <div className="d-flex my-2 justify-content-start w-100">
              <h4 className="m-0 w-50">Superficie (mq)</h4>
              <input
                type="number"
                min={1}
                max={2000}
                value={sup}
                onChange={(e) => {
                  setSuperficie(e.target.value);
                }}
              ></input>
            </div>

            <div className="d-flex my-2 justify-content-start w-100">
              <h4 className="m-0 w-50">Prezzo (€)</h4>
              <CurrencyInput
                id="input-example"
                name="input-name"
                placeholder="Please enter a number"
                value={prez}
                // decimalsLimit={2}

                onValueChange={(value, name, values) => {
                  //console.log(value, name, values);
                  setPrezzo(value);
                }}
              />

              {/* <input
                type="number"
                min={0}
                value={prez}
                onChange={(e) => {
                  setPrezzo(e.target.value);
                }}
              ></input>*/}
            </div>
          </Col>
          <Col
            xs={12}
            md={6}
            className="d-flex flex-column align-items-center border border-1 border-beige bg-polvereScuro p-2 "
          >
            <h4>Descrizione</h4>
            <div className=" w-100">
              <textarea
                style={{ height: "10em" }}
                className="form-control"
                placeholder="descrizione"
                id="descrizione"
                required
                value={desc}
                onChange={(e) => {
                  setDescrizione(e.target.value);
                }}
              ></textarea>
            </div>
          </Col>
          <Col
            xs={12}
            md={6}
            className="d-flex flex-column align-items-center border border-1 border-beige bg-polvereScuro p-2"
          >
            <h4>Accessori</h4>
            <Row className="w-100">
              <Col xs={6}>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="cantina"
                    checked={cant}
                    onChange={(e) => {
                      setCantina(e.target.checked);
                    }}
                  />
                  <label className="form-check-label" htmlFor="cantina">
                    Cantina
                  </label>
                </div>
              </Col>
              <Col xs={6}>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="ascensore"
                    checked={asc}
                    onChange={(e) => {
                      setAscensore(e.target.checked);
                    }}
                  />
                  <label className="form-check-label" htmlFor="ascensore">
                    Ascensore
                  </label>
                </div>
              </Col>
              <Col xs={6}>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="postoAuto"
                    checked={posto}
                    onChange={(e) => {
                      setPostoAuto(e.target.checked);
                    }}
                  />
                  <label className="form-check-label" htmlFor="postoAuto">
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
                    id="giardinoPrivato"
                    checked={giardino}
                    onChange={(e) => {
                      setGiardinoPrivato(e.target.checked);
                    }}
                  />
                  <label className="form-check-label" htmlFor="giardinoPrivato">
                    Giardino Privato
                  </label>
                </div>
              </Col>
              <Col xs={6}>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="terrazzo"
                    checked={ter}
                    onChange={(e) => {
                      setTerrazzo(e.target.checked);
                    }}
                  />
                  <label className="form-check-label" htmlFor="terrazzo">
                    Terrazzo
                  </label>
                </div>
              </Col>
              <Col xs={6}>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="arredato"
                    checked={arr}
                    onChange={(e) => {
                      setArredato(e.target.checked);
                    }}
                  />
                  <label className="form-check-label" htmlFor="arredato">
                    Arredato
                  </label>
                </div>
              </Col>
            </Row>
          </Col>
          <Col
            xs={12}
            md={6}
            className="d-flex flex-column align-items-center border border-1 border-beige bg-polvereScuro p-2"
          >
            <div className="d-flex my-2 justify-content-center w-100">
              <h6 className="m-0 me-2 text-end w-25 pt-2">Provincia</h6>
              <div className="d-flex">
                <input type="text" value={provincia} required></input>
                <Button
                  onClick={() => {
                    handleShowProv();
                    getProvince();
                  }}
                >
                  <i className="bi bi-search"></i>
                </Button>
              </div>
            </div>
            <div className="d-flex my-2 justify-content-center w-100">
              <h6 className="m-0 me-2 text-end w-25 pt-2">Comune</h6>
              <input
                type="text"
                value={comune}
                required
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
            <div className="d-flex my-2 justify-content-center w-100">
              <h6 className="m-0 me-2 text-end w-25 pt-2">Indirizzo</h6>
              <input
                type="text"
                required
                value={indi}
                onChange={(e) => {
                  setIndirizzo(e.target.value);
                }}
              ></input>
            </div>
          </Col>
        </Row>
        <div className="d-flex justify-content-center mt-3">
          <Button variant="success" type="submit">
            Conferma e salva
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default NuovoImmobile;

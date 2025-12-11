import { useEffect, useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import base from "../variabili";
import urbana from "../assets/immagini/urbana.png";
import particolare from "../assets/immagini/particolare.jpg";
import speciale from "../assets/immagini/speciale.jpg";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Link, useNavigate } from "react-router-dom";

function ElencoImmobili() {
  const [token, setToken] = useState(
    localStorage.getItem("token").slice(1, -1)
  );
  const [immobili, setImmobili] = useState([]);
  const [filtroComune, setFiltroComune] = useState(false);
  const [filtroProvincia, setFiltroProvincia] = useState(false);
  const [filtroIndirizzo, setFiltroIndirizzo] = useState(false);
  const [filtroTipologia, setFiltroTipologia] = useState(false);
  const [comune, setComune] = useState("");
  const [provincia, setProvincia] = useState("");
  const [indirizzo, setIndirizzo] = useState("");
  const [tipologia, setTipologia] = useState("");
  const [firstPage, setFirstPage] = useState(true);
  const [lastPage, setLastPage] = useState(false);
  const [page, setPage] = useState(0);
  const [idImmoSel, setIdImmoSel] = useState(0);

  const navigate = useNavigate();

  const getImmobili = () => {
    fetch(
      base +
        "/immobili?provincia=" +
        provincia +
        "&comune=" +
        comune +
        "&indirizzo=" +
        indirizzo +
        "&tipo=" +
        tipologia +
        "&page=" +
        page,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(res.status);
        }
      })
      .then((data) => {
        setImmobili(data.content);
        setPage(data.number);
        setFirstPage(data.first);
        setLastPage(data.last);
      })
      .catch((er) => {
        console.log(er.toString());
      });
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    getImmobili();
  }, [comune, provincia, indirizzo, tipologia, token, page]);

  const handleCheckProvincia = (e) => {
    let val = e.target.checked;
    setFiltroProvincia(val);
    if (!val) {
      setProvincia("");
    }
  };

  const handleCheckComune = (e) => {
    let val = e.target.checked;
    setFiltroComune(val);
    if (!val) {
      setComune("");
    }
  };

  const handleCheckIndirizzo = (e) => {
    let val = e.target.checked;
    setFiltroIndirizzo(val);
    if (!val) {
      setIndirizzo("");
    }
  };

  const handleCheckTipologia = (e) => {
    let val = e.target.checked;
    setFiltroTipologia(val);
    if (!val) {
      setTipologia("");
    }
  };

  const handleChangeComune = (e) => {
    if (filtroComune) {
      setComune(e.target.value);
      setPage(0);
    }
  };

  const handleChangeProvincia = (e) => {
    if (filtroProvincia) {
      setProvincia(e.target.value);
      setPage(0);
    }
  };

  const handleChangeIndirizzo = (e) => {
    if (filtroIndirizzo) {
      setIndirizzo(e.target.value);
      setPage(0);
    }
  };

  const handleChangeTipologia = (e) => {
    if (filtroTipologia) {
      setTipologia(e.target.value);
      setPage(0);
    }
  };

  const getImage = (im) => {
    if (im.macroTipologia === "ENTITÀ_URBANA") {
      return urbana;
    } else if (im.macroTipologia === "DESTINAZIONE_SPECIALE") {
      return speciale;
    } else {
      return particolare;
    }
  };

  return (
    <>
      <Row className="d-flex justify-content-center">
        <div className="bg-bluGuado m-0, pt-2 px-3 border-bottom border-1 border-sabbia position-fixed d-flex flex-column">
          <div className="d-flex">
            <div className="col-4 d-flex  justify-content-between align-items-center px-3">
              <h2 className="d-none d-lg-block text-center m-0 p-3 border border-1 border-beige bg-sabbia">
                Immobili
              </h2>
              <h4 className="text-center m-0 p-3 border border-1 border-beige bg-sabbia">
                Filtri<i className="bi bi-funnel"></i>
              </h4>
            </div>
            <div className="col-8">
              <div className="row  justify-content-center g-2">
                <div className="d-flex col col-5 w-50">
                  <InputGroup>
                    <InputGroup.Checkbox
                      aria-label="Checkbox for following text input"
                      checked={filtroComune}
                      onChange={handleCheckComune}
                    />
                    <Form.Control
                      aria-label="Text input with checkbox"
                      placeholder="filtra per Comune"
                      value={comune}
                      onChange={handleChangeComune}
                    />
                  </InputGroup>
                </div>
                <div className="d-flex col col-5 w-50">
                  <InputGroup>
                    <InputGroup.Checkbox
                      aria-label="Checkbox for following text input"
                      checked={filtroProvincia}
                      onChange={handleCheckProvincia}
                    />
                    <Form.Control
                      aria-label="Text input with checkbox"
                      placeholder="filtra per Provincia"
                      value={provincia}
                      onChange={handleChangeProvincia}
                    />
                  </InputGroup>
                </div>
                <div className="d-flex col col-5 w-50">
                  <InputGroup>
                    <InputGroup.Checkbox
                      aria-label="Checkbox for following text input"
                      checked={filtroIndirizzo}
                      onChange={handleCheckIndirizzo}
                    />
                    <Form.Control
                      aria-label="Text input with checkbox"
                      placeholder="filtra per Indirizzo"
                      value={indirizzo}
                      onChange={handleChangeIndirizzo}
                    />
                  </InputGroup>
                </div>
                <div className="d-flex col col-5 w-50">
                  <InputGroup>
                    <InputGroup.Checkbox
                      aria-label="Checkbox for following text input"
                      checked={filtroTipologia}
                      onChange={handleCheckTipologia}
                    />
                    {/* <Form.Control
                    aria-label="Text input with checkbox"
                    placeholder="filtra per Tipologia"
                  />*/}
                    <Form.Select
                      aria-label="Default select example"
                      placeholder="filtra per Tipologia"
                      value={tipologia}
                      onChange={handleChangeTipologia}
                      disabled={!filtroTipologia}
                    >
                      <option value="_">_</option>
                      <option value="ENTITÀ_URBANA">Entità Urbana</option>
                      <option value="DESTINAZIONE_SPECIALE">
                        Destinazione Speciale
                      </option>
                      <option value="DESTINAZIONE_PARTICOLARE">
                        Destinazione Particolare
                      </option>
                    </Form.Select>
                  </InputGroup>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-1  d-flex justify-content-around mt-2 ">
            <div className="p-2 mb-1 border border-1 bprder-azzurroPolvere bg-bluGuado ">
              <h5 className="m-0 text-sabbia ">Seleziona un Immobile</h5>
            </div>
            {idImmoSel > 0 && (
              <Button
                variant="success"
                className="my-1"
                onClick={() => {
                  navigate("/immobili/" + idImmoSel);
                }}
              >
                Apri Scheda <i className="bi bi-box-arrow-up-right"></i>
              </Button>
            )}
          </div>
        </div>
      </Row>

      <Container
        style={{ marginTop: " 9em" }}
        className="bg-polvereScuro containerImmobili border border-2 border-beige"
      >
        {immobili.map((i) => {
          return (
            <Row
              className={idImmoSel === i.id && "border border-3 border-success"}
              key={i.id}
              style={{ cursor: "pointer" }}
              onClick={() => {
                setIdImmoSel(i.id);
              }}
            >
              <Col
                xs={6}
                md={3}
                lg={3}
                className="d-flex flex-column justify-content-center align-items-center border  border-1"
              >
                <p className="  fw-semibold m-1 mb-0 ">
                  <span style={{ fontSize: "0.8em" }}>{i.macroTipologia}</span>
                </p>
                <Image
                  className="mb-1"
                  src={getImage(i)}
                  thumbnail
                  style={{ height: "3.5em" }}
                />
              </Col>
              <Col
                xs={6}
                md={3}
                lg={4}
                className=" d-flex flex-column justify-content-start  border  border-1"
              >
                <div>
                  <h5 className="  fw-semibold mb-0">Descrizione:</h5>
                  <div className=" " id="descrizioneImmobile">
                    <p>{i.descrizione}</p>
                  </div>
                </div>
              </Col>
              <Col
                xs={6}
                md={3}
                lg={3}
                className="d-flex flex-column justify-content-center border  border-1"
              >
                <p className="  fw-semibold m-1">
                  Prezzo: € <span>{i.prezzo}</span>{" "}
                </p>

                <p className=" fw-semibold m-1">
                  Comune:{" "}
                  <span>
                    {i.comune.denominazione +
                      " (" +
                      i.comune.provincia.sigla +
                      ")"}{" "}
                  </span>
                </p>
              </Col>
              <Col
                xs={6}
                md={3}
                lg={2}
                className="d-flex flex-column justify-content-center border  border-1"
              >
                <p className="  fw-semibold m-1">
                  Locali: <span>{i.locali}</span>{" "}
                </p>

                <p className=" fw-semibold m-1">
                  mq: <span>{i.superficie} </span>
                </p>
              </Col>
            </Row>
          );
        })}
        <Row className="my-3">
          <Col xs={4} md={3} lg={2} className="d-flex justify-content-start">
            {!firstPage && (
              <Button
                className="rounded-start-5"
                variant="primary"
                onClick={() => {
                  if (firstPage) {
                    return;
                  }
                  let prev = page - 1;
                  setPage(prev);
                }}
              >
                <i className="bi bi-chevron-left "></i>
              </Button>
            )}
          </Col>
          <Col xs={4} md={6} lg={8}></Col>
          <Col xs={4} md={3} lg={2} className="d-flex justify-content-end">
            {!lastPage && (
              <Button
                className=" rounded-end-5"
                variant="primary"
                onClick={() => {
                  if (lastPage) {
                    return;
                  }
                  let next = page + 1;
                  setPage(next);
                }}
              >
                <i className="bi bi-chevron-right "></i>
              </Button>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ElencoImmobili;

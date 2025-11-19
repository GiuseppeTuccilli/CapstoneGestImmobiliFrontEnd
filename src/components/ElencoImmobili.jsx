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
          throw new Error(res.status.valueOf);
        }
      })
      .then((data) => {
        setImmobili(data.content);
        setPage(data.number);
        setFirstPage(data.first);
        setLastPage(data.last);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    getImmobili();
  }, [comune, provincia, indirizzo, tipologia, token]);

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
    }
  };

  const handleChangeProvincia = (e) => {
    if (filtroProvincia) {
      setProvincia(e.target.value);
    }
  };

  const handleChangeIndirizzo = (e) => {
    if (filtroIndirizzo) {
      setIndirizzo(e.target.value);
    }
  };

  const handleChangeTipologia = (e) => {
    if (filtroTipologia) {
      setTipologia(e.target.value);
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
        <div className="bg-polvereScuro m-0, py-2 px-3 position-fixed d-flex">
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
      </Row>
      <Container fluid style={{ marginTop: "6em" }}>
        {immobili.map((i) => {
          return (
            <Row
              className="py-1 border-top border-bottom border-3 border-black "
              key={i.id}
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
                  style={{ height: "5em" }}
                />
              </Col>
              <Col
                xs={6}
                md={3}
                lg={4}
                className=" d-flex flex-column justify-content-center  border  border-1"
              >
                <div>
                  <h5 className="  fw-semibold mb-0">Descrizione:</h5>
                  <div className=" " style={{ height: "80%" }}>
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
                <p className="  fw-semibold m-1">
                  Superficie: <span>{i.superficie + " mq"}</span>
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
                className="d-flex justify-content-center  border  border-1 "
              >
                <div className="d-flex flex-column justify-content-center ">
                  <Button
                    className="my-1"
                    onClick={() => {
                      navigate("/immobili/" + i.id);
                    }}
                  >
                    Dettagli
                  </Button>
                  <Button
                    className="my-1 bg-success "
                    onClick={() => {
                      navigate(`/immobili/${i.id}/nuovaVisita`);
                    }}
                  >
                    Nuova Visita
                  </Button>
                </div>
              </Col>
            </Row>
          );
        })}
        <Row className="my-3">
          <Col xs={4} md={3} lg={2} className="d-flex justify-content-start">
            {!firstPage && (
              <Button
                variant="primary"
                onClick={() => {
                  if (firstPage) {
                    return;
                  }
                  let prev = page - 1;
                  setPage(prev);
                }}
              >
                <i className="bi bi-chevron-left"></i>
              </Button>
            )}
          </Col>
          <Col xs={4} md={6} lg={8}></Col>
          <Col xs={4} md={3} lg={2} className="d-flex justify-content-end">
            {!lastPage && (
              <Button
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

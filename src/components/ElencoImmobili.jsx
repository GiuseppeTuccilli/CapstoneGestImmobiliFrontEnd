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

  const getImmobili = () => {
    fetch(
      base +
        "/immobili?provincia=" +
        provincia +
        "&comune=" +
        comune +
        "&indirizzo=" +
        indirizzo,
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
      })
      .catch((er) => {
        console.log(er);
      });
  };

  useEffect(() => {
    if (!token) {
      return;
    }
    getImmobili();
  }, [comune, provincia, indirizzo]);

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
      setTipologia("_");
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
        <div className="bg-polvereScuro m-0, py-1 position-fixed d-flex">
          <div className="col-4 d-flex justify-content-end align-items-center">
            <h2 className="text-center m-0">Elenco Immobili</h2>
          </div>
          <div className="col-8">
            <div className="row  justify-content-center g-2">
              <div className="d-flex col col-5">
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
              <div className="d-flex col col-5">
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
              <div className="d-flex col col-5">
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
              <div className="d-flex col col-5">
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
        {immobili
          .filter((im) => {
            return im.macroTipologia.includes(tipologia);
          })
          .map((i) => {
            return (
              <Row className="py-1 border-top border-bottom border-3 border-black">
                <Col
                  xs={6}
                  md={2}
                  lg={2}
                  className="d-flex justify-content-center align-items-center border  border-1"
                >
                  <Image
                    src={getImage(i)}
                    thumbnail
                    style={{ height: "10em" }}
                  />
                </Col>
                <Col
                  xs={6}
                  md={4}
                  lg={6}
                  className=" d-flex flex-column justify-content-start  border  border-1"
                >
                  <div className="h-100">
                    <h5 className="  fw-semibold mb-0">Descrizione:</h5>
                    <div
                      className="border border-1 border-black bg-beigeChiaro p-1"
                      style={{ height: "80%" }}
                    >
                      <p>{i.descrizione}</p>
                    </div>
                  </div>
                </Col>
                <Col
                  xs={6}
                  md={3}
                  lg={2}
                  className="d-flex flex-column justify-content-center border  border-1"
                >
                  <p className="  fw-semibold">
                    Tipologia: <span>{i.macroTipologia}</span>
                  </p>
                  <p className="  fw-semibold">
                    Prezzo: € <span>{i.prezzo}</span>{" "}
                  </p>
                  <p className="  fw-semibold">
                    Superficie: <span>{i.superficie + " mq"}</span>
                  </p>
                  <p className=" fw-semibold">
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
                  <div className="d-flex flex-column px-4  ">
                    <Button className="my-1">Richieste Inerenti</Button>
                    <Button className="my-1">Visite</Button>
                    <Button className="my-1">Dettagli</Button>
                    <Button className="my-1 bg-success ">Nuova Visita</Button>
                  </div>
                </Col>
              </Row>
            );
          })}
      </Container>
    </>
  );
}

export default ElencoImmobili;

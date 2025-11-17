import { Container, Row, Col, Image, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import base from "../variabili";
import { Modal, Alert } from "react-bootstrap/";
import { useParams, useNavigate } from "react-router-dom";

function DettagliImmobile() {
  const [token, setToken] = useState(
    localStorage.getItem("token").slice(1, -1)
  );

  //dati immobile
  const [tipo, setTipo] = useState("");
  const [desc, setDesc] = useState("");
  const [indirizzo, setIndirizzo] = useState("");
  const [comune, setComune] = useState("");
  const [prezzo, setPrezzo] = useState(0);
  const [superficie, setSuperficie] = useState(0);
  const [locali, setLocali] = useState(0);
  const [vani, setVani] = useState(0);
  const [cantina, setCantina] = useState(false);
  const [ascensore, setAscensore] = useState(false);
  const [auto, setAuto] = useState(false);
  const [giardino, setGiardino] = useState(false);
  const [terrazzo, setTerrazzo] = useState(false);
  const [arredato, setArredato] = useState(false);
  const [listaFoto, setListaFoto] = useState([]);
  //----------------------------
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingFoto, setLoadingFoto] = useState(true);
  const [ruolo, setRuolo] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  const getImmobile = () => {
    fetch(base + "/immobili/" + params.idImmobile, {
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
        let arStr = data.macroTipologia.split("_");
        let tipo = arStr[0] + " " + arStr[1];
        setTipo(tipo);
        setPrezzo(data.prezzo);
        setSuperficie(data.superficie);
        setLocali(data.locali);
        setVani(data.vani);
        setDesc(data.descrizione);
        setCantina(data.cantina);
        setAscensore(data.ascensore);
        setAuto(data.postoAuto);
        setGiardino(data.giardinoPrivato);
        setTerrazzo(data.terrazzo);
        setArredato(data.arredato);
        setIndirizzo(data.indirizzo);
        let strComune =
          data.comune.denominazione + " (" + data.comune.provincia.sigla + ")";
        setComune(strComune);
        setLoading(false);
        setError(false);
      })
      .catch((er) => {
        setError(true);
        setLoading(false);
        console.log(er.toString());
      });
  };

  const getFotoImmobile = () => {
    fetch(base + "/immobili/" + params.idImmobile + "/foto", {
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
        setListaFoto(data);
        setLoadingFoto(false);
      })
      .catch((er) => {
        console.log(er.toString());
        setLoadingFoto(false);
        setError(true);
      });
  };

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

  const cancellaImmobile = () => {
    fetch(base + "/immobili/" + params.idImmobile, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.ok) {
          alert("immobile eliminato");
        } else {
          throw new Error(res.status);
        }
      })
      .catch((er) => {
        alert(er.toString());
      });
  };

  /*
  da fare:
  - fetch aggiungi foto
  - tech elimina foto
  -logica scorrimento foto
  - collegare buttons
  */

  useEffect(() => {
    getImmobile();
    getFotoImmobile();
    getMe();
  }, [token, params.idImmobile]);

  return (
    <>
      <Container>
        <Row>
          <div className="d-flex flex-row justify-content-around p-3 border border-2 border-beige bg-polvereScuro align-items-center">
            <div>
              <Button
                variant="primary"
                onClick={() => {
                  navigate("/immobili");
                }}
              >
                <i className="bi bi-arrow-bar-left"></i>
              </Button>
            </div>
            <div className="p-2 border border-1 border-bluGuado bg-beige">
              <h2 className="m-0">{tipo}</h2>
            </div>
            {ruolo === "ADMIN" && (
              <div>
                <Button variant="danger">
                  <i className="bi bi-trash3-fill"></i>
                </Button>
                <Button variant="primary">
                  <i className="bi bi-pencil-fill"></i>
                </Button>
              </div>
            )}
          </div>
        </Row>
        <Row className="d-flex justify-content-center p-1 border border-1 border-beige bg-bluGuado">
          <Col xs={12} md={8}>
            {" "}
            <div className="d-flex justify-content-between">
              <Button variant="primary">
                Richieste <i className="bi bi-check2-all"></i>
              </Button>
              <Button variant="primary">Visite</Button>
              <Button
                variant="success"
                onClick={() => {
                  navigate("/immobili/" + params.idImmobile + "/nuovaVisita");
                }}
              >
                + Visita
              </Button>
            </div>
          </Col>
        </Row>

        <Row>
          <Col
            xs={12}
            md={6}
            lg={4}
            className="border border-2 border-beige bg-polvereScuro p-3"
          >
            <Row className="d-flex">
              <Col className="pe-0">
                <p className="m-0 p-0 fw-semibold border-bottom border-1 border-bianchetto">
                  Prezzo (€):
                </p>
                <p className="m-0 p-0 fw-semibold border-bottom border-1 border-bianchetto">
                  Superficie (mq):
                </p>
                <p className="m-0 p-0 fw-semibold border-bottom border-1 border-bianchetto">
                  Locali:
                </p>
                <p className="m-0 p-0 fw-semibold border-bottom border-1 border-bianchetto">
                  Vani:
                </p>
              </Col>
              <Col className="ps-0">
                <p className="m-0 fw-bold border-bottom border-1 border-bianchetto">
                  {prezzo}
                </p>
                <p className="m-0 fw-bold border-bottom border-1 border-bianchetto">
                  {superficie}
                </p>
                <p className="m-0 fw-bold border-bottom border-1 border-bianchetto">
                  {locali}
                </p>
                <p className="m-0 fw-bold border-bottom border-1 border-bianchetto">
                  {vani}
                </p>
              </Col>
            </Row>
          </Col>
          <Col
            xs={12}
            md={6}
            lg={4}
            className="border border-2 border-beige bg-polvereScuro p-3"
          >
            <h4 className="m-0 mb-1 p-2 border- border-1 border-bluGuado bg-beige text-center">
              Accessori
            </h4>
            <Row>
              <Col>
                <p
                  className="m-0 p-0 fw-semibold text-center "
                  style={
                    cantina
                      ? { border: "2px solid green" }
                      : {
                          textDecoration: "line-through",
                          textDecorationColor: "red",
                        }
                  }
                >
                  Cantina
                </p>
                <p
                  className="m-0 p-0 fw-semibold text-center "
                  style={
                    ascensore
                      ? { border: "2px solid green" }
                      : {
                          textDecoration: "line-through",
                          textDecorationColor: "red",
                        }
                  }
                >
                  Ascensore
                </p>
                <p
                  className="m-0 p-0 fw-semibold text-center "
                  style={
                    auto
                      ? { border: "2px solid green" }
                      : {
                          textDecoration: "line-through",
                          textDecorationColor: "red",
                        }
                  }
                >
                  Posto Auto
                </p>
              </Col>
              <Col>
                <p
                  className="m-0 p-0 fw-semibold text-center "
                  style={
                    giardino
                      ? { border: "2px solid green" }
                      : {
                          textDecoration: "line-through",
                          textDecorationColor: "red",
                        }
                  }
                >
                  Giardino
                </p>
                <p
                  className="m-0 p-0 fw-semibold text-center "
                  style={
                    terrazzo
                      ? { border: "2px solid green" }
                      : {
                          textDecoration: "line-through",
                          textDecorationColor: "red",
                        }
                  }
                >
                  Terrazzo
                </p>
                <p
                  className="m-0 p-0 fw-semibold text-center "
                  style={
                    arredato
                      ? { border: "2px solid green" }
                      : {
                          textDecoration: "line-through",
                          textDecorationColor: "red",
                        }
                  }
                >
                  Arredato
                </p>
              </Col>
            </Row>
          </Col>
          <Col
            xs={12}
            md={12}
            lg={4}
            className="border border-2 border-beige bg-polvereScuro p-3 d-flex flex-column justify-content-around"
          >
            <p className="m-0 p-0 fw-semibold ">
              Comune: <span className="fw-bold">{comune}</span>
            </p>
            <p className="m-0 p-0 fw-semibold ">
              Indirizzo: <span className="fw-bold">{indirizzo}</span>
            </p>
          </Col>
          <Col
            xs={12}
            className="border border-2 border-beige bg-polvereScuro p-3"
          >
            <h5 className="m-0 mb-1 p-2 border- border-1 border-bluGuado bg-beige text-center">
              Descrizione:
            </h5>
            <div className="p-2 border border-1 border-bluGuado bg-bianchetto">
              <p className="m-0 p-0  ">{desc}</p>
            </div>
          </Col>
        </Row>
        <Row>
          <div className="d-flex justify-content-around p-2 border border-2 border-beige bg-bluGuado">
            {ruolo === "ADMIN" && (
              <Button variant="danger">
                <i className="bi bi-trash3-fill"></i>
              </Button>
            )}
            <h5 className="m-0  p-2 border- border-1 border-bluGuado bg-beige text-center">
              Foto:
            </h5>
            {ruolo === "ADMIN" && (
              <Button variant="success">
                <i className="bi bi-plus-circle"></i>
              </Button>
            )}
          </div>
        </Row>
        <Row className=" p-2 border border-2 border-beige bg-polvereScuro mb-3">
          {listaFoto.length > 0 ? (
            <div className="d-flex justify-content-center">
              <Button variant="primary">
                <i className="bi bi-chevron-double-left"></i>
              </Button>

              <div style={{ maxWidth: "70%" }}>
                <img
                  id="fotoImmobile"
                  src={listaFoto[0].urlFoto}
                  className="img-fluid"
                  alt="fotoImmobile"
                ></img>
              </div>
              <Button variant="primary">
                <i className="bi bi-chevron-double-right"></i>
              </Button>
            </div>
          ) : (
            <h6 className="m-0  p-2 border- border-1 border-bluGuado bg-beige text-center">
              Non ci sono foto per questo immobile
            </h6>
          )}
        </Row>
      </Container>
    </>
  );
}

export default DettagliImmobile;

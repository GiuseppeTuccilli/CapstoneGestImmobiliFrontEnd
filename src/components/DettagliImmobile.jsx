import { Container, Row, Col, Image, Spinner, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import base from "../variabili";
import { Modal, Alert } from "react-bootstrap/";
import { useParams, useNavigate } from "react-router-dom";
import RichiesteCompatibili from "./RichiesteCompatibili";
import VisiteImmobile from "./VisiteImmobile";

function DettagliImmobile() {
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
  const [salvInCorso, setSalvInCorso] = useState(false);
  const [ruolo, setRuolo] = useState("");
  const [showConferma, setShowConferma] = useState(false);
  const [showElimina, setShowElimina] = useState(false);
  const [showEliminaImmo, setShowEliminaImmo] = useState(false);
  const [showRichieste, setShowRichieste] = useState(false);
  const [showVisite, setShowVisite] = useState(false);
  const [file, setFile] = useState(null);
  const [fotoIndex, setFotoIndex] = useState(0);
  const [fotoId, setFotoId] = useState(0);

  const params = useParams();
  const navigate = useNavigate();

  const handleClose = () => setShowConferma(false);
  const handleShow = () => setShowConferma(true);

  const handleCloseElimina = () => setShowElimina(false);
  const handleShowElimina = () => setShowElimina(true);

  const handleCloseEliminaImmo = () => setShowEliminaImmo(false);
  const handleShowEliminaImmo = () => setShowEliminaImmo(true);

  const getImmobile = (token) => {
    fetch(base + "/immobili/" + params.idImmobile, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.ok) {
          console.log(res);
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

  const getFotoImmobile = (token) => {
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
        setFotoIndex(0);
        setFotoId(data[0].idFoto);
        setLoadingFoto(false);
      })
      .catch((er) => {
        console.log(er.toString());
        setLoadingFoto(false);
      });
  };

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

  const cancellaImmobile = (token) => {
    fetch(base + "/immobili/" + params.idImmobile, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.ok) {
          alert("immobile eliminato");
          navigate("/immobili");
        } else {
          throw new Error(res.status);
        }
      })
      .catch((er) => {
        alert("errore " + er.toString());
      });
  };

  const aggiungiFoto = (token) => {
    setSalvInCorso(true);
    const formData = new FormData();
    formData.append("foto", file);
    fetch(base + "/immobili/" + params.idImmobile + "/foto", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.ok) {
          console.log(res);
        } else {
          console.log(res);
          throw new Error(res.status);
        }
      })
      .then((data) => {
        console.log(data);
        setSalvInCorso(false);
        alert("foto aggiunta");
        setFile(null);
        window.location.reload();
      })
      .catch((er) => {
        setSalvInCorso(false);
        console.log(er.toString());
      });
  };

  const cancellaFoto = (token) => {
    fetch(base + "/immobili/" + params.idImmobile + "/foto/" + fotoId, {
      method: "DELETE",

      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.ok) {
          alert("foto eliminata");
          window.location.reload();
        } else {
          throw new Error(res.status);
        }
      })
      .catch((er) => {
        console.log(er.toString());
        alert("errore nell'eliminazione");
      });
  };

  const prevFoto = () => {
    if (listaFoto.length > 1) {
      let i = fotoIndex;
      let l = listaFoto.length - 1;
      if (i <= 0) {
        setFotoIndex(l);
        setFotoId(listaFoto[l].idFoto);
      } else {
        setFotoIndex(i - 1);
        setFotoId(listaFoto[i - 1].idFoto);
      }
    }
  };

  const nextFoto = () => {
    if (listaFoto.length > 1) {
      let i = fotoIndex;
      let l = listaFoto.length - 1;
      if (i <= l - 1) {
        setFotoIndex(i + 1);
        setFotoId(listaFoto[i + 1].idFoto);
      } else {
        setFotoIndex(0);
        setFotoId(listaFoto[0].idFoto);
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/login");
    } else {
      let tok = localStorage.getItem("token").slice(1, -1);
      getImmobile(tok);
      getFotoImmobile(tok);
      getMe(tok);
    }
  }, [params.idImmobile]);

  return (
    <>
      {/*modale conferma */}
      <Modal show={showConferma} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Foto</Modal.Title>
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
                alert("errore nel token, effettua il login");
                navigate("/login");
              } else {
                let tok = localStorage.getItem("token").slice(1, -1);
                aggiungiFoto(tok);
              }
            }}
          >
            Salva
          </Button>
        </Modal.Footer>
      </Modal>
      {/*modale elimina */}
      <Modal show={showElimina} onHide={handleCloseElimina}>
        <Modal.Header closeButton>
          <Modal.Title>Elimina Foto</Modal.Title>
        </Modal.Header>
        <Modal.Body>Eliminare definitivamente questa foto?</Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseElimina}>Annulla</Button>
          <Button
            variant="danger"
            onClick={() => {
              handleCloseElimina();
              if (localStorage.getItem("token") === null) {
                alert("errore nel token, effettua il login");
                navigate("/login");
              } else {
                let tok = localStorage.getItem("token").slice(1, -1);
                cancellaFoto(tok);
              }
            }}
          >
            Elimina
          </Button>
        </Modal.Footer>
      </Modal>
      {/*modale elimina immobile */}
      <Modal show={showEliminaImmo} onHide={handleCloseEliminaImmo}>
        <Modal.Header closeButton>
          <Modal.Title>Cancellazione Immobile</Modal.Title>
        </Modal.Header>
        <Modal.Body>Eliminare definitivamente questo Immobile?</Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseEliminaImmo}>Annulla</Button>
          <Button
            variant="danger"
            onClick={() => {
              handleCloseEliminaImmo();
              if (localStorage.getItem("token") === null) {
                alert("errore nel token, effettua il login");
                navigate("/login");
              } else {
                let tok = localStorage.getItem("token").slice(1, -1);
                cancellaImmobile(tok);
              }
            }}
          >
            Elimina
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
      <Container>
        <Row>
          <div className="d-flex flex-row justify-content-around p-3 border border-2 border-sabbia bg-polvereScuro align-items-center">
            <div className="p-2 border border-1 border-bluGuado bg-sabbia">
              <h2 className="m-0">{tipo}</h2>
            </div>
            {ruolo === "ADMIN" && (
              <div>
                <Button variant="danger" onClick={handleShowEliminaImmo}>
                  Elimina <i className="bi bi-trash3-fill"></i>
                </Button>
              </div>
            )}
          </div>
        </Row>
        {error ? (
          <Alert variant="danger" className="text-center">
            Errore nel recupero dati
          </Alert>
        ) : (
          <Row className="d-flex justify-content-center p-1 border border-1 border-sabbia bg-bluGuado">
            <Col xs={12} md={8}>
              {" "}
              <div className="d-flex justify-content-between">
                <Button
                  variant="primary"
                  onClick={() => {
                    if (showRichieste) {
                      setShowRichieste(false);
                    } else {
                      setShowRichieste(true);
                      setShowVisite(false);
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
                    } else {
                      setShowRichieste(false);
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
                    navigate("/immobili/" + params.idImmobile + "/nuovaVisita");
                  }}
                >
                  + Visita
                </Button>
              </div>
            </Col>
          </Row>
        )}

        <Row>
          {loading ? (
            <div className="text-center">
              <Spinner />
            </div>
          ) : (
            <>
              <Col
                xs={12}
                md={6}
                lg={4}
                className="border border-2 border-sabbia bg-polvereScuro p-3"
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
                className="border border-2 border-sabbia bg-polvereScuro p-3"
              >
                <h4 className="m-0 mb-1 p-2 border- border-1 border-bluGuado bg-sabbia text-center">
                  Accessori
                </h4>
                <Row>
                  <Col>
                    <p
                      className={
                        "m-0 p-0 fw-semibold text-center" +
                        (cantina ? " posseduto" : " nonPosseduto")
                      }
                    >
                      Cantina
                    </p>
                    <p
                      className={
                        "m-0 p-0 fw-semibold text-center" +
                        (ascensore ? " posseduto " : " nonPosseduto")
                      }
                    >
                      Ascensore
                    </p>
                    <p
                      className={
                        "m-0 p-0 fw-semibold text-center" +
                        (auto ? " posseduto " : " nonPosseduto")
                      }
                    >
                      Posto Auto
                    </p>
                  </Col>
                  <Col>
                    <p
                      className={
                        "m-0 p-0 fw-semibold text-center" +
                        (giardino ? " posseduto " : " nonPosseduto")
                      }
                    >
                      Giardino
                    </p>
                    <p
                      className={
                        "m-0 p-0 fw-semibold text-center" +
                        (terrazzo ? " posseduto " : " nonPosseduto")
                      }
                    >
                      Terrazzo
                    </p>
                    <p
                      className={
                        "m-0 p-0 fw-semibold text-center" +
                        (arredato ? " posseduto " : " nonPosseduto")
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
                className="border border-2 border-sabbia bg-polvereScuro p-3 d-flex flex-column justify-content-around"
              >
                <p className="m-0 p-0 fw-semibold ">
                  Comune: <span className="fw-bold">{comune}</span>
                </p>
                <p className="m-0 p-0 fw-semibold ">
                  Indirizzo: <span className="fw-bold">{indirizzo}</span>
                </p>
              </Col>
              {/* richieste compatibili */}
              <Col xs={12} className={!showRichieste && "d-none"}>
                <Row className={!showRichieste && "d-none"}>
                  <RichiesteCompatibili
                    idImmo={params.idImmobile}
                    base={base}
                  />
                </Row>
              </Col>
              {/*visite */}
              <Col xs={12} className={!showVisite && "d-none"}>
                <Row>
                  <VisiteImmobile idImmo={params.idImmobile} base={base} />
                </Row>
              </Col>
              <Col
                xs={12}
                className="border border-2 border-sabbia bg-polvereScuro p-3"
              >
                <h5 className="m-0 mb-1 p-2 border- border-1 border-bluGuado bg-sabbia text-center">
                  Descrizione:
                </h5>
                <div
                  id="descDettagliImmobile"
                  className="p-2 border border-1 border-bluGuado bg-bianchetto"
                >
                  <p className="m-0 p-0  ">{desc}</p>
                </div>
              </Col>
            </>
          )}
        </Row>

        <Row>
          <div className="d-flex justify-content-around p-2 border border-2 border-sabbia bg-bluGuado">
            {ruolo === "ADMIN" && (
              <Button variant="danger" onClick={handleShowElimina}>
                <i className="bi bi-trash3-fill"></i>
              </Button>
            )}
            <h5 className="m-0  p-2 border- border-1 border-bluGuado bg-sabbia text-center">
              Foto:
            </h5>
            {ruolo === "ADMIN" && (
              <>
                <Form
                  className="d-flex align-items-center"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (file !== null) {
                      handleShow();
                    }
                  }}
                >
                  <p className="m-0 p-1 text-end fw-semibold  border border-1 border-beide bg-azzurroPolvere pe-2 border-end-0 sizePiccola">
                    Aggiungi Foto:{" "}
                  </p>
                  <Form.Group controlId="formFile" className=" rounded-0 ">
                    <Form.Control
                      className=" rounded-0 h-100"
                      type="file"
                      name="foto"
                      accept="image/*"
                      onChange={(e) => {
                        const f = e.target.files[0];
                        if (f && f.size > 1048576) {
                          alert("il file selezionato è troppo grande");
                          return;
                        }
                        let estAr = f.name.split(".");
                        let est = estAr[estAr.length - 1];
                        console.log(est);
                        if (est == "png" || est == "jpg" || est == "jepg") {
                          setFile(f);
                          return;
                        } else {
                          alert("formato non valido");
                        }
                      }}
                    />
                  </Form.Group>
                  <Button variant="success" type="submit">
                    <i className="bi bi-cloud-upload"></i>
                  </Button>
                </Form>
              </>
            )}
          </div>
        </Row>
        {loadingFoto ? (
          <div className="text-center">
            <Spinner />
          </div>
        ) : (
          <Row className=" p-2 border border-2 border-sabbia bg-polvereScuro mb-3">
            {listaFoto.length > 0 ? (
              <div className="d-flex justify-content-center">
                <Button
                  variant="primary"
                  onClick={prevFoto}
                  className="rounded-start-4"
                >
                  <i className="bi bi-chevron-double-left"></i>
                </Button>

                <div id="divFotoImmobile">
                  <img
                    id="fotoImmobile"
                    src={listaFoto[fotoIndex].urlFoto}
                    className="img-fluid"
                    alt="fotoImmobile"
                  ></img>
                </div>
                <Button
                  variant="primary"
                  onClick={nextFoto}
                  className="rounded-end-4"
                >
                  <i className="bi bi-chevron-double-right"></i>
                </Button>
              </div>
            ) : (
              <h6 className="m-0  p-2 border- border-1 border-bluGuado bg-sabbia text-center">
                Non ci sono foto per questo immobile
              </h6>
            )}
          </Row>
        )}
      </Container>
    </>
  );
}

export default DettagliImmobile;

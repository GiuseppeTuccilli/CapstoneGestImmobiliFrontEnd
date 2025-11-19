import { useRef, useState, useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import base from "../variabili";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

function NuovaVisita() {
  const [token, setToken] = useState(
    localStorage.getItem("token").slice(1, -1)
  );
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [data, setData] = useState("");
  const [giorno, setGiorno] = useState("");
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [page, setPage] = useState(0);
  const [firstPage, setFirstPage] = useState(true);
  const [lastPage, setLastPage] = useState(false);
  const [nomeSelected, setNomeSelected] = useState("");
  const [cognomeSelected, setCognomeSelected] = useState("");

  const [indImmobile, setIndImmobile] = useState("");
  const [tipoImmobile, setTipoImmobile] = useState("");
  const [comuneImm, setComuneImm] = useState("");
  const [provImm, setProvImm] = useState("");

  const [clienti, setClienti] = useState([]);
  const [idSelected, setIdSelected] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [loadImm, setLoadImm] = useState(true);
  const [errImm, setErrImm] = useState(false);

  const [errSalv, setErrSalv] = useState(false);

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
      .then((im) => {
        console.log(im);
        setIndImmobile(im.indirizzo);
        setTipoImmobile(im.macroTipologia);
        setComuneImm(im.comune.denominazione);
        setProvImm(im.comune.provincia.nomeProvincia);
        setLoadImm(false);
        setErrImm(false);
      })
      .catch((er) => {
        setErrImm(true);
        setLoadImm(false);
        console.log(er.toString());
      });
  };

  const getClienti = () => {
    fetch(
      base + "/clienti?nome=" + nome + "&cognome=" + cognome + "&page=" + page,
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
        setClienti(data.content);
        setPage(data.number);
        setFirstPage(data.first);
        setLastPage(data.last);
        setLoading(false);
        console.log(data);
      })
      .catch((er) => {
        setLoading(false);
        setError(true);
        console.log(er.toString());
      });
  };

  const salvaVisita = () => {
    fetch(base + "/visite", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.ok) {
          console.log(res);
          alert("visita salvata");
          navigate("/immobili");
        } else {
          throw new Error(res.status);
        }
      })
      .catch((er) => {
        setErrSalv(true);
        console.log(er.toString());
      });
  };

  useEffect(() => {
    getImmobile();
  }, []);

  useEffect(() => {
    getClienti();
  }, [nome, cognome, page]);

  const payload = {
    data: data,
    idImmobile: params.idImmobile,
    idCliente: idSelected,
  };

  return (
    <>
      {errSalv && <Alert variant="danger">Errore nel salvataggio</Alert>}
      <Container className="d-flex flex-column align-items-center bg-bluGuado">
        <Row className="d-flex justify-content-center  bg-secondary py-2">
          <Col xs={9} md={6} className="px-0 ps-2">
            <h2 className="text-center border border-1 border-azzurroPolvere p-3 bg-beige ">
              Nuova Visita
            </h2>
            <div className="d-flex justify-content-between border border-1 border-beige p-2 bg-polvereScuro">
              <div className="d-flex align-items-center">
                <div>
                  <h6>Seleziona la data</h6>
                  <input
                    value={data}
                    onChange={(e) => {
                      setData(e.target.value);
                    }}
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                  ></input>
                </div>
                <h5 className="m-0 ms-3 d-none d-lg-block">
                  Immobile <i className="bi bi-arrow-right-short"></i>
                </h5>
              </div>
              <div className="d-flex flex-column border border-1 border-beige p-1 bg-bianchetto">
                <div>
                  {tipoImmobile === "" ? (
                    <Spinner />
                  ) : (
                    <p className="m-0 fw-semibold">{tipoImmobile}</p>
                  )}
                </div>
                <div>
                  {indImmobile === "" ? (
                    <Spinner />
                  ) : (
                    <p className="m-0 fw-semibold">{indImmobile}</p>
                  )}
                </div>
                <div>
                  {comuneImm === "" ? (
                    <Spinner />
                  ) : (
                    <p className="m-0 fw-semibold">{comuneImm}</p>
                  )}
                </div>
              </div>
            </div>
          </Col>
          <Col
            xs={3}
            md={3}
            className="d-flex flex-column justify-content-around"
          >
            <div className="d-flex flex-column justify-content-around">
              <Button
                variant="success"
                onClick={() => {
                  if (data === "") {
                    alert("seleziona una data");
                    return;
                  }
                  if (idSelected === 0) {
                    alert("seleziona un cliente");
                    return;
                  }
                  salvaVisita();
                }}
              >
                Salva
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  navigate("/immobili");
                }}
              >
                Annulla
              </Button>
            </div>
            <div
              className="p-2 border border-1 border-sabbia bg-azzurroPolvere d-flex flex-column justify-content-center"
              style={{ height: "6em" }}
            >
              <h5 className="text-center">Cliente:</h5>
              <div className="d-flex justify-content-center p-2 border border-1 border-bluGuado bg-beigeChiaro">
                <p className="m-0 me-1 fw-semibold">{nomeSelected} </p>
                <p className="m-0 fw-semibold">{cognomeSelected}</p>
              </div>
            </div>
          </Col>
          <Col xs={12} md={9}>
            <h5 className="m-0 mt-2 text-light">
              Seleziona un cliente <i className="bi bi-arrow-bar-down"></i>
            </h5>
            <div className="d-flex mt-2 ">
              <Form.Control
                type="text"
                placeholder="Nome"
                className="mx-3"
                value={nome}
                onChange={(e) => {
                  setNome(e.target.value);
                }}
              />
              <Form.Control
                type="text"
                placeholder="Cognome"
                className="mx-3"
                value={cognome}
                onChange={(e) => {
                  setCognome(e.target.value);
                }}
              />
            </div>
          </Col>
        </Row>
        {/*row clienti */}
        <Row className=" w-100 justify-content-center">
          <Col style={{ height: "25em", overflowY: "auto" }} xs={12} md={9}>
            <Row>
              <Table striped bordered hover className="mb-0">
                <thead className="position-sticky" style={{ top: "-0.5%" }}>
                  <th colSpan={3}>
                    <div className="d-flex  justify-content-around p-3 border border-1 border-beige bg-polvereScuro">
                      <div>
                        <h4 className="m-0 p-2 border border-1 border-azzurroPolvere bg-beige">
                          Clienti
                        </h4>
                      </div>
                    </div>
                  </th>
                  <tr>
                    <th colSpan={2} className="text-center">
                      Cliente
                    </th>

                    <th className="text-center">Indirizzo</th>
                  </tr>
                </thead>

                <tbody>
                  {clienti.map((c) => {
                    return (
                      <tr
                        key={c.id}
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setIdSelected(c.id);
                          setNomeSelected(c.nome);
                          setCognomeSelected(c.cognome);
                        }}
                        className={
                          idSelected === c.id &&
                          "border border-2 border-success"
                        }
                      >
                        <td>{c.nome}</td>
                        <td>{c.cognome}</td>
                        <td>{c.indirizzo}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Row>
          </Col>
        </Row>
        {/*row scorrimento pages */}
        <Row className="mb-3">
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

        {/*row scorrimento pages */}
        <Row className="mb-3">
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

export default NuovaVisita;

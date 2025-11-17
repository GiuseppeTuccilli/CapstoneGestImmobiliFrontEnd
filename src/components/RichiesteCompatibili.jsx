import { use, useEffect, useState } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

function RichiesteCompatibili(props) {
  const [showImmobili, setShowImmobili] = useState(false);
  const [idRichiestaSel, setIdRichiestaSel] = useState(0);
  const [idImmoSel, setIdImmoSel] = useState(0);
  const [error, setError] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [richieste, setRichieste] = useState([]);
  const [immoCompatibili, setImmoCompatibili] = useState([]);

  let idImmo = props.idImmo;
  let base = props.base;
  let token = props.token;

  const navigate = useNavigate();

  const getRichiesteCompatibili = () => {
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

  const getImmoCompatibili = () => {
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
        setImmoCompatibili(data);
      })
      .catch((er) => {
        alert("errore recupero dati immobili " + er.toString());
      });
  };

  useEffect(() => {
    getRichiesteCompatibili();
  }, [token]);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }

    getImmoCompatibili();
  }, [idRichiestaSel]);

  return (
    <>
      <Container fluid>
        <Row className="p-3 border border-2 border-beige bg-bluGuado ">
          <Col xs={12} md={8}>
            <h6 className="m-0 p-2 border border-1 border-azzurroPolvere bg-beige text-center">
              Richieste Compatibili con questo Immobile
            </h6>
          </Col>
          <Col xs={12} md={4} className="d-flex justify-content-center py-1">
            {idRichiestaSel !== 0 && (
              <Button
                onClick={() => {
                  setShowImmobili(true);
                }}
              >
                Immobili Compatibili
              </Button>
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
                            setIdImmoSel(0);
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
                      {idImmoSel !== 0 && (
                        <Button
                          variant="success"
                          onClick={() => {
                            navigate("/immobili/" + idImmoSel);
                            window.location.reload();
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
                  {immoCompatibili.length > 0 &&
                    immoCompatibili.map((i) => {
                      return (
                        <tr
                          key={i.id}
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setIdImmoSel(i.id);
                          }}
                          className={
                            idImmoSel === i.id &&
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
      </Container>
    </>
  );
}

export default RichiesteCompatibili;

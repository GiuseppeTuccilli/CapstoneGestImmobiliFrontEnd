import { useEffect, useState } from "react";
import { Container, Row, Col, Image, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import base from "../variabili";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
function ElencoClienti() {
  const [token, setToken] = useState(
    localStorage.getItem("token").slice(1, -1)
  );
  const [clienti, setClienti] = useState([]);

  const [filtroNome, setFiltroNome] = useState(false);
  const [filtroCognome, setFiltroCognome] = useState(false);
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleCheckNome = (e) => {
    let val = e.target.checked;
    setFiltroNome(val);
    if (!val) {
      setNome("");
    }
  };

  const handleCheckCognome = (e) => {
    let val = e.target.checked;
    setFiltroCognome(val);
    if (!val) {
      setCognome("");
    }
  };

  const handleChangeNome = (e) => {
    if (filtroNome) {
      setNome(e.target.value);
    }
  };

  const handleChangeCognome = (e) => {
    if (filtroCognome) {
      setCognome(e.target.value);
    }
  };

  const getClienti = () => {
    fetch(base + "/clienti?nome=" + nome + "&cognome=" + cognome, {
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
        setClienti(data.content);
        setLoading(false);
        console.log(data);
      })
      .catch((er) => {
        setLoading(false);
        setError(true);
        console.log(er.toString());
      });
  };

  useEffect(() => {
    getClienti();
  }, [nome, cognome, token]);

  return (
    <>
      <Row className="d-flex justify-content-center">
        <div className="bg-polvereScuro m-0, py-2 px-3 position-fixed d-flex">
          <div className="col-6 d-flex  justify-content-between align-items-center px-3">
            <h2 className="d-none d-lg-block text-center m-0 p-3 border border-1 border-beige bg-sabbia">
              Clienti
            </h2>
            <h4 className="text-center m-0 p-3 border border-1 border-beige bg-sabbia">
              Filtri<i className="bi bi-funnel"></i>
            </h4>
          </div>
          <div className="col-6">
            <div className="row  justify-content-start g-2">
              <div className="d-flex col col-5 filtroCliente">
                <InputGroup>
                  <InputGroup.Checkbox
                    aria-label="Checkbox for following text input"
                    checked={filtroNome}
                    onChange={handleCheckNome}
                  />
                  <Form.Control
                    aria-label="Text input with checkbox"
                    placeholder="filtra per nome"
                    value={nome}
                    onChange={handleChangeNome}
                  />
                </InputGroup>
              </div>
              <div className="d-flex col col-5 filtroCliente">
                <InputGroup>
                  <InputGroup.Checkbox
                    aria-label="Checkbox for following text input"
                    checked={filtroCognome}
                    onChange={handleCheckCognome}
                  />
                  <Form.Control
                    aria-label="Text input with checkbox"
                    placeholder="filtra per cognome"
                    value={cognome}
                    onChange={handleChangeCognome}
                  />
                </InputGroup>
              </div>
            </div>
          </div>
        </div>
      </Row>
      <div>
        <Container fluid style={{ width: "80vw" }} id="contClienti">
          <Row className="bg-beige position-fixed  " style={{ width: "80vw" }}>
            <Col
              xs={6}
              md={3}
              className="border-top border-start border-end border-2 border-azzurroPolvere d-flex align-items-end p-1 justify-content-center"
            >
              <h4 className="m-0">Nome</h4>
            </Col>
            <Col
              xs={6}
              md={3}
              className="border-top border-start border-end border-2 border-azzurroPolvere d-flex align-items-end p-1 justify-content-center"
            >
              <h4 className="m-0">Cognome</h4>
            </Col>
            <Col xs={12} md={6}></Col>
          </Row>
          <div style={{ paddingTop: "2.8em" }}>
            {loading ? (
              <Spinner></Spinner>
            ) : (
              clienti.map((c) => {
                return (
                  <>
                    <Row className="border border-1 border-beige bg-polvereScuro">
                      <Col
                        xs={6}
                        md={3}
                        className="d-flex align-items-center justify-content-center p-2 border border-1 border-beige"
                      >
                        <p className="m-0 fw-semibold ">{c.nome}</p>
                      </Col>
                      <Col
                        xs={6}
                        md={3}
                        className="d-flex align-items-center justify-content-center p-2 border border-1 border-beige"
                      >
                        <p className="m-0 fw-semibold">{c.cognome}</p>
                      </Col>
                      <Col
                        xs={12}
                        md={6}
                        className="d-flex align-items-center justify-content-center p-2 border border-1 border-beige"
                      >
                        <div className="d-md-flex">
                          <Button variant="primary">Dettagli</Button>
                          <Button variant="primary">Visite</Button>
                          <Button variant="primary">Richieste</Button>
                          <Button variant="success">+ Richiesta</Button>
                        </div>
                      </Col>
                    </Row>
                  </>
                );
              })
            )}
          </div>
        </Container>
      </div>
    </>
  );
}

export default ElencoClienti;

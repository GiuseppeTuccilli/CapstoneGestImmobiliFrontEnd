import { useEffect, useState } from "react";
import { Container, Row, Col, Image, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import base from "../variabili";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useNavigate } from "react-router-dom";
function ElencoClienti() {
  const [token, setToken] = useState(
    localStorage.getItem("token").slice(1, -1)
  );
  const [clienti, setClienti] = useState([]);

  const [filtroNome, setFiltroNome] = useState(false);
  const [filtroCognome, setFiltroCognome] = useState(false);
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [idSel, setIdSel] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [firstPage, setFirstPage] = useState(true);
  const [lastPage, setLastPage] = useState(false);
  const [page, setPage] = useState(0);

  const navigate = useNavigate();

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
      setPage(0);
    }
  };

  const handleChangeCognome = (e) => {
    if (filtroCognome) {
      setCognome(e.target.value);
      setPage(0);
    }
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
        setLoading(false);
        setPage(data.number);
        setFirstPage(data.first);
        setLastPage(data.last);
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
  }, [nome, cognome, token, page]);

  return (
    <>
      <div>
        <Row className="d-flex justify-content-center position-fixed w-">
          <div className="bg-polvereScuro m-0, py-2 px-3  d-flex">
            <div className="col-6 d-flex  justify-content-end align-items-center px-3">
              <h2 className="d-none d-lg-block text-center m-0 me-5 p-3 border border-1 border-beige bg-sabbia">
                Clienti
              </h2>
              <h4 className="text-center m-0 p-3 flex-grow-1 ms-3 border border-1 border-beige bg-sabbia">
                Filtri<i className="bi bi-funnel"></i>
              </h4>
            </div>
            <div className="col-6 d-flex align-items-center">
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
          <Row className="bg-bluGuado ">
            <div className="d-flex justify-content-around p-2">
              <h4 className="m-0 text-beigeChiaro mt-1 border border-1 border-azzurroPolvere px-2">
                Seleziona un cliente
              </h4>
              {idSel > 0 && (
                <Button
                  variant="primary"
                  onClick={() => {
                    navigate("/clienti/" + idSel);
                  }}
                >
                  Apri Scheda <i className="bi bi-box-arrow-up-right"></i>
                </Button>
              )}
            </div>
          </Row>
          <Row className="bg-sabbia p-0" style={{ width: "80vw" }}>
            <Col
              xs={4}
              md={3}
              className="border-top border-start border-end border-2 border-azzurroPolvere d-flex align-items-end p-1 justify-content-center"
            >
              <h5 className="m-0">Nome</h5>
            </Col>
            <Col
              xs={4}
              md={3}
              className="border-top border-start border-end border-2 border-azzurroPolvere d-flex align-items-end p-1 justify-content-center"
            >
              <h5 className="m-0">Cognome</h5>
            </Col>
            <Col
              xs={4}
              md={3}
              className="border-top border-start border-end border-2 border-azzurroPolvere d-flex align-items-end p-1 justify-content-center"
            >
              <h5 className="m-0">Email</h5>
            </Col>
            <Col
              xs={3}
              className="d-none d-md-flex border-top border-start border-end border-2 border-azzurroPolvere d-flex align-items-end p-1 justify-content-center"
            >
              <h5 className="m-0">Indirizzo</h5>
            </Col>
          </Row>
        </Row>
      </div>
      <div>
        <Container fluid style={{ width: "80vw" }} id="contClienti">
          <div>
            {loading ? (
              <Spinner></Spinner>
            ) : (
              clienti.map((c) => {
                return (
                  <>
                    <Row
                      style={{ cursor: "pointer" }}
                      className={
                        "bg-bianchetto " +
                        (idSel === c.id && " border border-2 border-success")
                      }
                      key={c.id}
                      onClick={() => {
                        if (idSel === c.id) {
                          setIdSel(0);
                        } else {
                          setIdSel(c.id);
                        }
                      }}
                    >
                      <Col
                        xs={4}
                        md={3}
                        className="d-flex align-items-center justify-content-center p-2 border border-1 border-beige "
                      >
                        <p className="m-0 fw-semibold ">{c.nome}</p>
                      </Col>
                      <Col
                        xs={4}
                        md={3}
                        className="d-flex align-items-center justify-content-center p-2 border border-1 border-beige "
                      >
                        <p className="m-0 fw-semibold">{c.cognome}</p>
                      </Col>
                      <Col
                        xs={4}
                        md={3}
                        className=" p-2 border border-1 border-beige "
                        style={{ overflowX: "scroll" }}
                      >
                        <p className="m-0 " style={{ fontSize: "0.9em" }}>
                          {c.email}
                        </p>
                      </Col>
                      <Col
                        xs={3}
                        className="d-none d-md-flex p-2 border border-1 border-beige "
                        style={{ overflowX: "scroll" }}
                      >
                        <p className="m-0 " style={{ fontSize: "0.9em" }}>
                          {c.indirizzo}
                        </p>
                      </Col>
                    </Row>
                  </>
                );
              })
            )}
          </div>
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
                  <i className="bi bi-chevron-left"></i>
                </Button>
              )}
            </Col>
            <Col xs={4} md={6} lg={8}></Col>
            <Col xs={4} md={3} lg={2} className="d-flex justify-content-end">
              {!lastPage && (
                <Button
                  className="rounded-end-5"
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
      </div>
    </>
  );
}

export default ElencoClienti;

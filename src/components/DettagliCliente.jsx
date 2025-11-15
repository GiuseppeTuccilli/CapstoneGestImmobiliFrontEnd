import { Container, Row, Col, Image, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import base from "../variabili";

function DettagliCliente() {
  const [token, setToken] = useState(
    localStorage.getItem("token").slice(1, -1)
  );

  const [ruolo, setRuolo] = useState("");

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

  useEffect(() => {
    getMe();
  }, []);

  return (
    <>
      <Container>
        <Row className="d-flex justify-content-center border border-1 border-beige p-4 bg-polvereScuro">
          <Col xs={12} md={8}>
            <div className="d-flex justify-content-between">
              <div className="border border-1 border-beige p-3 bg-bianchetto">
                <h2>Cliente</h2>
              </div>
              {ruolo === "ADMIN" && (
                <div className="d-flex justify-content-between">
                  <Button variant="danger" className="px-4 h-75">
                    <i className="bi bi-trash3-fill"></i>
                  </Button>
                  <Button variant="primary" className="px-4 h-75">
                    <i class="bi bi-pencil-fill"></i>
                  </Button>
                </div>
              )}
            </div>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center border border-1 border-polvereScuro p-3 bg-bluGuado">
          <Col xs={6} md={3} className="px-3">
            <div className="p-1 border border-1 border-polvereScuro bg-beigeChiaro">
              <p className="mb-0">Nome</p>
              <h6>data</h6>
            </div>
            <div className="p-1 border border-1 border-polvereScuro bg-beigeChiaro">
              <p className="mb-0">Cognome</p>
              <h6>data</h6>
            </div>
          </Col>
          <Col xs={6} md={3} className="px-3">
            <div className="p-1 border border-1 border-polvereScuro bg-beigeChiaro">
              <p className="mb-0">Indirizzo</p>
              <h6>data</h6>
            </div>
            <div className="p-1 border border-1 border-polvereScuro bg-beigeChiaro">
              <p className="mb-0">Email</p>
              <h6>data</h6>
            </div>
          </Col>
          <Col xs={6} md={3} className="px-3">
            <div className="p-1 border border-1 border-polvereScuro bg-beigeChiaro">
              <p className="mb-0">Telefono</p>
              <h6>data</h6>
            </div>
          </Col>
          <Col xs={6} md={3} className="d-md-none"></Col>
        </Row>
        <Row className="d-flex justify-content-center border border-1 border-azzurroPolvere bg-polvereScuro p-3">
          <Col xs={12} md={6} className="d-flex justify-content-evenly">
            <Button variant="primary">Richieste</Button>
            <Button variant="primary">Visite</Button>
            <Button variant="success">+ Richiesta</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default DettagliCliente;

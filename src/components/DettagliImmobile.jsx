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

  return (
    <>
      <Container>
        <Row>
          <div className="d-flex flex-row justify-content-around p-3 border border-2 border-beige bg-polvereScuro align-items-center">
            <div>
              <Button variant="primary">
                <i className="bi bi-arrow-bar-left"></i>
              </Button>
            </div>
            <div className="p-2 border border-1 border-bluGuado bg-beige">
              <h2 className="m-0">DESTINAZIONE PARTICOLARE</h2>
            </div>
            <div>
              <Button variant="danger">
                <i className="bi bi-trash3-fill"></i>
              </Button>
              <Button variant="primary">
                <i className="bi bi-pencil-fill"></i>
              </Button>
            </div>
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
              <Button variant="success">+ Visita</Button>
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
                  100000
                </p>
                <p className="m-0 fw-bold border-bottom border-1 border-bianchetto">
                  100000
                </p>
                <p className="m-0 fw-bold border-bottom border-1 border-bianchetto">
                  100000
                </p>
                <p className="m-0 fw-bold border-bottom border-1 border-bianchetto">
                  100000
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
                <p className="m-0 p-0 fw-semibold text-center ">Cantina</p>
                <p className="m-0 p-0 fw-semibold text-center ">Ascensore</p>
                <p className="m-0 p-0 fw-semibold text-center ">Posto Auto</p>
              </Col>
              <Col>
                <p className="m-0 p-0 fw-semibold text-center ">Giardino</p>
                <p className="m-0 p-0 fw-semibold text-center ">Terrazzo</p>
                <p className="m-0 p-0 fw-semibold text-center ">Arredato</p>
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
              Comune: <span className="fw-bold">poipoipooi (LI)</span>
            </p>
            <p className="m-0 p-0 fw-semibold ">
              Indirizzo: <span className="fw-bold">poipoipooi (LI)</span>
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
              <p className="m-0 p-0  ">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Perferendis doloribus quod quo officiis cupiditate cum facere
                iste quam corrupti eveniet? Facilis, optio? Explicabo, optio.
                Nam repellendus repudiandae officiis maxime architecto!
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <div className="d-flex justify-content-around p-2 border border-2 border-beige bg-bluGuado">
            <Button variant="danger">
              <i className="bi bi-trash3-fill"></i>
            </Button>
            <h5 className="m-0  p-2 border- border-1 border-bluGuado bg-beige text-center">
              Foto:
            </h5>
            <Button variant="success">
              <i className="bi bi-plus-circle"></i>
            </Button>
          </div>
        </Row>
        <Row className=" p-2 border border-2 border-beige bg-polvereScuro mb-3">
          <div className="d-flex justify-content-center">
            <Button variant="primary">
              <i className="bi bi-chevron-double-left"></i>
            </Button>
            <div style={{ maxWidth: "70%" }}>
              <img
                id="fotoImmobile"
                src="https://placecats.com/400/300"
                className="img-fluid"
                alt="fotoImmobile"
              ></img>
            </div>
            <Button variant="primary">
              <i className="bi bi-chevron-double-right"></i>
            </Button>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default DettagliImmobile;

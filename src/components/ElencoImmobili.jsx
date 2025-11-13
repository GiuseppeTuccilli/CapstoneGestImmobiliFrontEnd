import { useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import base from "../variabili";

function ElencoImmobili() {
  let token = localStorage.getItem("token");

  const [immobili, setImmobili] = useState([]);

  console.log(base);

  return (
    <Container fluid>
      <Row className="py-1 border border-3 border-black">
        <Col className="d-flex justify-content-center border-end  border-1">
          <Image src="holder.js/171x180" thumbnail style={{ height: "8em" }} />
        </Col>
        <Col className="d-none d-md-flex justify-content-center border-end  border-1">
          <p className="  fw-semibold">descrizione immobile</p>
        </Col>
        <Col className="d-none d-md-flex flex-column justify-content-center border-end  border-1">
          <p className="  fw-semibold">
            Tipologia: <span>data</span>
          </p>
          <p className="  fw-semibold">
            Prezzo: <span>data</span>{" "}
          </p>
          <p className="  fw-semibold">
            Superficie: <span>data</span>
          </p>
          <p className=" fw-semibold">
            Comune: <span>data</span>
          </p>
        </Col>
        <Col className="d-flex justify-content-center ">
          <div className="d-flex flex-column px-4  ">
            <Button className="my-1">Richieste Inerenti</Button>
            <Button className="my-1">Visite</Button>
            <Button className="my-1">Dettagli</Button>
            <Button className="my-1 bg-success ">Nuova Visita</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ElencoImmobili;

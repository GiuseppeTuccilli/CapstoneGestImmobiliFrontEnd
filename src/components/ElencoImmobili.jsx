import { Container, Row, Col, Image } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function ElencoImmobili() {
  return (
    <Container fluid>
      <Row className="py-1 border border-1 border-black">
        <Col xs={6} lg={3} className="d-flex justify-content-center">
          <Image src="holder.js/171x180" thumbnail style={{ height: "8em" }} />
        </Col>
        <Col xs={0} lg={3} className="d-flex justify-content-center">
          <h4>Descrizione</h4>
        </Col>
        <Col xs={0} lg={3} className="d-flex justify-content-center">
          <h4>Dati</h4>
        </Col>
        <Col xs={6} lg={3} className="d-flex justify-content-center ">
          <div className="d-flex flex-column px-4">
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

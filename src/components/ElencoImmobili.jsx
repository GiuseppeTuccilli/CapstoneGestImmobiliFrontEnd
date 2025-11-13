import { useEffect, useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import base from "../variabili";

function ElencoImmobili() {
  //let token = localStorage.getItem("token");
  let token =
    "eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3NjMwNjMyMzEsImV4cCI6MTc2MzY2ODAzMSwic3ViIjoiMTAyIn0.QIRBpkEjNPa9jz_b8suA4ROsy_vf_uID0PDCmt4YiUk";

  const [immobili, setImmobili] = useState([]);

  const getImmobili = () => {
    fetch(base + "/immobili", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(res.status.valueOf);
        }
      })
      .then((data) => {
        setImmobili(data.content);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  useEffect(() => {
    getImmobili();
  }, []);

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

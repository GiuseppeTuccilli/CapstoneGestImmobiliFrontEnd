import { useEffect, useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import base from "../variabili";
import urbana from "../assets/immagini/urbana.png";
import particolare from "../assets/immagini/particolare.jpg";
import speciale from "../assets/immagini/speciale.jpg";

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

  const getImage = (im) => {
    if (im.macroTipologia === "ENTITÀ_URBANA") {
      return urbana;
    } else if (im.macroTipologia === "DESTINAZIONE_SPECIALE") {
      return speciale;
    } else {
      return particolare;
    }
  };

  return (
    <>
      <Row className="d-flex justify-content-center">
        <div className="bg-polvereScuro m-0, py-3 position-fixed">
          <h2 className="text-center">Elenco Immobili</h2>
        </div>
      </Row>
      <Container fluid>
        {immobili.map((i) => {
          return (
            <Row className="py-1 border-top border-bottom border-3 border-black">
              <Col
                xs={6}
                md={2}
                lg={2}
                className="d-flex justify-content-center align-items-center border  border-1"
              >
                <Image src={getImage(i)} thumbnail style={{ height: "10em" }} />
              </Col>
              <Col
                xs={6}
                md={4}
                lg={6}
                className=" d-flex flex-column justify-content-start  border  border-1"
              >
                <div className="h-100">
                  <h5 className="  fw-semibold mb-0">Descrizione:</h5>
                  <div
                    className="border border-1 border-black bg-beigeChiaro p-1"
                    style={{ height: "80%" }}
                  >
                    <p>{i.descrizione}</p>
                  </div>
                </div>
              </Col>
              <Col
                xs={6}
                md={3}
                lg={2}
                className="d-flex flex-column justify-content-center border  border-1"
              >
                <p className="  fw-semibold">
                  Tipologia: <span>{i.macroTipologia}</span>
                </p>
                <p className="  fw-semibold">
                  Prezzo: € <span>{i.prezzo}</span>{" "}
                </p>
                <p className="  fw-semibold">
                  Superficie: <span>{i.superficie + " mq"}</span>
                </p>
                <p className=" fw-semibold">
                  Comune:{" "}
                  <span>
                    {i.comune.denominazione +
                      " (" +
                      i.comune.provincia.sigla +
                      ")"}{" "}
                  </span>
                </p>
              </Col>
              <Col
                xs={6}
                md={3}
                lg={2}
                className="d-flex justify-content-center  border  border-1 "
              >
                <div className="d-flex flex-column px-4  ">
                  <Button className="my-1">Richieste Inerenti</Button>
                  <Button className="my-1">Visite</Button>
                  <Button className="my-1">Dettagli</Button>
                  <Button className="my-1 bg-success ">Nuova Visita</Button>
                </div>
              </Col>
            </Row>
          );
        })}
      </Container>
    </>
  );
}

export default ElencoImmobili;

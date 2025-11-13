import { Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";

function NuovoImmobile() {
  return (
    <Container fluid>
      <h3 className="text-center my-2 py-2 border-bottom border-1 border-white">
        Nuovo Immobile
      </h3>
      <Row className="g-1">
        <Col
          xs={12}
          md={6}
          className="d-flex flex-column align-items-start border border-1 border-white "
        >
          <h4>Seleziona Macro Tipologia</h4>
          <Form.Select aria-label="Default select example">
            <option value="Entità Urbana">Entità Urbana</option>
            <option value="Destinazione Speciale">Destinazione Speciale</option>
            <option value="Destinazione Particolare">
              Destinazione Particolare
            </option>
          </Form.Select>
          <div className="d-flex my-2 justify-content-start w-100">
            <h4 className="m-0 w-50">Numero locali</h4>
            <input type="number" min={0} max={12}></input>
          </div>
          <div className="d-flex my-2 justify-content-start w-100">
            <h4 className="m-0 w-50">Numero vani</h4>
            <input type="number" min={0} max={12}></input>
          </div>
          <div className="d-flex my-2 justify-content-start w-100">
            <h4 className="m-0 w-50">Prezzo</h4>
            <input type="number" min={0}></input>
          </div>
        </Col>
        <Col
          xs={12}
          md={6}
          className="d-flex flex-column align-items-center border border-1 border-white "
        >
          <h4>Descrizione</h4>
          <div className=" w-100">
            <textarea
              style={{ height: "10em" }}
              className="form-control"
              placeholder="descrizione"
              id="descrizione"
            ></textarea>
          </div>
        </Col>
        <Col
          xs={12}
          md={6}
          className="d-flex flex-column align-items-center border border-1 border-white"
        >
          <h4>Accessori</h4>
          <Row className="w-100">
            <Col xs={6}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="cantina"
                />
                <label className="form-check-label" htmlFor="cantina">
                  Cantina
                </label>
              </div>
            </Col>
            <Col xs={6}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="ascensore"
                />
                <label className="form-check-label" htmlFor="ascensore">
                  Ascensore
                </label>
              </div>
            </Col>
            <Col xs={6}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="postoAuto"
                />
                <label className="form-check-label" htmlFor="postoAuto">
                  Posto Auto
                </label>
              </div>
            </Col>
            <Col xs={6}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="giardinoPrivato"
                />
                <label className="form-check-label" htmlFor="giardinoPrivato">
                  Giardino Privato
                </label>
              </div>
            </Col>
            <Col xs={6}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="terrazzo"
                />
                <label className="form-check-label" htmlFor="terrazzo">
                  Terrazzo
                </label>
              </div>
            </Col>
            <Col xs={6}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="arredato"
                />
                <label className="form-check-label" htmlFor="arredato">
                  Arredato
                </label>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default NuovoImmobile;

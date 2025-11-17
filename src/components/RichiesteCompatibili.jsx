import { useState } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";

function RichiesteCompatibili(props) {
  const [showImmobili, setShowImmobili] = useState(false);

  let idImmo = props.idImmo;
  let base = props.base;
  let token = props.token;

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
            <Button
              onClick={() => {
                setShowImmobili(true);
              }}
            >
              Immobili Compatibili
            </Button>
          </Col>
        </Row>
        <Row className="border border-2 border-bluGuado">
          <Col style={{ height: "15em", overflowY: "auto" }}>
            <Row>
              <Table striped bordered hover className="mb-0">
                <thead className="position-sticky" style={{ top: "-0.5%" }}>
                  <tr>
                    <th>Username</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>primo</td>
                    <td>Ottodfgdfgdfg</td>
                    <td>@mdodfgdfgdfg</td>
                  </tr>
                  <tr>
                    <td>Jacobdfgdfgdfg</td>
                    <td>Thorntondfgdfdfg</td>
                    <td>@fatdfgdfgdfg</td>
                  </tr>
                  <tr>
                    <td>Jacobdfgdfgdfg</td>
                    <td>Thorntondfgdfdfg</td>
                    <td>@fatdfgdfgdfg</td>
                  </tr>
                  <tr>
                    <td>Jacobdfgdfgdfg</td>
                    <td>Thorntondfgdfdfg</td>
                    <td>@fatdfgdfgdfg</td>
                  </tr>
                  <tr>
                    <td>Jacobdfgdfgdfg</td>
                    <td>Thorntondfgdfdfg</td>
                    <td>@fatdfgdfgdfg</td>
                  </tr>
                  <tr>
                    <td>Jacobdfgdfgdfg</td>
                    <td>Thorntondfgdfdfg</td>
                    <td>@fatdfgdfgdfg</td>
                  </tr>
                  <tr>
                    <td>Jacobdfgdfgdfg</td>
                    <td>Thorntondfgdfdfg</td>
                    <td>@fatdfgdfgdfg</td>
                  </tr>
                  <tr>
                    <td>Jacobdfgdfgdfg</td>
                    <td>Thorntondfgdfdfg</td>
                    <td>@fatdfgdfgdfg</td>
                  </tr>
                  <tr>
                    <td>Jacobdfgdfgdfg</td>
                    <td>Thorntondfgdfdfg</td>
                    <td>@fatdfgdfgdfg</td>
                  </tr>
                  <tr>
                    <td>Jacobdfgdfgdfg</td>
                    <td>Thorntondfgdfdfg</td>
                    <td>@fatdfgdfgdfg</td>
                  </tr>
                </tbody>
              </Table>
            </Row>
          </Col>
          <Col
            style={{ height: "15em", overflowY: "auto" }}
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
                      <Button variant="success">
                        <i className="bi bi-box-arrow-up-right"></i>
                      </Button>
                    </div>
                  </th>

                  <tr>
                    <th>Username</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>primo</td>
                    <td>Ottodfgdfgdfg</td>
                    <td>@mdodfgdfgdfg</td>
                  </tr>
                  <tr>
                    <td>Jacobdfgdfgdfg</td>
                    <td>Thorntondfgdfdfg</td>
                    <td>@fatdfgdfgdfg</td>
                  </tr>
                  <tr>
                    <td>Jacobdfgdfgdfg</td>
                    <td>Thorntondfgdfdfg</td>
                    <td>@fatdfgdfgdfg</td>
                  </tr>
                  <tr>
                    <td>Jacobdfgdfgdfg</td>
                    <td>Thorntondfgdfdfg</td>
                    <td>@fatdfgdfgdfg</td>
                  </tr>
                  <tr>
                    <td>Jacobdfgdfgdfg</td>
                    <td>Thorntondfgdfdfg</td>
                    <td>@fatdfgdfgdfg</td>
                  </tr>
                  <tr>
                    <td>Jacobdfgdfgdfg</td>
                    <td>Thorntondfgdfdfg</td>
                    <td>@fatdfgdfgdfg</td>
                  </tr>
                  <tr>
                    <td>Jacobdfgdfgdfg</td>
                    <td>Thorntondfgdfdfg</td>
                    <td>@fatdfgdfgdfg</td>
                  </tr>
                  <tr>
                    <td>Jacobdfgdfgdfg</td>
                    <td>Thorntondfgdfdfg</td>
                    <td>@fatdfgdfgdfg</td>
                  </tr>
                  <tr>
                    <td>Jacobdfgdfgdfg</td>
                    <td>Thorntondfgdfdfg</td>
                    <td>@fatdfgdfgdfg</td>
                  </tr>
                  <tr>
                    <td>Jacobdfgdfgdfg</td>
                    <td>Thorntondfgdfdfg</td>
                    <td>@fatdfgdfgdfg</td>
                  </tr>
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

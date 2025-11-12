import { Button, Col, Container, Row } from "react-bootstrap";

const Under = () => {
  return (
    <>
      <Container id="under" className="my-4 ">
        <h2 className="text-white">Altro da ascoltare </h2>
        <Row className="g-2">
          <Col xs={12} lg={4}>
            <Button className="w-100 d-flex justify-content-between align-items-center">
              <p className="text-danger m-0 fw-bold">Esplora per Genere</p>
              <p className="text-danger fs-2 m-0">
                <i className="bi bi-caret-right"></i>
              </p>
            </Button>
          </Col>
          <Col xs={12} lg={4}>
            <Button className="w-100 d-flex justify-content-between align-items-center">
              <p className="text-danger m-0 fw-bold">Worldwide</p>
              <p className="text-danger fs-2 m-0">
                <i className="bi bi-caret-right"></i>
              </p>
            </Button>
          </Col>
          <Col xs={12} lg={4}>
            <Button className="w-100 d-flex justify-content-between align-items-center">
              <p className="text-danger m-0 fw-bold">Video musicali</p>
              <p className="text-danger fs-2 m-0">
                <i className="bi bi-caret-right"></i>
              </p>
            </Button>
          </Col>
          <Col xs={12} lg={4}>
            <Button className="w-100 d-flex justify-content-between align-items-center">
              <p className="text-danger m-0 fw-bold">Decenni</p>
              <p className="text-danger fs-2 m-0">
                <i className="bi bi-caret-right"></i>
              </p>
            </Button>
          </Col>
          <Col xs={12} lg={4}>
            <Button className="w-100 d-flex justify-content-between align-items-center">
              <p className="text-danger m-0 fw-bold">Classifiche</p>
              <p className="text-danger fs-2 m-0">
                <i className="bi bi-caret-right"></i>
              </p>
            </Button>
          </Col>
          <Col xs={12} lg={4}>
            <Button className="w-100 d-flex justify-content-between align-items-center">
              <p className="text-danger m-0 fw-bold">Nuovi Artisti</p>
              <p className="text-danger fs-2 m-0">
                <i className="bi bi-caret-right"></i>
              </p>
            </Button>
          </Col>
          <Col xs={12} lg={4}>
            <Button className="w-100 d-flex justify-content-between align-items-center">
              <p className="text-danger m-0 fw-bold">
                Attività e stati d'animo
              </p>
              <p className="text-danger fs-2 m-0">
                <i className="bi bi-caret-right"></i>
              </p>
            </Button>
          </Col>
          <Col xs={12} lg={4}>
            <Button className="w-100 d-flex justify-content-between align-items-center">
              <p className="text-danger m-0 fw-bold">Audio spaziale</p>
              <p className="text-danger fs-2 m-0">
                <i className="bi bi-caret-right"></i>
              </p>
            </Button>
          </Col>
          <Col xs={12} lg={4}>
            <Button className="w-100 d-flex justify-content-between align-items-center">
              <p className="text-danger m-0 fw-bold">Hit del passato</p>
              <p className="text-danger fs-2 m-0">
                <i className="bi bi-caret-right"></i>
              </p>
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Under;

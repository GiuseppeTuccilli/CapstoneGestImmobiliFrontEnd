import { Container, Carousel } from "react-bootstrap";
import dueA from "../../assets/images/2a.png";
import dueB from "../../assets/images/2b.png";
import dueC from "../../assets/images/2c.png";
import dueD from "../../assets/images/2d.png";
import dueE from "../../assets/images/2e.png";
import dueF from "../../assets/images/2f.png";

const Middle = () => {
  return (
    <Container className="mt-5">
      <h4 className="text-white">Nuovi episodi radio</h4>

      <Carousel className="d-none d-lg-flex" id="midCar">
        <Carousel.Item>
          <div className="d-flex big-car">
            <div className="d-flex flex-column" style={{ width: "24%" }}>
              <img
                src={dueA}
                className=" mx-1 flex-grow-1 "
                style={{ width: "98%", objectFit: "contain", height: "15em" }}
              />
              <p className="text-white ms-1">Prologo con Abuelo</p>
            </div>
            <div className="d-flex flex-column" style={{ width: "24%" }}>
              <img
                src={dueB}
                className=" mx-1 flex-grow-1 "
                style={{ width: "98%", objectFit: "contain", height: "15em" }}
              />
              <p className="text-white ms-1">Prologo con Abuelo</p>
            </div>
            <div className="d-flex flex-column" style={{ width: "24%" }}>
              <img
                src={dueC}
                className=" mx-1 flex-grow-1 "
                style={{ width: "98%", objectFit: "contain", height: "15em" }}
              />
              <p className="text-white ms-1">Prologo con Abuelo</p>
            </div>
            <div className="d-flex flex-column" style={{ width: "24%" }}>
              <img
                src={dueD}
                className=" mx-1 flex-grow-1 "
                style={{ width: "98%", objectFit: "contain", height: "15em" }}
              />
              <p className="text-white ms-1">Prologo con Abuelo</p>
            </div>
            <div className="d-flex flex-column" style={{ width: "24%" }}>
              <img
                src={dueE}
                className=" mx-1 flex-grow-1 "
                style={{ width: "98%", objectFit: "contain", height: "15em" }}
              />
              <p className="text-white ms-1">Prologo con Abuelo</p>
            </div>
            <div className="d-flex flex-column" style={{ width: "24%" }}>
              <img
                src={dueF}
                className=" mx-1 flex-grow-1 "
                style={{ width: "98%", objectFit: "contain", height: "15em" }}
              />
              <p className="text-white ms-1">Prologo con Abuelo</p>
            </div>
          </div>
        </Carousel.Item>
      </Carousel>
      <Carousel className="d-lg-none">
        <Carousel.Item>
          <div className="d-flex big-car">
            <div className="d-flex flex-column" style={{ width: "33%" }}>
              <img
                src={dueA}
                className=" mx-1 flex-grow-1 "
                style={{ width: "98%", objectFit: "contain", height: "15em" }}
              />
              <p className="text-white ms-1">Prologo con Abuelo</p>
            </div>
            <div className="d-flex flex-column" style={{ width: "33%" }}>
              <img
                src={dueB}
                className=" mx-1 flex-grow-1 "
                style={{ width: "98%", objectFit: "contain", height: "15em" }}
              />
              <p className="text-white ms-1">Prologo con Abuelo</p>
            </div>
            <div className="d-flex flex-column" style={{ width: "33%" }}>
              <img
                src={dueC}
                className=" mx-1 flex-grow-1 "
                style={{ width: "98%", objectFit: "contain", height: "15em" }}
              />
              <p className="text-white ms-1">Prologo con Abuelo</p>
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="d-flex big-car">
            <div className="d-flex flex-column" style={{ width: "33%" }}>
              <img
                src={dueE}
                className=" mx-1 flex-grow-1 "
                style={{ width: "98%", objectFit: "contain", height: "15em" }}
              />
              <p className="text-white ms-1">Prologo con Abuelo</p>
            </div>
            <div className="d-flex flex-column" style={{ width: "33%" }}>
              <img
                src={dueF}
                className=" mx-1 flex-grow-1 "
                style={{ width: "98%", objectFit: "contain", height: "15em" }}
              />
              <p className="text-white ms-1">Prologo con Abuelo</p>
            </div>
            <div className="d-flex flex-column" style={{ width: "33%" }}>
              <img
                src={dueA}
                className=" mx-1 flex-grow-1 "
                style={{ width: "98%", objectFit: "contain", height: "15em" }}
              />
              <p className="text-white ms-1">Prologo con Abuelo</p>
            </div>
          </div>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
};

export default Middle;

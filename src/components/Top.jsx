import { Container } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import unoA from "../../assets/images/1a.png";
import unoB from "../../assets/images/1b.png";
import unoC from "../../assets/images/1c.png";

const Top = () => {
  return (
    <Container className="mt-2">
      <div id="topSpace" style={{ height: "5em" }}></div>
      <h1 className="text-white">Novità</h1>
      <hr style={{ height: "2px" }} className="bg-white" />
      <Carousel className="d-none d-lg-flex">
        <Carousel.Item>
          <div className="d-flex big-car">
            <div className="d-flex flex-column">
              <p className="text-white mb-1">Nuova stazione radio</p>
              <p className="text-white fw-bold pe-2 mb-auto flex-grow-1">
                Rilassati, al rest pensiamo noi, ascolta Apple Music Chill
              </p>

              <img
                src={unoA}
                className=" mx-1 flex-grow-1 "
                style={{ width: "98%", objectFit: "contain" }}
              />
            </div>
            <div className="d-flex flex-column">
              <p className="text-white mb-1">Nuova stazione radio</p>
              <p className="text-white fw-bold  pe-2 mb-auto  flex-grow-1">
                Nuova casa della musica latina
              </p>

              <img
                src={unoB}
                className=" mx-1 flex-grow-1"
                style={{ width: "98%", objectFit: "contain" }}
              />
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="d-flex big-car">
            <div className="d-flex flex-column">
              <p className="text-white mb-1">Nuova stazione radio</p>
              <p className="text-white fw-bold pe-2 mb-auto  flex-grow-1">
                Rilassati, al rest pensiamo noi, ascolta Apple Music Chill
              </p>

              <img
                src={unoC}
                className=" mx-1 flex-grow-1"
                style={{ width: "98%", objectFit: "contain" }}
              />
            </div>
            <div className="d-flex flex-column">
              <p className="text-white mb-1">Nuova stazione radio</p>
              <p className="text-white fw-bold  pe-2 mb-auto  flex-grow-1">
                Rilassati, al rest pensiamo noi, ascolta Apple Music Chill
              </p>

              <img
                src={unoA}
                className=" mx-1 flex-grow-1"
                style={{ width: "98%", objectFit: "contain" }}
              />
            </div>
          </div>
        </Carousel.Item>
      </Carousel>
      <Carousel className=" d-lg-none ">
        <Carousel.Item>
          <div className="d-flex big-car">
            <div className="d-flex flex-column">
              <p className="text-white mb-1">Nuova stazione radio</p>
              <p className="text-white fw-bold pe-2 mb-auto flex-grow-1">
                Rilassati, al rest pensiamo noi, ascolta Apple Music Chill
              </p>

              <img
                src={unoA}
                className=" mx-1 flex-grow-1 "
                style={{ width: "98%", objectFit: "contain" }}
              />
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="d-flex big-car">
            <div className="d-flex flex-column">
              <p className="text-white mb-1">Nuova stazione radio</p>
              <p className="text-white fw-bold pe-2 mb-auto flex-grow-1">
                Rilassati, al rest pensiamo noi, ascolta Apple Music Chill
              </p>

              <img
                src={unoB}
                className=" mx-1 flex-grow-1 "
                style={{ width: "98%", objectFit: "contain" }}
              />
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="d-flex big-car">
            <div className="d-flex flex-column">
              <p className="text-white mb-1">Nuova stazione radio</p>
              <p className="text-white fw-bold pe-2 mb-auto flex-grow-1">
                Rilassati, al rest pensiamo noi, ascolta Apple Music Chill
              </p>

              <img
                src={unoC}
                className=" mx-1 flex-grow-1 "
                style={{ width: "98%", objectFit: "contain" }}
              />
            </div>
          </div>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
};

export default Top;

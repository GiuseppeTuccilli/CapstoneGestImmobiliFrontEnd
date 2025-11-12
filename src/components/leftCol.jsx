import musicIcon from "../../assets/logos/music-white.svg";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LeftCol = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <div id="leftCol" className="bg-neroChiaro  ">
        <img src={musicIcon} className="mt-4 ms-4" />

        <Form
          className="d-flex position-relative mx-1"
          onSubmit={(e) => {
            // e.preventDefault();

            navigate("/" + search);
          }}
        >
          <Button
            type="submit"
            id="search-btn"
            variant="outline-danger"
            className="border-border-1 border-white"
          >
            <i className="bi bi-search d-flex me-0 "></i>
          </Button>
          <Form.Control
            id="cerca"
            type="search"
            placeholder="cerca"
            className="me-2 my-4  bg-neroChiaro text-white"
            aria-label="Search"
            style={{ height: "1.8em", borderLeft: "0" }}
            required
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            value={search}
          />
        </Form>
        <div
          className="mx-3 side-btn mt-3 mb-1"
          onClick={() => {
            navigate("/");
          }}
        >
          <span className="me-2">
            <i className="bi bi-house-door"></i>
          </span>
          Home
        </div>
        <div className="mx-3 side-btn mb-1">
          <span className="me-2">
            <i className="bi bi-bounding-box"></i>
          </span>
          Novità
        </div>
        <div className="mx-3 side-btn">
          <span className="me-2">
            <i className="bi bi-broadcast"></i>
          </span>
          Radio
        </div>
      </div>
    </>
  );
};

export default LeftCol;

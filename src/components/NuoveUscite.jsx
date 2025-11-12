import { Container, Row } from "react-bootstrap";
import Song from "./Song";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const NuoveUscite = () => {
  const params = useParams();
  console.log(params.Search);
  const dispatch = useDispatch();

  useEffect(() => {
    if (params.Search === undefined) {
      return;
    }
    dispatch({
      type: "GET_SEARCH",
      payload: params.Search,
    });
  }, [params.Search]);

  return (
    <Container>
      <h3 className="text-white">
        {params.Search === undefined
          ? "Nuove Uscite"
          : "Risultatri di ricerca per: " + params.Search}{" "}
      </h3>
      <Row className="g-2">
        <Song />
      </Row>
    </Container>
  );
};

export default NuoveUscite;

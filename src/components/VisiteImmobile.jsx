import { Container, Row, Col, Image, Spinner, Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import base from "../variabili";
import { Modal, Alert } from "react-bootstrap/";
import { useParams, useNavigate } from "react-router-dom";

function VisiteImmobile(props) {
  const [visite, setVisite] = useState([]);
  const [idVisitaSel, setIdVisitaSel] = useState(0);

  const [idClienteSel, setIdClienteSel] = useState(0);

  const navigate = useNavigate();

  let idImmo = props.idImmo;
  let base = props.base;
  let token = props.token;

  const getVisite = () => {
    fetch(base + "/immobili/" + idImmo + "/visite", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(res.status);
        }
      })
      .then((data) => {
        setVisite(data);
      })
      .catch((er) => {
        console.log(er.toString());
      });
  };

  useEffect(() => {
    getVisite();
  }, [token]);

  return (
    <>
      <Col
        style={{ height: "20em", overflowY: "auto" }}
        className="bg-bluGuado"
      >
        <Row>
          <Table striped bordered hover className="mb-0">
            <thead className="position-sticky" style={{ top: "-0.5%" }}>
              <th colSpan={3}>
                <div className="d-flex  justify-content-around p-3 border border-1 border-beige bg-polvereScuro">
                  <div>
                    <h4 className="m-0 p-2 border border-1 border-azzurroPolvere bg-beige">
                      Visite
                    </h4>
                  </div>
                  {idClienteSel > 0 && (
                    <Button
                      variant="success"
                      onClick={() => {
                        navigate("/clienti/" + idClienteSel);
                      }}
                    >
                      Scheda Cliente{" "}
                      <i className="bi bi-box-arrow-up-right"></i>
                    </Button>
                  )}
                </div>
              </th>
              <tr>
                <th className="text-center">Data</th>

                <th colSpan={2} className="text-center">
                  Cliente
                </th>
              </tr>
            </thead>

            <tbody>
              {visite.map((v) => {
                return (
                  <tr
                    key={v.id}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setIdVisitaSel(v.id);
                      setIdClienteSel(v.cliente.id);
                    }}
                    className={
                      idVisitaSel === v.id && "border border-2 border-success"
                    }
                  >
                    <td>{v.data}</td>
                    <td>{v.cliente.nome}</td>
                    <td>{v.cliente.cognome}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Row>
      </Col>
    </>
  );
}

export default VisiteImmobile;

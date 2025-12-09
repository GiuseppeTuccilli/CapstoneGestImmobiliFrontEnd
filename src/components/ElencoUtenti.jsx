import { Container, Row, Col, Table } from "react-bootstrap";
import { use, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import base from "../variabili";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

function ElencoUtenti(props) {
  let base = props.base;
  let mioRuolo = props.ruolo;
  let mioId = props.mioId;

  const [idUtenteSel, setIdUtenteSel] = useState(0);
  const [utenti, setUtenti] = useState([]);
  const [page, setPage] = useState(0);
  const [firstPage, setFirstPage] = useState(true);
  const [lastPage, setLastPage] = useState(false);

  const getUtenti = () => {
    fetch(base + "/utenti" + "?page=" + page, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token").slice(1, -1),
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
        setUtenti(data.content);
      })
      .catch((er) => {
        console.log(er.toString());
      });
  };

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      getUtenti();
    }
  }, [page]);

  return (
    <>
      <Col
        style={{ height: "20em", overflowY: "auto" }}
        className={"bg-bluGuado" + (mioRuolo === "ADMIN" ? " " : " d-none")}
      >
        <Row>
          <Table striped bordered hover className="mb-0">
            <thead className="position-sticky" style={{ top: "-0.5%" }}>
              <th colSpan={3}>
                <div className="d-flex  justify-content-around p-3 border border-1 border-sabbia bg-polvereScuro">
                  <div>
                    <h4 className="m-0 p-2 border border-1 border-azzurroPolvere bg-sabbia">
                      Utenti
                    </h4>
                  </div>
                  {idUtenteSel > 0 && (
                    <Button variant="success">Rendi Amministratore </Button>
                  )}
                </div>
              </th>
              <tr>
                <th className="text-center">Nome</th>
                <th className="text-center">Cognome</th>
                <th className="text-center">Ruolo</th>
              </tr>
            </thead>

            <tbody>
              {utenti
                .filter((us) => {
                  return us.id !== mioId;
                })
                .map((u) => {
                  return (
                    <tr
                      key={u.id}
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setIdUtenteSel(u.id);
                      }}
                      className={
                        idUtenteSel === u.id && "border border-2 border-success"
                      }
                    >
                      <td>{u.nome}</td>
                      <td>{u.cognome}</td>
                      <td>{u.ruolo}</td>
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
export default ElencoUtenti;

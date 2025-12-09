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
  const [nomeSel, setNomeSel] = useState("");
  const [cognomeSel, setCognomeSel] = useState("");
  const [ruoloSel, setRuoloSel] = useState("");
  const [utenti, setUtenti] = useState([]);
  const [page, setPage] = useState(0);
  const [firstPage, setFirstPage] = useState(true);
  const [lastPage, setLastPage] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
        setPage(data.number);
        setFirstPage(data.first);
        setLastPage(data.last);
      })
      .catch((er) => {
        console.log(er.toString());
      });
  };

  const setToAdmin = () => {
    fetch(base + "/utenti/" + idUtenteSel, {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token").slice(1, -1),
      },
    })
      .then((res) => {
        if (res.ok) {
          alert(nomeSel + " " + cognomeSel + " è ora un Amministarore");
          window.location.reload();
        } else {
          throw new Error(res.status);
        }
      })
      .catch((er) => {
        alert("errore: " + er.toString());
      });
  };

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      getUtenti();
    }
  }, [page]);

  return (
    <>
      <Modal show={show} size="sm" id="confermaFattura" onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Permessi Amministratore</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {nomeSel} {cognomeSel} avrà permessi da Amministratore
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Annulla
          </Button>
          <Button
            variant="success"
            onClick={() => {
              handleClose();

              setToAdmin();
            }}
          >
            Conferma
          </Button>
        </Modal.Footer>
      </Modal>
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
                  {idUtenteSel > 0 && ruoloSel !== "ADMIN" && (
                    <Button
                      variant="success"
                      onClick={() => {
                        handleShow();
                      }}
                    >
                      Rendi Amministratore{" "}
                    </Button>
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
                        setNomeSel(u.nome);
                        setCognomeSel(u.cognome);
                        setRuoloSel(u.ruolo);
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
        <Row className="my-3">
          <Col xs={4} md={3} lg={2} className="d-flex justify-content-start">
            {!firstPage && (
              <Button
                className="rounded-start-5"
                variant="primary"
                onClick={() => {
                  if (firstPage) {
                    return;
                  }
                  let prev = page - 1;
                  setPage(prev);
                }}
              >
                <i className="bi bi-chevron-left "></i>
              </Button>
            )}
          </Col>
          <Col xs={4} md={6} lg={8}></Col>
          <Col xs={4} md={3} lg={2} className="d-flex justify-content-end">
            {!lastPage && (
              <Button
                className=" rounded-end-5"
                variant="primary"
                onClick={() => {
                  if (lastPage) {
                    return;
                  }
                  let next = page + 1;
                  setPage(next);
                }}
              >
                <i className="bi bi-chevron-right "></i>
              </Button>
            )}
          </Col>
        </Row>
      </Col>
    </>
  );
}
export default ElencoUtenti;

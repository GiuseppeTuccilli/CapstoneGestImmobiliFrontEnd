import "./App.css";
import "../src/style/coustomBootstrap.scss";
import { Container, Row, Col } from "react-bootstrap";

import "bootstrap-icons/font/bootstrap-icons.css";

import { Provider } from "react-redux";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter></BrowserRouter>
    </>
  );
}

export default App;

import "./App.css";
import "../src/style/coustomBootstrap.scss";
import { Container, Row, Col } from "react-bootstrap";

import "bootstrap-icons/font/bootstrap-icons.css";

import { Provider } from "react-redux";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyNavbar from "./components/MyNavbar";
import RegisterForm from "./components/RegisterPage";
import ElencoImmobili from "./components/ElencoImmobili";
import LoginPage from "./components/LoginPage";
import NuovoImmobile from "./components/NuovoImmobile";
import HomePage from "./components/HomePage";
import NuovoCliente from "./components/NuovoCliente";
import ElencoClienti from "./components/ElencoClienti";
import NuovaVisita from "./components/NuovaVisita";
import DettagliCliente from "./components/DettagliCliente";
import ModificaCliente from "./components/ModificaCliente";
import NuovaRichiesta from "./components/NuovaRichiesta";
import DettagliImmobile from "./components/DettagliImmobile";
import MieVisite from "./components/MieVisite";
import RichiediCodice from "./components/RichiediCodice";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/richiediCodice" element={<RichiediCodice />} />
          <Route
            path="/"
            element={
              <>
                <MyNavbar />
                <HomePage />
              </>
            }
          />
          <Route
            path="/immobili"
            element={
              <>
                <MyNavbar />
                <ElencoImmobili />
              </>
            }
          />
          <Route
            path="/immobili/:idImmobile"
            element={
              <>
                <MyNavbar />
                <DettagliImmobile />
              </>
            }
          />

          <Route
            path="/immobili/:idImmobile/nuovaVisita"
            element={
              <>
                <MyNavbar />
                <NuovaVisita />
              </>
            }
          />
          <Route
            path="/clienti"
            element={
              <>
                <MyNavbar />
                <ElencoClienti />
              </>
            }
          />
          <Route
            path="/clienti/:idCliente"
            element={
              <>
                <MyNavbar />
                <DettagliCliente />
              </>
            }
          />
          <Route
            path="/clienti/:idCliente/modifica"
            element={
              <>
                <MyNavbar />
                <ModificaCliente />
              </>
            }
          />
          <Route
            path="/clienti/:idCliente/nuovaRichiesta"
            element={
              <>
                <MyNavbar />
                <NuovaRichiesta />
              </>
            }
          />
          <Route
            path="/visite"
            element={
              <>
                <MyNavbar />
                <MieVisite />
              </>
            }
          />
          <Route
            path="/NuovoImmobile"
            element={
              <>
                <MyNavbar />
                <NuovoImmobile />
              </>
            }
          />
          <Route
            path="/NuovoCliente"
            element={
              <>
                <MyNavbar />
                <NuovoCliente />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

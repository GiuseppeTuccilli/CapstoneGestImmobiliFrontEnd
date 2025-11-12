import "./App.css";
import "../src/style/coustomBootstrap.scss";
import { Container, Row, Col } from "react-bootstrap";

import "bootstrap-icons/font/bootstrap-icons.css";

import { Provider } from "react-redux";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyNavbar from "./components/MyNavbar";
import RegisterForm from "./components/RegisterPage";
import ElencoImmobili from "./components/ElencoImmobili";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/home" element={<MyNavbar />} />
          <Route
            path="/immobili"
            element={
              <>
                <MyNavbar />
                <ElencoImmobili />
              </>
            }
          />
          <Route path="/clienti" element={<MyNavbar />} />
          <Route path="/visite" element={<MyNavbar />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

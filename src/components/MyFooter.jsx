import { Container } from "react-bootstrap";

const MyFooter = () => {
  return (
    <Container>
      <p className="text-secondary">Italia | English (UK)</p>
      <p className="text-secondary mt-4">
        Copyright 2024 <span className="text-white">Apple Inc.</span> Tutti i
        diritti riservati
      </p>
      <div id="bottomSpace"></div>
    </Container>
  );
};

export default MyFooter;

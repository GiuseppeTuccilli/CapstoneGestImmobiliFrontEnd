function MyFooter() {
  return (
    <>
      <div className="border-top border-1 border-sabbia bg-grigioScuro p-3 py-4 d-flex justify-content-evenly mt-auto">
        <a href="https://www.linkedin.com/feed/" className="linkFooter ">
          <i className="bi bi-linkedin"></i> LinkedIn
        </a>
        <a
          href="https://github.com/GiuseppeTuccilli/Capstone-Gestionale-Immobili"
          className="linkFooter "
        >
          <i className="bi bi-github"></i> GitHub
        </a>
      </div>
    </>
  );
}

export default MyFooter;

import React from "react";
import "./style.css";

export default function NotFound() {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <section className="container">
      <div className="error">
        <h1>Uh Ohh!</h1>
        <p>We couldn't find the page that you're looking for :(</p>
        <div className="cta">
          <button className="cta-back" onClick={handleGoBack}>
            Go Back
          </button>
        </div>
      </div>
      <img
        src="https://github.com/smthari/404-page-using-html-css/blob/Starter/Images/404.png?raw=true"
        alt="404 not found"
        className="hero-img"
      />
    </section>
  );
}

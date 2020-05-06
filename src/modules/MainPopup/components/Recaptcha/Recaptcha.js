import React, { useEffect } from "react";
import "./Recaptcha.scss";

const Recaptcha = ({ handleRecaptcha }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      `https://www.google.com/recaptcha/api.js?render=${process.env.RECAPTCHA_KEY}`;
    script.addEventListener("load", handleLoaded);
    document.body.appendChild(script);
  }, []);

  const handleLoaded = (_) => {
    window.grecaptcha.ready((_) => {
      window.grecaptcha
        .execute(process.env.RECAPTCHA_KEY, {
          action: "social",
        })
        .then((token) => {
          handleRecaptcha(token);
        });
    });
  };

  return (
    <div
      className="g-recaptcha"
      data-sitekey={process.env.RECAPTCHA_KEY}
      data-size="invisible"
    ></div>
  );
};

export default Recaptcha;

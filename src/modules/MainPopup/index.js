import React from "react";
import Recaptcha from "./components/Recaptcha";
import SubmissionForm from "./components/SubmissionForm";
import SubmissionStatus from "./components/SubmissionStatus";

const MainPopup = ({ handleSubmit, upload, handleRecaptcha }) => {
  return (
    <>
      <SubmissionStatus status={upload}/>
      <Recaptcha handleRecaptcha={(token) => handleRecaptcha(token)} />
      <SubmissionForm handleSubmit={handleSubmit} upload={upload} />
    </>
  );
};

export default MainPopup;

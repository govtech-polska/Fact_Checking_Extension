import React from "react";
import bn from "bem-names";

import { useTranslation } from "react-i18next";

import { SUCCESS, FAILURE } from "../../../../base/enums/upload";

import SuccessIcon from "../../../../assets/icons/svg/success.svg";
import FailureIcon from "../../../../assets/icons/svg/warning.svg";

import "./SubmissionStatus.scss";

const SubmissionStatus = ({ status }) => {
  const { t, i18n } = useTranslation("popup");
  return (
    <>
      {(status === SUCCESS || status === FAILURE) && (
        <div className={bn("submission-status")}>
          {status === SUCCESS ? (
            <SuccessIcon className={bn("submission-status", "icon")} />
          ) : (
            <FailureIcon className={bn("submission-status", "icon")} />
          )}
          <h1 className={bn("submission-status", "title")}>
            {t(status === SUCCESS ? "success_msg_title" : "error_msg_title")}
          </h1>
          <p className={bn("submission-status", "content")}>
            {t(
              status === SUCCESS
                ? "success_msg_description"
                : "error_msg_description"
            )}
          </p>
        </div>
      )}
    </>
  );
};

export default SubmissionStatus;

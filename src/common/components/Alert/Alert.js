import React from "react";
import bn from "bem-names";

import { useTranslation } from "react-i18next";

import SuccessIcon from "../../../assets/icons/svg/success.svg";
import WarningIcon from "../../../assets/icons/svg/warning.svg";
import Explanation from "../../../assets/images/explanation.gif";

import {
  WEBSITE_LOADING,
  WEBSITE_VERIFIED,
  WEBSITE_BLOCKED,
  WEBSITE_WITHOUT_TEXT,
  WEBSITE_WITHOUT_PATCHNAME,
  MARKED_TEXT_IS_TOO_LONG,
} from "../../../base/enums/status";

import "./Alert.scss";

// Tip: Condition rendering
const Alert = ({ status }) => {
  const { t, i18n } = useTranslation("alert");
  return (
    <div className={bn("alert")}>

      {status === WEBSITE_LOADING || status === WEBSITE_VERIFIED
        ? <SuccessIcon className={bn("alert", "icon")} />
        : (status === WEBSITE_WITHOUT_TEXT
          ? <img className = "explanation" src={Explanation} alt="Explanation" width= "100%" height="100px"/>
          : <WarningIcon className={bn("alert", "icon")} />
        )
      }

      <div className={bn("alert", "col")}>
        <h1 className={bn("alert", "title")}>
          {status === WEBSITE_LOADING && t("loading")}
          {status === WEBSITE_VERIFIED && t("info_title")}
          {status === WEBSITE_BLOCKED && t("blocked_title")}
          {status === WEBSITE_WITHOUT_TEXT && t("no_marked_text_title")}
          {status === WEBSITE_WITHOUT_PATCHNAME && t("pathname_error_title")}
          {status === MARKED_TEXT_IS_TOO_LONG && t("error_title")}
        </h1>
        <p className={bn("alert", "paragraph")}>
          {status === WEBSITE_VERIFIED && t("info_description")}
          {status === WEBSITE_WITHOUT_TEXT && t("no_marked_text")}
          {status === WEBSITE_WITHOUT_PATCHNAME && t("pathname_error_content")}
          {status === MARKED_TEXT_IS_TOO_LONG && t("marked_text_too_long")}
        </p>
      </div>
    </div>
  );
};

export default Alert;

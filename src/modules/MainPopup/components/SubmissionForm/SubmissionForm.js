import React from "react";
import bn from "bem-names";
import * as Yup from "yup";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useTranslation } from "react-i18next";

import "./SubmissionForm.scss";

const SubmissionForm = ({ handleSubmit, upload }) => {
  const { t, i18n } = useTranslation("popup");

  const InitialValues = { email: "", comment: "" };

  const ValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email(t("email_is_invalid"))
      .required(t("email_is_required")),
    comment: Yup.string()
      .required(t("description_is_required"))
      .max(200, t("description_too_long")),
  });
  return (
    <Formik
      initialValues={InitialValues}
      validationSchema={ValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className={bn("submission-form")}>
          <h1 className="title">{t("title")}</h1>
          <label className={bn("submission-form", "label")} htmlFor="email">
            {t("email_label")}
          </label>
          <Field
            className={bn("submission-form", "input")}
            type="email"
            name="email"
          />
          {errors.email && touched.email ? (
            <div className={bn("submission-form", "error")}>{errors.email}</div>
          ) : null}
          <label className={bn("submission-form", "label")} htmlFor="comment">
            {t("submission_label")}
          </label>
          <Field
            className={bn("submission-form", "textarea")}
            as="textarea"
            rows={4}
            type="comment"
            name="comment"
          />
          {errors.comment && touched.comment ? (
            <div className={bn("submission-form", "error")}>
              {errors.comment}
            </div>
          ) : null}
          <button
            className={bn("submission-form", "button")}
            type="submit"
            disabled={upload === "LOADING"}
          >
            {t("send")}
          </button>
          <small className={bn("submission-form", "google-disclosure")}>
            {t("recaptcha_adnotation")}{" "}
            <a
              className={bn("submission-form", "google-disclosure-link")}
              href="https://policies.google.com/privacy"
            >
              {t("recaptcha_privacy")}
            </a>{" "}
            i{" "}
            <a
              className={bn("submission-form", "google-disclosure-link")}
              href="https://policies.google.com/terms"
            >
              {t("recaptcha_terms")}
            </a>
          </small>
        </Form>
      )}
    </Formik>
  );
};

export default SubmissionForm;

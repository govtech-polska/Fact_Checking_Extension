import React, { Component } from "react";
import axios from "axios";

import {
  WEBSITE_VERIFIED,
  WEBSITE_DEFAULT,
  WEBSITE_WITHOUT_TEXT,
  WEBSITE_WITHOUT_PATCHNAME,
  WEBSITE_LOADING,
  MARKED_TEXT_IS_TOO_LONG,
} from "../enums/status";

import { PENDING, LOADING, SUCCESS, FAILURE } from "../enums/upload";

import sendRequest from "../../common/utils/sendRequest";
import captureTab from "../../common/utils/captureTab";
import apiRequest from "../../common/utils/apiRequest";

import MainPopup from "../../modules/MainPopup";
import Alert from "../../common/components/Alert";

export default class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recaptcha: null,
      upload: PENDING,
      status: WEBSITE_LOADING,
    };
  }

  async componentDidMount() {
    window.addEventListener("click", function (e) {
      if (e.target.href !== undefined) {
        chrome.tabs.create({ url: e.target.href });
      }
    });
    try {
      const isVerified = await sendRequest("VALIDATE_DOMAIN");
      if (isVerified) {
        return this.setState({ status: WEBSITE_VERIFIED });
      }
    } catch (error) {
      console.error(error);
    }

    try {
      const pathname = await sendRequest("GET_PATHNAME");
      if (pathname === "/") {
        return this.setState({
          status: WEBSITE_WITHOUT_PATCHNAME,
        });
      }
    } catch (error) {
      console.error(error);
    }

    try {
      const text = await sendRequest("GET_TEXT");
      if (text === "") {
        return this.setState({ status: WEBSITE_WITHOUT_TEXT });
      }
      if (text.length > 250) {
        return this.setState({ status: MARKED_TEXT_IS_TOO_LONG });
      }
    } catch (error) {
      console.error(error);
    }

    this.setState({ status: WEBSITE_DEFAULT });
  }

  onRecaptha = (recaptcha) => {
    this.setState({ recaptcha });
  };

  onSubmit = async ({ email, comment }) => {
    this.setState({ upload: LOADING });
    try {
      const { recaptcha } = this.state;
      const image = await captureTab();
      const url = await sendRequest("GET_URL");
      const text = await sendRequest("GET_TEXT");

      const payload = {
        email,
        comment,
        image,
        url,
        text,
        recaptcha,
      };

      const formData = new FormData();
      Object.keys(payload).forEach((key) => formData.append(key, payload[key]));
      
      const res = await apiRequest(formData);
      console.log(res);
      if (res.status === 201) {
        this.setState({ upload: SUCCESS });
      } else {
        this.setState({ upload: FAILURE });
      }
    } catch (err) {
      console.error(err);
      this.setState({ upload: FAILURE });
    }
  };

  render() {
    const { status, upload } = this.state;
    return (
      <>
        {status === WEBSITE_DEFAULT ? (
          <MainPopup
            handleSubmit={this.onSubmit}
            handleRecaptcha={(token) => this.setState({ recaptcha: token })}
            upload={upload}
          />
        ) : (
          <Alert status={status} />
        )}
      </>
    );
  }
}

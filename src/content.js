chrome.runtime.onMessage.addListener((request, options, response) => {
  const govDomainRegex = /(https?:\/\/)?(www\.)?[a-z0-9-]+\.(gov)(\.[a-z]{2,3})?/;
  switch (request.type) {
    case "VALIDATE_DOMAIN":
      response(govDomainRegex.test(window.location.href));
      return true;
    case "GET_PATHNAME":
      response(location.pathname);
      return true;
    case "GET_URL":
      response(location.href);
      return true;
    case "GET_TEXT": {
      response(window.getSelection().toString());
      return true;
    }
    case "SET_ICON": {
      if (govDomainRegex.test(window.location.href)) {
        chrome.runtime.sendMessage({
          type: "SET_TRUSTED_ICON",
        });
        return true;
      }
      chrome.runtime.sendMessage({
        type: "SET_UNSUPPORTED_ICON",
      });
      return true;
    }
    default:
      return true;
  }
});

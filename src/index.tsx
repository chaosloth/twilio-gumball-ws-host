import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { CustomizationProvider } from "@twilio-paste/core/customization";

export const Index: React.FC = (props) => {
  const customStyle = {
    fontWeights: {
      fontWeightNormal: "light",
      fontWeightMedium: "500",
      fontWeightBold: "600",
    },
  };

  const pageStyle = {
    width: "100vw",
    height: "100vh",
  };

  return (
    <div className="backgroundImage" style={pageStyle}>
      <style>
        @import url('http://fonts.cdnfonts.com/css/willy-wonka'); @import
        url('https://fonts.googleapis.com/css2?family=Nunito:wght@200&display=swap');
      </style>
      <img className="logo" alt="logo" src="twilio.png" />
      <BrowserRouter>
        <CustomizationProvider baseTheme="default" theme={customStyle}>
          <App></App>
        </CustomizationProvider>
      </BrowserRouter>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.querySelector("#root")
);

/**
 * If you want to start measuring performance in your app, pass a function
 * to log results (for example: reportWebVitals(console.log))
 * or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
 */
// eslint-disable-next-line no-console
reportWebVitals(console.log);

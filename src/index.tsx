import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Theme } from "@twilio-paste/core/theme";
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
    <div className="funkyBg" style={pageStyle}>
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

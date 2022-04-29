import React from "react";
import useWebSocket from "react-use-websocket";
import { useNavigate, useLocation } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

import { Loading } from "./components/Loading";
import { IndexPage } from "./pages/IndexPage";
import { Channels } from "./pages/Channels";
import { Sending } from "./pages/Sending";
import { OCR } from "./pages/OCR";
import { Validating } from "./pages/Validating";
import { Incorrect } from "./pages/Incorrect";
import { Dispense } from "./pages/Dispense";
import { Error } from "./pages/Error";
import { Button } from "@twilio-paste/core/button";
import { Flex, Stack, Text } from "@twilio-paste/core";

import UserContext from "./UserContext";

const App: React.FC = ({ children }) => {
  //Public API that will echo messages sent to it back to the client
  const WS_HOST = window.location.origin.replace(/^http/, "ws");

  const [socketUrl] = React.useState(WS_HOST);
  const navigate = useNavigate();
  const location = useLocation();

  const [userId, setUserId] = React.useState<string>("");
  const [name, setName] = React.useState<string>("unknown");
  const [phone, setPhone] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [lastAddress, setLastAddress] = React.useState<string>("");
  const [lastMethod, setLastMethod] = React.useState<string>("");

  const DEFAULT_TIMEOUT = 30;
  const [gameTimeout, setGameTimeoutCounter] = React.useState(DEFAULT_TIMEOUT);
  React.useEffect(() => {
    gameTimeout > 0 &&
      setTimeout(() => setGameTimeoutCounter(gameTimeout - 1), 1000);
  }, [gameTimeout]);

  const { sendMessage } = useWebSocket(socketUrl, {
    shouldReconnect: (closeEvent) => true,
    reconnectAttempts: 1000000,
    reconnectInterval: 3000,
    onOpen: () => {
      console.log("WS Opened");
    },
    onMessage: (message) => {
      try {
        console.log(message.data);
        const json = JSON.parse(message.data);
        switch (json.action) {
          case "ping":
            sendMessage(JSON.stringify({ action: "pong" }));
            break;
          case "route":
            if (json?.route) {
              console.log("Navigating to: ", json.route);
              navigate(json.route);
            }
            break;
          case "start":
            setUserId(json.user.userId);
            setName(json.user.name);
            setPhone(json.user.phone);
            setEmail(json.user.email);
            setGameTimeoutCounter(DEFAULT_TIMEOUT);
            navigate("/channels");
            break;
          case "ocr":
            navigate("/ocr");
            break;
          case "error":
            console.error("Uhh, something broken", json);
            navigate("/error");
            break;
          case "reset":
            setGameTimeoutCounter(DEFAULT_TIMEOUT);
            navigate("/");
            break;
          case "dispense":
            navigate("/dispense");
            break;
          case "incorrect":
            navigate("/incorrect");
            break;
          case "time":
            return;
          default:
            console.log("Received unknown WS JSON msg", json);
        }
      } catch (err) {
        console.error("Error parsing", err);
      }
    },
  });

  const handleManualReset = () => {
    setGameTimeoutCounter(DEFAULT_TIMEOUT);
    navigate("/");
  };

  const sendVerification = (method: string, address: string): void => {
    console.log("Requesting verification token via ", method, address);
    const request = {
      action: "generate",
      method: method,
      address: address,
      userId: userId,
    };
    setLastMethod(method);
    setLastAddress(address);
    navigate("/sending");
    sendMessage(JSON.stringify(request));
  };

  const doVerification = (token: string): void => {
    console.log("Verifying token", token);
    const request = {
      action: "verify",
      token: token,
      address: lastAddress,
      method: lastMethod,
      userId: userId,
    };
    navigate("/validating");
    sendMessage(JSON.stringify(request));
  };

  return (
    <UserContext.Provider value={{ name, phone, email, userId }}>
      <React.Suspense fallback={<Loading />}>
        <Routes>
          <Route path="" element={<IndexPage />} />
          <Route
            path="/channels"
            element={<Channels verifyVia={sendVerification} />}
          />
          <Route path="/sending" element={<Sending />} />
          <Route
            path="/ocr"
            element={<OCR onVerification={doVerification} />}
          />
          <Route path="/validating" element={<Validating />} />
          <Route path="/incorrect" element={<Incorrect />} />
          <Route path="/dispense" element={<Dispense />} />
          <Route path="/error" element={<Error />} />
        </Routes>
        <div
          style={{
            backgroundColor: "#F22F46",
            position: "fixed",
            bottom: "0px",
            width: "100vw",
            padding: "5px",
            textAlign: "center",
          }}
        >
          <Flex hAlignContent="center" vAlignContent="center">
            <Stack orientation="horizontal" spacing="space60">
              <Text style={{ fontSize: 20, color: "white" }} as="p">
                Powered by Twilio Verify
              </Text>
              <img style={{ width: 30 }} alt="twilio-logo" src="twilio.png" />
              {location.pathname !== "/" && gameTimeout <= 0 && (
                <Button variant="secondary" onClick={handleManualReset}>
                  Reset Game
                </Button>
              )}{" "}
            </Stack>
          </Flex>
        </div>
      </React.Suspense>
    </UserContext.Provider>
  );
};

export default App;

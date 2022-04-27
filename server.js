import WebSocket, { WebSocketServer } from "ws";
import express from "express";
import bodyParser from "body-parser";
import path from "path";
import tokenGenerator from "./token_generator.js";
import config from "./config.js";
import Twilio from "twilio";

console.log("*** AUTH", config);

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = Twilio(accountSid, authToken);
const dispense_duration = process.env.DISPENSE_DURATION;

const app = express();
let userDb = [];

// Web server
app.use(express.static("build"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/token/:id?", (req, res) => {
  const id = req.params.id;
  res.send(tokenGenerator(id));
});

app.post("/token", (req, res) => {
  const id = req.body.id;
  res.send(tokenGenerator(id));
});

app.get("/ping", function (req, res) {
  return res.send("pong");
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

let port = process.env.PORT || 5001;
console.log(`Listening on port ${port}`);
let server = app.listen(port);

/* Web socket server attached to express HTTP */
const wss = new WebSocketServer({ noServer: true });

wss.on("connection", (ws, req) => {
  let remoteAdd =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  ws.isAlive = true;

  console.log("WS Client connected: ", remoteAdd);
  ws.send(JSON.stringify({ action: "none", reason: "New client connected" }));

  ws.on("close", function close(code, reason) {
    ws.isAlive = false;
    console.log(
      "WS Client disconnected " +
        remoteAdd +
        " Code: " +
        code +
        " | Reason: " +
        reason
    );
  });

  ws.on("message", (data, isBinary) => {
    ws.isAlive = true;
    try {
      const message = isBinary ? data : data.toString();
      console.log("WS Message: ", message);
      const json = JSON.parse(message);

      switch (json.action) {
        case "pong":
          ws.isAlive = true;
          break;
        case "generate":
          sendUserVerificationToken(json);
          break;
        case "verify":
          performUserVerification(json);
          break;
        default:
          console.error("Unhandled WS message action", json.action);
      }
    } catch (err) {
      console.error("Processing WS message", err);
      notifyClients({ action: "error", reason: err.toString() });
    }
  });
});

const interval = setInterval(function ping() {
  wss.clients.forEach(function each(ws) {
    if (ws.isAlive === false) return ws.terminate();
    ws.isAlive = false;
    ws.send(JSON.stringify({ action: "ping" }));
  });
}, 30000);

// setInterval(() => {
//   wss.clients.forEach((client) => {
//     let payload = { action: "time", currentTime: new Date().toTimeString() };
//     client.send(JSON.stringify(payload));
//   });
// }, 2000);

const notifyClients = function (payload) {
  wss.clients.forEach((client) => {
    client.send(JSON.stringify(payload));
  });
};

const sendUserVerificationToken = function (message) {
  if (!message.method || !message.address) {
    notifyClients({ action: "error", reason: "Missing method or address" });
    return;
  }
  client.verify
    .services(process.env.VERIFICATION_SERVICE_SID)
    .verifications.create({ to: message.address, channel: message.method })
    .then((verification) => {
      console.log(
        "Sending user verification token, status:",
        verification.status
      );
      notifyClients({ action: "ocr" });
    })
    .catch(function (err) {
      console.error("Error in Twilio verify", err);
      notifyClients({ action: "error", reason: err.toString() });
    });
};

const performUserVerification = function (message) {
  if (!message.token || !message.address) {
    let reason = "Missing verfication token or address";
    console.error(reason);
    notifyClients({ action: "error", reason: r });
    return;
  }

  client.verify
    .services(process.env.VERIFICATION_SERVICE_SID)
    .verificationChecks.create({ to: message.address, code: message.token })
    .then((verification_check) => {
      console.log("Attempting to verify user, check:", verification_check);

      if (verification_check?.status == "approved") {
        notifyClients({ action: "dispense", duration: dispense_duration });
      } else {
        notifyClients({ action: "incorrect" });
      }
    })
    .catch(function (err) {
      console.error("Error in Twilio verify", err);
      notifyClients({ action: "incorrect", reason: err.toString() });
    });
};

server.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (socket) => {
    wss.emit("connection", socket, request);
  });
});

const returnError = function (res, reason, xtra = null) {
  console.error(reason);
  res.send({ status: "error", msg: reason });
};

app.post("/trigger", (req, res) => {
  // Check we have the min messages parameters
  if (
    !req.body ||
    !req.body.hasOwnProperty("type") ||
    !req.body.hasOwnProperty("userId") ||
    !req.body.hasOwnProperty("messageId")
  ) {
    returnError(res, "Incoming request missing Segment type, userId or id");
    return;
  }

  const messageId = req.body.messageId;
  const type = req.body.type;
  const userId = req.body.userId;

  switch (type) {
    case "identify":
      if (!req.body.hasOwnProperty("traits")) {
        returnError(res, "Incoming 'identify event' request missing traits");
        return;
      }
      userDb[req.body.userId] = req.body.traits;
      break;

    case "track":
      let u = userDb[req.body.userId];
      if (!u) {
        returnError(
          res,
          "User not found in db, events may be out of order",
          req.body.userId
        );
        return;
      }

      if (!req.body?.properties?.booth?.id == process.env.BOOTH_ID) {
        returnError(res, "Booth details missing or do not match", req.body);
        return;
      }
      notifyClients({ action: "start", user: userDb[userId] });
      console.log("Starting game for user", userDb[userId]);
  }
  res.send({ status: "ok", id: messageId });
});

app.post("/route", (req, res) => {
  const route = req.body.route;
  wss.clients.forEach((client) => {
    let payload = { action: "route", route: route };
    client.send(JSON.stringify(payload));
  });
  res.send({ status: "ok", route: route });
});

app.post("/reset", (req, res) => {
  notifyClients({ action: "reset" });
  res.send({ status: "ok" });
});

app.post("/dispense", (req, res) => {
  if (req.body.hasOwnProperty("duration")) {
    notifyClients({ action: "dispense", duration: req.body.duration });
  } else {
    notifyClients({ action: "dispense", duration: dispense_duration });
  }
  res.send({ status: "ok" });
});

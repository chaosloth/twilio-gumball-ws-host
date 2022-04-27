import dotenv from "dotenv";

dotenv.config();

export default {
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  TWILIO_SYNC_SERVICE_SID: process.env.TWILIO_SYNC_SERVICE_SID || "default",
  TWILIO_VERIFICATION_SERVICE_SID: process.env.TWILIO_VERIFICATION_SERVICE_SID,
};

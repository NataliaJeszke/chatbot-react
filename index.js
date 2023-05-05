const dialogflow = require("@google-cloud/dialogflow");
require("dotenv").config();
const express = require("express");

const app = express();

const config = require("./config/keys");

const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.sessionPath(
  config.googleProjectID,
  config.dialogFlowSessionID
);

app.use(express.json());

require("./routes/dialogFlowRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
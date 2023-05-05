const dialogflow = require("@google-cloud/dialogflow");
const express = require("express");

const config = require("../config/keys");

const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.sessionPath(
  config.googleProjectID,
  config.dialogFlowSessionID
);

const router = express.Router();

router.get("/", (req, res) => {
  res.send({ Hello: "World" });
});

router.post("/api/df_text_query", async (req, res) => {
  const { query, languageCode } = req.body;
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
        languageCode,
      },
    },
  };
  let responses = await sessionClient.detectIntent(request);
  res.send(responses[0].queryResult);
});

router.post("/api/df_event_query", (req, res) => {
  res.send({ do: "event query" });
});

module.exports = router;

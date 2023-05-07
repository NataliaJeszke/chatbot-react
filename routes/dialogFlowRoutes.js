// const dialogflow = require("@google-cloud/dialogflow");
// const config = require("../config/keys");
// const { query } = require("express");

// const sessionClient = new dialogflow.SessionsClient();

// const sessionPath = sessionClient.projectAgentSessionPath(
//   config.googleProjectID,
//   config.dialogFlowSessionID
// );
const chatbot = require('../chatbot/chatbot');

module.exports = (app) => {
  app.get("/", (req, res) => {
    res.send({ Hello: "World" });
  });

  app.post("/api/df_text_query", async (req, res) => {
    let responses = await chatbot.textQuery(req.body.text, req.body.userID, req.body.parameters);
    res.send(responses[0].queryResult);
  });

  app.post("/api/df_event_query", async (req, res) => {
    let response = await chatbot.eventQuery({
      event: req.body.event,
      userID: req.body.userID,
      parameters: req.body.parameters,
    });
    res.json({ response: response[0].queryResult });
  });
};

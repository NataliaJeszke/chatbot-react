const dialogflow = require("dialogflow");
const config = require("../config/keys");

const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.sessionPath(
  config.googleProjectID,
  config.dialogFlowSessionID
);

module.exports = (app) => {
  app.get("/", (req, res) => {
    res.send({ Hello: "World" });
  });

  app.post("/api/df_text_query", async (req, res) => {
    // const { query } = req.body;
    // const request = {
    //   session: sessionPath,
    //   queryInput: {
    //     text: {
    //       text: query,
    //       languageCode: req.body.languageCode,
    //     },
    //   },
    // };
    // let responses = await sessionClient.detectIntent(request);
    // res.send(responses[0].queryResult);
    res.send({ do: "fgdcfbgfc" });
  });

  app.post("/api/df_event_query", (req, res) => {
    res.send({ do: "event query" });
  });
};

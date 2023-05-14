"use strict";
const dialogflow = require("@google-cloud/dialogflow");
const config = require("../config/keys");
const structjson = require("./structjson.js");
const mongoose = require("mongoose");
const UnknownInputs = require("../models/Registration");

const projectID = config.googleProjectID;
const sessionId = config.dialogFlowSessionID;

const credentials = {
  client_email: config.googleClientEmail,
  private_key: config.googlePrivateKey,
};

const sessionClient = new dialogflow.SessionsClient({
  projectID: projectID,
  credentials: credentials,
});

module.exports = {
  textQuery: async function (text, userID, parameters = {}) {
    let sessionPath = sessionClient.projectAgentSessionPath(
      config.googleProjectID,
      config.dialogFlowSessionID + userID
    );
    let self = module.exports;
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: text,
          languageCode: config.dialogFlowSessionLanguageCode,
        },
      },
      queryParams: {
        payload: {
          data: parameters,
        },
      },
    };

    let responses = await sessionClient.detectIntent(request);
    responses = await self.handleAction(responses);
    return responses;
  },
  eventQuery: async function (event, userID, parameters = {}) {
    let sessionPath = sessionClient.projectAgentSessionPath(
      config.googleProjectID,
      config.dialogFlowSessionID + userID
    );
    let self = module.exports;
    const request = {
      session: sessionPath,
      queryInput: {
        event: {
          name: event,
          parameters: structjson.jsonToStructProto(parameters),
          languageCode: config.dialogFlowSessionLanguageCode,
        },
      },
    };

    let responses = await sessionClient.detectIntent(request);
    responses = await self.handleAction(responses);
    return responses;
  },
  handleAction: function (responses) {
    let self = module.exports;
    let queryResult = responses[0].queryResult;
    switch (queryResult.action) {
      case "input.unknown":
        if (queryResult.allRequiredParamsPresent) {
          self.saveRegistration(queryResult.queryText);
        }
        break;
    }
    return responses;
  },

  saveRegistration: async function (fields) {
    const registration = new UnknownInputs({
      text: fields,
      dateSent: Date.now(),
    });
    try {
      let reg = await registration.save();
      console.log(reg);
    } catch (err) {
      console.log(err);
    }
  },
};

'use strict'
const dialogflow = require("@google-cloud/dialogflow");
const config = require("../config/keys");
const { query } = require("express");

const sessionClient = new dialogflow.SessionsClient();

const sessionPath = sessionClient.projectAgentSessionPath(
  config.googleProjectID,
  config.dialogFlowSessionID
);

module.exports = {
    textQuery: async function (text, parameters = {}) {
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
                    data: parameters
                }
            }
          };
      
          let responses = await sessionClient.detectIntent(request);
          responses = await self.handleAction(responses)
          return responses
    },
    handleAction :function (responses){
        return responses;
    }
}
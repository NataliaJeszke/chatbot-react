import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { v4 as uuid } from "uuid";
import { Message } from "./Message";

export function Chatbot() {
  const [userText, setUserText] = useState("");
  const [messages, setMessage] = useState([]);

  const cookies = new Cookies();
  if (cookies.get("userID") === undefined) {
    cookies.set("userID", uuid(), { path: "/" });
  }
  console.log(cookies.get("userID"));
  console.log(userText);
  console.log(messages);

  async function df_text_query(userText) {
    let says = {
      speaks: "me",
      msg: {
        text: {
          text: userText,
        },
      },
    };

    setMessage(() => [...messages, says]);

    const res = await axios.post("/api/df_text_query", {
      text: userText,
      userID: cookies.get("userID"),
    });

    for (let msg of res.data.fulfillmentMessages) {
      says = {
        speaks: "librarian",
        msg: msg,
      };
      setMessage(() => [...messages, says]);
    }

    setUserText("");
  }

  async function df_event_query(event) {
    const res = await axios.post("/api/df_event_query", {
      event,
      userID: cookies.get("userID"),
    });
    for (let msg of res.data.response.fulfillmentMessages) {
      let says = {
        speaks: "librarian",
        msg: msg,
      };
      setMessage(() => [...messages, says]);
    }
  }

  useEffect(() => {
    df_text_query("Cześć");
  }, []);

  function renderMessages(messages) {
    if (messages) {
      return messages.map((message, i) => {
        return (
          <Message
            key={i}
            speaks={message.speaks}
            text={message.msg.text.text}
          />
        );
      });
    } else {
      return null;
    }
  }

  return (
    <div className="chatbot-container">
      <div className="chatbot">
        <h2>Chatbot!</h2>
        {renderMessages(messages)}
        <input
          type="text"
          value={userText}
          onChange={(event) => setUserText(event.target.value)}
        />
        <button
          className="btn waves-effect waves-light purple darken-2"
          type="submit"
          name="action"
          onClick={() => df_text_query(userText)}
        >
          Submit
          <i class="material-icons right"></i>
        </button>
      </div>
    </div>
  );
}

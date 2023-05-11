import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { v4 as uuid } from "uuid";
import { Message } from "./Message";
import "./Chatbot.css";

export function Chatbot() {

  const msgEnd = useRef(null);

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
    const userSays = {
      speaks: "me",
      msg: {
        text: {
          text: userText,
        },
      },
    };
  
    setMessage((messages) => [...messages, userSays]);
  
    const res = await axios.post("/api/df_text_query", {
      text: userText,
      userID: cookies.get("userID"),
    });
  
    let botResponded = false;
    for (let msg of res.data.fulfillmentMessages) {
      const botSays = {
        speaks: "librarian",
        msg: msg,
      };
      if (!botResponded) {
        setMessage((messages) => [...messages, botSays]);
        botResponded = true;
      }
    }
  
    setUserText("");
  }

  async function df_event_query(event) {
    const res = await axios.post("/api/df_event_query", {
      event: event,
      userID: cookies.get("userID"),
    });
    for (let msg of res.data.fulfillmentMessages) {
      let says = {
        speaks: "librarian",
        msg: msg,
      };
      setMessage(() => [...messages, says]);
    }
  }

  useEffect(() => {
    df_event_query("Witaj");

  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  function scrollToBottom() {
    msgEnd.current.scrollIntoView({ behavior: 'smooth' });
  }


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
        <h2>Hello Librarian!</h2>
        {renderMessages(messages)}
        <div ref={msgEnd} style={{float: 'left', clear: 'both'}}></div>
        <input
        className="input-field"
          type="text"
          value={userText}
          onChange={(event) => setUserText(event.target.value)}
        />
        <button
          className="btn waves-effect waves-light black"
          type="submit"
          name="action"
          onClick={() => df_text_query(userText)}
        >
          Submit
          <i className="material-icons right"></i>
        </button>
      </div>
    </div>
  );
}

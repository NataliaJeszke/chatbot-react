import { useState } from "react";
import axios from "axios";
import { Message } from "./Message";

export function Chatbot() {
  const [userMsg, setUserMsg] = useState("");
  const [messages, setMessage] = useState([]);

  console.log(userMsg);
  console.log(messages);

  async function df_text_query(userText) {
    let says = {
      speaks: "user",
      msg: {
        text: {
          text: userText,
        },
      },
    };

    setMessage(() => [...messages, says]);

    const res = await axios.post("/api/df_text_query", { text: userText });
    
    for (let msg of res.data.fulfillmentMessages) {
        says = {
            speaks: "librarian",
            msg: msg,
        };
        setMessage(() => [...messages, says]);
    }
  }

  async function df_event_query(event) {
    const res = await axios.post("/api/df_event_query", { event: event });
    for (let msg of res.data.fulfillmentMessages) {
        let says = {
            speaks: "user",
            msg: msg,
        };
        setMessage(() => [...messages, says]);
    }
  }

 function renderMessages(messages) {
    if (messages) {
        return messages.map((message, i) => {
            return <Message key={i} speaks={message.speaks} text={message.msg.text.text} />;
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
          value={userMsg}
          onChange={(event) => setUserMsg(event.target.value)}
        />
        <button
          className="btn waves-effect waves-light purple darken-2"
          type="submit"
          name="action"
          onClick={() => df_text_query(userMsg)}
        >
          Submit
          <i class="material-icons right"></i>
        </button>
      </div>
    </div>
  );
}

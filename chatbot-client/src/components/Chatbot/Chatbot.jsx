import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { v4 as uuid } from "uuid";
import { Message } from "./Message";
import { QuickReply } from "../Chatbot/QuickReplies/QuickReply";
import Card from "../Chatbot/QuickReplies/Card"
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
    msgEnd.current.scrollIntoView({ behavior: "smooth" });
  }

 function renderCards(cards) {
    return cards.map((card, i) => <Card key={i} payload={card.structValue}/>);
}

  function handleQuickReplyPayload(event, payload, text) {
    event.preventDefault();
    event.stopPropagation();

    this.df_text_query(text);
  }

  function renderOneMessage(message, i) {

    if (message.msg && message.msg.text && message.msg.text.text) {
        return <Message key={i} speaks={message.speaks} text={message.msg.text.text}/>;
    } else if (message.msg && message.msg.payload.fields.cards) { //message.msg.payload.fields.cards.listValue.values

        return <div key={i}>
            <div className="card-panel grey lighten-5 z-depth-1">
                <div style={{overflow: 'hidden'}}>
                    <div className="col s2">
                        <a href="/" className="btn-floating btn-large waves-effect waves-light red">{message.speaks}</a>
                    </div>
                    <div style={{ overflow: 'auto', overflowY: 'scroll'}}>
                        <div style={{ height: 300, width:message.msg.payload.fields.cards.listValue.values.length * 270}}>
                            {renderCards(message.msg.payload.fields.cards.listValue.values)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    } else if (message.msg &&
        message.msg.payload &&
        message.msg.payload.fields &&
        message.msg.payload.fields.quick_replies
    ) {
        return <QuickReply
            text={message.msg.payload.fields.text ? message.msg.payload.fields.text : null}
            key={i}
            replyClick={this._handleQuickReplyPayload}
            speaks={message.speaks}
            payload={message.msg.payload.fields.quick_replies.listValue.values}/>;
    }
}

  function renderMessages(returnedMessages) {
    if (returnedMessages) {
      return returnedMessages.map((message, i) => {
        return renderOneMessage(message, i);
      });
    } else {
      return null;
    }
  }

  // function renderMessages(messages) {
  //   if (messages) {
  //     return messages.map((message, i) => {
  //       return (
  //         <Message
  //           key={i}
  //           speaks={message.speaks}
  //           text={message.msg.text.text}
  //         />
  //       );
  //     });
  //   } else {
  //     return null;
  //   }
  // }

  return (
    <div className="chatbot-container">
      <div className="chatbot">
        <h2>Hello Librarian!</h2>
        {renderMessages(messages)}
        <div ref={msgEnd} style={{ float: "left", clear: "both" }}></div>
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

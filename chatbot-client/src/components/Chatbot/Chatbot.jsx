import { useState } from "react";

export function Chatbot() {
  const [userMsg, setUserMsg] = useState("");

  return (
    <div className="chatbot-container">
      <div className="chatbot">
        <h2>Chatbot!</h2>
        <input
          type="text"
          value={userMsg}
          onChange={(event) => setUserMsg(event.target.value)}
        />
        <button
          class="btn waves-effect waves-light purple darken-2"
          type="submit"
          name="action"
        >
          Submit
          <i class="material-icons right"></i>
        </button>
      </div>
    </div>
  );
}

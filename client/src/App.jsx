import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./App.css";
import { nanoid } from "nanoid";

const socket = io.connect("http://localhost:8080");

const App = () => {
  const userName = nanoid(5);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chat-app", { message, userName });
    setMessage("");
  };

  useEffect(() => {
    socket.on("chat-emit", (payload) => {
      setChat([...chat, payload]);
    });
  }, [chat]);
  return (
    <center>
      <div className="container">
        <h1 className="heading">Chat-App</h1>
        {chat.map((payload, index) => {
          return (
            <p key={index}>
              {payload.message}: <span>id: {payload.userName}</span>
            </p>
          );
        })}
        <form onSubmit={sendChat}>
          <input
            type="text"
            placeholder="Enter Message"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <button type="submit">send</button>
        </form>
      </div>
    </center>
  );
};

export default App;

import React from "react";
import { Landing } from "./pages/Landing/Landing";
import { About } from "./pages/About/About";
import { Contact } from "./pages/Contact/Contact";
import { Header } from "./pages/Header/Header";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Chatbot } from "./Chatbot/Chatbot";
import VideoBg from "../../src/assets/video-bg1.mp4";

export function App() {
  return (
    <div className="center">
      <div className="nav-container">
        <Header />
      </div>
        <div className="valign-wrapper center-align">
        <div className="container-chat" style={{ position: "relative" }}>
          <video
            autoPlay
            loop
            muted
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: "-1",
            }}
          >
            <source src={VideoBg} type="video/mp4" />
          </video>
            <div className="box">
              <Routes>
                <Route path="/" element={<Landing />} exact="true" />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </div>
            <div className="box-chatbot">
              <Chatbot />
            </div>
          </div>
        </div>
    </div>
  );
}

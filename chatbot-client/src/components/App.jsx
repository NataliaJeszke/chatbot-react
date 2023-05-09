import React from "react";
import { Landing } from "./pages/Landing/Landing";
import { About } from "./pages/About/About";
import { Contact } from "./pages/Contact/Contact";
import { Header } from "./pages/Header/Header";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Chatbot } from "./Chatbot/Chatbot";

export function App() {
  return (
    <div className="center-align purple darken-2">
      <div className="nav-container">
        <Header />
      </div>
      <div className="row">
        <div className="col s12 m8 offset-m2 l6 offset-l3 purple lighten-4">
          <div className="container">
            <div className="box">
              <Routes>
                <Route path="/" element={<Landing />} index={true} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </div>
            <div className="box">
              <Chatbot />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

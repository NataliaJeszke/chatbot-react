import React from "react";
import { Landing } from "./pages/Landing/Landing";
import { Navigation } from "./pages/Navigation/Navigation";
import { About } from "./pages/About/About";
import { Contact } from "./pages/Contact/Contact";
import { Routes, Route } from "react-router-dom";
import "./App.css";

export function App() {
  return (
    <div>
      <div className="nav-container">
      <Navigation />
      </div>
      <div className="container">
        <div>
          <Routes>
          <Route path="/" element={<Landing />} index={true} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
        <div>
          <Landing />
        </div>
      </div>
    </div>
  );
}

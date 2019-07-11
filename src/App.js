import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Machinery and equipment distributor.</p>
        <a
          className="App-link"
          href="https://www.europages.co.uk/companies/Russia/Moscow/Distributor/machinery%20and%20equipment.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          Home Page
        </a>
      </header>
    </div>
  );
}

export default App;

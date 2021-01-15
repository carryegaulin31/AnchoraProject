import './App.css';
import React from "react";

import MapContainer from "./containers/MapContainer/MapContainer"

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <a href="/" className="linkCustom">
            <img src="favicon.ico" alt="ancora-logo"></img>
            <h2>Ancora</h2>
          </a>
      </header>
      <content>
        <MapContainer />
      </content>
    </div>
  );
}

export default App;

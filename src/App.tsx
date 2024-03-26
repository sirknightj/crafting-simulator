import React from 'react';
import './App.css';
import Game from "./Game";
import {Wood} from "./data/wood";
import {Resources} from "./data/ResourceList";

function App() {
  return (
    <div className="App">
      <Game tool={Wood.tools[0]} resource={Resources.WOOD} />
    </div>
  );
}

export default App;

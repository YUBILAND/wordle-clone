import { useState, useEffect } from 'react';
import './App.css';
import Grid from './components/Grid';
import Header from './components/Header';
import Keys from './components/Keys';
import { KeyboardContext } from './Contexts/KeyboardContext';

function App() {
  // const[ letterColor, setLetterColor] = useState([]);

  const [kbColor, setKbColor] = useState([]);

  // console.log(kbColor)


  return (
    <div className="App">
      <Header />
      <KeyboardContext.Provider value={{kbColor, setKbColor}}>
        <Grid />
        <Keys />
      </KeyboardContext.Provider>
    </div>
  );
}

export default App;

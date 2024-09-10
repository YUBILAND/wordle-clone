import { useState, useEffect } from 'react';
import './App.css';
import Grid from './components/Grid';
import Header from './components/Header';
import Keys from './components/Keys';
import { KeyboardContext } from './Contexts/KeyboardContext';

function App() {
  // const[ letterColor, setLetterColor] = useState([]);

  const [kbColor, setKbColor] = useState([]);
  const [winPage, setWinPage] = useState(false)
  const [tutorial, showTutorial] = useState(false);
  const [settings, showSettings] = useState(false);

  // console.log(kbColor)


  return (
    <div className="App">
      <KeyboardContext.Provider value={{kbColor, setKbColor, winPage, setWinPage, tutorial, showTutorial, settings, showSettings}}>
        <Header />
        <Grid />
        <Keys />
      </KeyboardContext.Provider>
    </div>
  );
}

export default App;

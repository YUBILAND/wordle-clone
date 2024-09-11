import { useState, useEffect } from 'react';
import './App.css';
import Grid from './components/Grid';
import Header from './components/Header';
import Keys from './components/Keys';
import { KeyboardContext } from './Contexts/KeyboardContext';
import Login from './components/Login';
import LandingPage from './components/LandingPage';

function App() {
  // const[ letterColor, setLetterColor] = useState([]);

  const [kbColor, setKbColor] = useState([]);
  const [winPage, setWinPage] = useState(false)
  const [tutorial, showTutorial] = useState(false);
  const [settings, showSettings] = useState(false);
  const [guestMode, setGuestMode] = useState(false);
  const [userMode, setUserMode] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [token, setToken] = useState(false);

  const [login, setLogin] = useState(false);

  const [loginPage, showLoginPage] = useState(false);
  const [registerPage, showRegisterPage] = useState(false);



  if (guestMode) {

  }

  useEffect(() => {
    fetch('http://localhost:8081/users')
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
  }, [])


  return (
    <div className={`App ${darkMode ? 'bg-[#121213] text-white' : 'bg-white text-black'}`}>

      <KeyboardContext.Provider value={{kbColor, setKbColor, winPage, setWinPage, tutorial, showTutorial, settings, showSettings, guestMode, setGuestMode, userMode, setUserMode, darkMode, setDarkMode, loginPage, showLoginPage, registerPage, showRegisterPage}}>
        {!(guestMode || userMode) ? <LandingPage /> :
        <>
        <Header />
        <Grid />
        <Keys />
        </>
        }
      </KeyboardContext.Provider>
    </div>
  );
}

export default App;

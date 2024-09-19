import { useState, useEffect } from 'react';
import './App.css';
import Grid from './components/Grid';
import Header from './components/Header';
import Keys from './components/Keys';
import { KeyboardContext } from './Contexts/KeyboardContext';
import Login from './components/Login';
import LandingPage from './components/LandingPage';
import axios from 'axios';


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
  const [userID, setUserID] = useState({id: 0});
  const [win, setWin] = useState(false);
  const [guessWon, setGuessWon] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const[guesses, setGuesses] = useState({first: '', second: '', third: '', fourth: '', fifth: '', sixth: ''});
  const [guessLength, setGuessLength] = useState(0);
  const [doneHash, setDoneHash] = useState({firstDone: false, secondDone: false, thirdDone: false, fourthDone: false, fifthDone: false, sixthDone: false})
  const [canEnterHash, setCanEnterHash] = useState({firstCanEnter: false, secondCanEnter: false, thirdCanEnter: false, fourthCanEnter: false, fifthCanEnter: false, sixthCanEnter: false})
  const [wordleList, setWordleList] = useState([]);
  const [notEnough, setNotEnough] = useState(false);
  const [wrongWord, setWrongWord] = useState(false);
  const [leaderBoard, showLeaderBoard] = useState(false);
  const [accessLeaderBoard, setAccessLeaderBoard] = useState(false);
  const [clickLeaderBoard, setClickLeaderBoard] = useState(false);



  useEffect(() => {
    axios.get('http://localhost:8081/check-auth', { withCredentials: true })
    .then(res => {
       // res means token is good
        // setIsAuth(true);
      setUserMode(true);
      setCheckingAuth(false);
      // console.log(res.data.id)
      setUserID({id: res.data.id})
      // setUserID({id:})
        

    })
    .catch(err => {
      // setIsAuth(false);
      setUserMode(false);
      setGuestMode(false);
      setCheckingAuth(false);

      
    })
  }, [])


  return (
    <div className={`App ${darkMode ? 'bg-[#121213] text-white' : 'bg-white text-black'}`}>
      
      <KeyboardContext.Provider value={{kbColor, setKbColor, winPage, setWinPage, tutorial, showTutorial, settings, showSettings, guestMode, setGuestMode, userMode, setUserMode, darkMode, setDarkMode, loginPage, showLoginPage, registerPage, showRegisterPage, userID, setUserID, win, setWin, guessWon, setGuessWon, isAuth, setIsAuth, checkingAuth, setCheckingAuth, guesses, setGuesses, guessLength, setGuessLength, doneHash, setDoneHash, canEnterHash, setCanEnterHash, wordleList, setWordleList, notEnough, setNotEnough, wrongWord, setWrongWord, leaderBoard, showLeaderBoard, accessLeaderBoard, setAccessLeaderBoard, clickLeaderBoard, setClickLeaderBoard}}>
      
      
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

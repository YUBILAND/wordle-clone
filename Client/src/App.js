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
  const [userID, setUserID] = useState({id: 0, username : ''});
  const [win, setWin] = useState(false);
  const [guessWon, setGuessWon] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [guesses, setGuesses] = useState({first: '', second: '', third: '', fourth: '', fifth: '', sixth: ''});
  const [guessLength, setGuessLength] = useState(0);
  const [doneHash, setDoneHash] = useState({firstDone: false, secondDone: false, thirdDone: false, fourthDone: false, fifthDone: false, sixthDone: false})
  const [canEnterHash, setCanEnterHash] = useState({firstCanEnter: false, secondCanEnter: false, thirdCanEnter: false, fourthCanEnter: false, fifthCanEnter: false, sixthCanEnter: false})
  const [wordleList, setWordleList] = useState([]);
  const [notEnough, setNotEnough] = useState(false);
  const [wrongWord, setWrongWord] = useState(false);
  const [leaderBoard, showLeaderBoard] = useState(false);
  const [accessLeaderBoard, setAccessLeaderBoard] = useState(false);
  const [clickDisabledLeaderBoard, setClickDisabledLeaderBoard] = useState(false);
  const [userPfpPath, setUserPfpPath] = useState('');

  const [profilePage, showProfilePage] = useState(false);
  const [accessProfile, setAccessProfile] = useState(false);
  const [clickDisabledProfile, setClickDisabledProfile] = useState(false);

  const [delay, setDelay] = useState(false);

  const [colorBlind, setColorBlind] = useState(false);
  const [answer, showAnswer] = useState(false);






  useEffect(() => { //check token when refreshing
    axios.get('http://localhost:8081/check-auth', { withCredentials: true })
    .then(res => {
      setUserMode(true);
      setCheckingAuth(false);
      setUserID({id: res.data.id, username : res.data.username})
    })
    .catch(err => {
      // setIsAuth(false);
      setUserMode(false);
      setGuestMode(false);
      setCheckingAuth(false);
    })
  }, [])

  useEffect(() => { //get user pfp
    if(userID.id) { //if not 0 ie guest mode
      axios.get('http://localhost:8081/getPfp', { params: { ...userID } })
      .then(res => {
        // console.log(userID)
        // console.log(res.data.message)
        // console.log(res.data.pfp)

        if (res.data.message == "Retrieved pfp") setUserPfpPath('http://localhost:8081/uploads/' + res.data.pfp)


      })
    }
  }, [userID])


  return (
    <div className={`App  ${darkMode ? 'bg-[#121213] text-white' : 'bg-white text-black'}`}>
      
      <KeyboardContext.Provider value={{kbColor, setKbColor, winPage, setWinPage, tutorial, showTutorial, settings, showSettings, guestMode, setGuestMode, userMode, setUserMode, darkMode, setDarkMode, loginPage, showLoginPage, registerPage, showRegisterPage, userID, setUserID, win, setWin, guessWon, setGuessWon, isAuth, setIsAuth, checkingAuth, setCheckingAuth, guesses, setGuesses, guessLength, setGuessLength, doneHash, setDoneHash, canEnterHash, setCanEnterHash, wordleList, setWordleList, notEnough, setNotEnough, wrongWord, setWrongWord, leaderBoard, showLeaderBoard, accessLeaderBoard, setAccessLeaderBoard, clickDisabledLeaderBoard, setClickDisabledLeaderBoard, profilePage, showProfilePage, userPfpPath, setUserPfpPath, accessProfile, setAccessProfile, clickDisabledProfile, setClickDisabledProfile, delay, setDelay, colorBlind, setColorBlind, answer, showAnswer}}>
      
      
        {!(guestMode || userMode) ? <LandingPage /> :
        <>
          <div className={`absolute top-0 left-0 w-full z-[-10] ${darkMode ? 'bg-[#121213]' : 'bg-white' } h-[946px]`}/>

          
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

import { useState, useEffect, useRef } from 'react';
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

  const [kbColor, setKbColor] = useState(() => {
    const existingKbColor = JSON.parse(localStorage.getItem('kbColor'));
    return existingKbColor || [];
});
  const [winPage, setWinPage] = useState(false)
  const [tutorial, showTutorial] = useState(false);
  const [settings, showSettings] = useState(false);
  const [guestMode, setGuestMode] = useState(false);
  const [userMode, setUserMode] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [loginPage, showLoginPage] = useState(false);
  const [registerPage, showRegisterPage] = useState(false);
  const [userID, setUserID] = useState({id: 0, username : ''});
  const [win, setWin] = useState(() => {
    const existingWin = JSON.parse(localStorage.getItem('win'));
    return existingWin || false;
});
  const [guessWon, setGuessWon] = useState(() => {
    const existingGuessWon = JSON.parse(localStorage.getItem('guessWon'));
    return existingGuessWon || 0;
});
  const [isAuth, setIsAuth] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [guesses, setGuesses] = useState(() => {
    // Load initial state from localStorage or default to the initial object
    const existingGuesses = JSON.parse(localStorage.getItem('guesses'));
    return existingGuesses || { 
        first: '',
        second: '',
        third: '',
        fourth: '',
        fifth: '',
        sixth: '',
    };
});
  const [guessLength, setGuessLength] = useState(0);
  const [doneHash, setDoneHash] = useState(() => {
        // Load initial state from localStorage or default to the initial object
        const existingDoneHash = JSON.parse(localStorage.getItem('doneHash'));
        return existingDoneHash || {
            firstDone: false,
            secondDone: false,
            thirdDone: false,
            fourthDone: false,
            fifthDone: false,
            sixthDone: false,
        };
    });

  const [canEnterHash, setCanEnterHash] = useState({
            firstCanEnter: false, 
            secondCanEnter: false, 
            thirdCanEnter: false, 
            fourthCanEnter: false, 
            fifthCanEnter: false, 
            sixthCanEnter: false
          })
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
  const [answer, showAnswer] = useState(() => {
    const existingAnswer = JSON.parse(localStorage.getItem('answer'));
    return existingAnswer || false;
});

  const [settingsLoading, setSettingsLoading] = useState(true);

  const [enterPressed, setEnterPressed] = useState(false);
  const [removeStyle, setRemoveStyle] = useState(false);
  const [hardMode, setHardMode] = useState(false);

  const checkAuth = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_DATABASE_URL}/check-auth`, { withCredentials: true });

      setUserMode(true);
      setSettingsLoading(true);
      setCheckingAuth(false);
      setUserID({id: res.data.id, username : res.data.username})
    }
    catch (err) {
      setUserMode(false);
      setGuestMode(false);
      setCheckingAuth(false);
      console.error('Authentication check failed');

    }
  }

  useEffect(() => { //check token when refreshing
    checkAuth();
  }, [])

  useEffect(() => { //get user pfp
    if(userID.id) { //if not 0 ie guest mode
      axios.get(`${process.env.REACT_APP_DATABASE_URL}/getPfp`, { params: { ...userID } })
      .then(res => {
        if (res.data.message == "Retrieved pfp") {
          setUserPfpPath('http://localhost:8081/uploads/' + res.data.pfp);
        }
        else {
          setUserPfpPath('https://nationalkidneypartners.com/wp-content/uploads/2023/05/headshot-placeholder.webp'); //default pfp
        }
      })

      axios.get(`${process.env.REACT_APP_DATABASE_URL}/fetchSettings`, { params: { ...userID } }) //get user settings
      .then(res => {
        if (res.data.message == "Fetched settings") {
          setHardMode(res.data.hard === 1);
          setDarkMode(res.data.dark === 1);
          setColorBlind(res.data.color === 1);
          setSettingsLoading(false);
        }
      })
    }
  }, [userID])

  return (
    <div className={`App  ${darkMode ? 'bg-[#121213] text-white' : 'bg-white text-black'}`}>
      
      <KeyboardContext.Provider value={{kbColor, setKbColor, winPage, setWinPage, tutorial, showTutorial, settings, showSettings, guestMode, setGuestMode, userMode, setUserMode, darkMode, setDarkMode, loginPage, showLoginPage, registerPage, showRegisterPage, userID, setUserID, win, setWin, guessWon, setGuessWon, isAuth, setIsAuth, checkingAuth, setCheckingAuth, guesses, setGuesses, guessLength, setGuessLength, doneHash, setDoneHash, canEnterHash, setCanEnterHash, wordleList, setWordleList, notEnough, setNotEnough, wrongWord, setWrongWord, leaderBoard, showLeaderBoard, accessLeaderBoard, setAccessLeaderBoard, clickDisabledLeaderBoard, setClickDisabledLeaderBoard, profilePage, showProfilePage, userPfpPath, setUserPfpPath, accessProfile, setAccessProfile, clickDisabledProfile, setClickDisabledProfile, delay, setDelay, colorBlind, setColorBlind, answer, showAnswer, settingsLoading, setSettingsLoading, enterPressed, setEnterPressed, removeStyle, setRemoveStyle, hardMode, setHardMode}}>
      
        {!(guestMode || userMode) || settingsLoading ? <LandingPage /> : //settings loading defualt true so settings like dark mode are fetched hidden while spinning circle displayed.
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

import React, { useContext, useEffect, useRef, useState } from 'react'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import { KeyboardContext } from '../Contexts/KeyboardContext';
import Tutorial from './Tutorial';
import Settings from './Settings';
import LeaderBoard from './LeaderBoard';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import axios from 'axios';
import Profile from './Profile';
import Slide from '@mui/material/Slide';
import Zoom from '@mui/material/Zoom';
import Statistics from './Statistics';





const Header = () => {

  // -------------------VARIABLES-------------------------------

  const {winPage, setWinPage} = useContext(KeyboardContext);
  const {tutorial, showTutorial} = useContext(KeyboardContext);
  const {settings, showSettings} = useContext(KeyboardContext);
  const {leaderBoard, showLeaderBoard} = useContext(KeyboardContext);
  const {accessLeaderBoard, setAccessLeaderBoard} = useContext(KeyboardContext);
  const {clickDisabledLeaderBoard, setClickDisabledLeaderBoard} = useContext(KeyboardContext);
  const {profilePage, showProfilePage} = useContext(KeyboardContext);
  const {accessProfile, setAccessProfile} = useContext(KeyboardContext);
  const {clickDisabledProfile, setClickDisabledProfile} = useContext(KeyboardContext);
  const {guestMode, setGuestMode} = useContext(KeyboardContext);
  const {userMode, setUserMode} = useContext(KeyboardContext);
  const {darkMode} = useContext(KeyboardContext);
  const {userID, setUserID} = useContext(KeyboardContext);
  const {colorBlind, setColorBlind} = useContext(KeyboardContext);
  const {winCompliment, setWinCompliment} = useContext(KeyboardContext);
  const {doneHash, setDoneHash} = useContext(KeyboardContext);
  const {notEnough, setNotEnough} = useContext(KeyboardContext);
  const {wrongWord, setWrongWord} = useContext(KeyboardContext);
  const {missingGreen, setMissingGreen} = useContext(KeyboardContext);
  const {missingYellow, setMissingYellow} = useContext(KeyboardContext);
  const {missingGreenLetter, setMissingGreenLetter} = useContext(KeyboardContext);
  const {missingYellowLetter, setMissingYellowLetter} = useContext(KeyboardContext);
  const {delay, setDelay} = useContext(KeyboardContext);
  const {answer, showAnswer} = useContext(KeyboardContext);
  const {correctWord, setCorrectWord} = useContext(KeyboardContext)
  const {hardMode, setHardMode} = useContext(KeyboardContext);


  // -------------------FUNCTIONS-------------------------------

  function handleTutorial() {
    showTutorial(!tutorial);
  }
  function handleSettings() {
    showSettings(!settings);
  }
  function handleStats() {
    setWinPage(!winPage);
  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_DATABASE_URL}/authorized`, { withCredentials: true })
    .then(res => {
      if (res.data.auth) {
        setAccessLeaderBoard(true); 
        setAccessProfile(true);
      }
        else {
          setAccessLeaderBoard(false);
          setAccessProfile(false);
        }
    })
    .catch(err => {
      console.log(err);
    })
  }, [])

  function handleLeaderBoard() {
    if (accessLeaderBoard) showLeaderBoard(true);
    else {
      showLeaderBoard(false); 
      setClickDisabledLeaderBoard(true);
      setClickDisableLeaderboard(!clickDisableLeaderboard);
      
    }
  }

  function handleProfile() {
    if (accessProfile) {
      showProfilePage(true);
    }
    else {
      showProfilePage(false); 
      setClickDisabledProfile(true);
      setClickDisableProfile(!clickDisableProfile);
    }
  }

  function whichCompliment() { // determines which compliment to give based on how many guesses player took
      const firstTrueIndex = Object.entries(doneHash).findIndex(([key, value]) => !value);
      if (firstTrueIndex != -1) {
          return firstTrueIndex;
      } else return 6;
  }

  const compliments = [ // compliment list
      "",               
      "Genius",        
      "Magnificent",   
      "Impressive",    
      "Splendid",     
      "Great",        
      "Phew"          
  ];

  const [notifications, setNotifications] = useState([]);

  const {clickNotEnough, setClickNotEnough} = useContext(KeyboardContext);
  const clickNotEnoughRef = useRef(false);

  const {clickWrongWord, setClickWrongWord} = useContext(KeyboardContext);
  const clickWrongWordRef = useRef(false);

  const [clickDisableLeaderboard, setClickDisableLeaderboard] = useState(false);
  const clickDisableLeaderboardRef = useRef(false);

  const [clickDisableProfile, setClickDisableProfile] = useState(false);
  const clickDisableProfileRef = useRef(false);

  let newNotification = {}
  useEffect(() => {
    if (!notEnough && !wrongWord && !clickDisableLeaderboard && !clickDisableProfile) {
      return;
    }

    if (notEnough) {
      // clickNotEnoughRef.current = clickNotEnough
      newNotification = { id: Date.now(), message: 'Not enough letters'}
    }
    else if (wrongWord) {
      // clickWrongWordRef.current = clickWrongWord
      newNotification = { id: Date.now(), message: 'Not in word list'}
    }
    else if (clickDisabledLeaderBoard) {
      // clickWrongWordRef.current = clickWrongWord
      newNotification = { id: Date.now(), message: 'Login to access leaderboard'}
    }
    else if (clickDisabledProfile) {
      // clickWrongWordRef.current = clickWrongWord
      newNotification = { id: Date.now(), message: 'Login to access profile'}
    }
    // Login to access leaderboards
    setNotifications(prev => [...prev, newNotification]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(notification => notification.id !== newNotification.id))
    }, 1500)
    
    

  }, [clickNotEnough, clickWrongWord, clickDisableLeaderboard, clickDisableProfile]);

  return (
    <div className='relative w-fit mx-auto'>

      <div className='flex flex-col'>
            
            {guestMode && <div className='select-none absolute top-[60px] left-0 flex justify-center w-full'> <span className={`${colorBlind ? 'text-[#f5793a]' : 'text-green-600'} text-2xl rounded-md p-1 font-bold tracking-widest`}>Guest Mode</span> </div>}
            {userMode && <div className='select-none absolute top-[60px] left-0 flex justify-center w-full'> <button className={` ${darkMode ?'text-gray-200' : 'text-gray-500' } text-2xl rounded-md p-1 font-bold tracking-widest cursor-default`}>{userID.username}</button> </div>}
            {winCompliment && <div id='hidePls' className='absolute top-[120px] left-0 flex justify-center w-full'> <span className='bg-black rounded-md text-white p-3 font-bold tracking-[0.5px]'>{compliments[whichCompliment()] || ''}</span> </div>}
            
            
            {missingGreen && <div id='hidePls' className='absolute top-[120px] left-0 flex justify-center w-full'> <span className={`${darkMode ? 'bg-[#d7dadc] text-black' : 'bg-black text-white'} rounded-md  p-3 font-bold tracking-[0.5px]`}>Guess must contain {missingGreenLetter}</span> </div>}
            {!missingGreen && missingYellow && <div id='hidePls' className='absolute top-[120px] left-0 flex justify-center w-full'> <span className={`${darkMode ? 'bg-[#d7dadc] text-black' : 'bg-black text-white'} rounded-md  p-3 font-bold tracking-[0.5px]`}>Guess must contain {missingYellowLetter}</span> </div>}
      </div>
      {(winPage || delay )&& 
      <Zoom in={winPage} timeout={500}>
          <div className='absolute top-[250px] left-0 mx-auto w-full h-fit rounded-md shadow-xl z-20' >
              <Statistics /> 
          </div>
      </Zoom>
      }
      
      {answer && <div className='absolute top-[120px] left-0 flex justify-center w-full'> <span className='bg-black rounded-md text-white p-3 font-bold tracking-[0.5px]'>{correctWord}</span> </div>}

      <Slide direction="up" in={leaderBoard} mountOnEnter unmountOnExit timeout={300}>
        <div className='absolute top-0 left-0 z-20'> <LeaderBoard /> </div>
      </Slide>

      <Slide direction="up" in={tutorial} mountOnEnter unmountOnExit timeout={300}>
        <div className='fixed top-0 left-0 z-20'> <Tutorial /> </div>
      </Slide>

      <Slide direction="up" in={settings} mountOnEnter unmountOnExit timeout={300}>
        <div className='fixed top-0 left-0 z-20'> <Settings /> </div>
      </Slide>

      <Slide direction="up" in={profilePage} mountOnEnter unmountOnExit timeout={300}>
        <div className='fixed top-0 left-0 z-20'> <Profile /> </div>
      </Slide>

      <div className='relative text-center z-0'>

        <div className='flex items-center mx-auto w-[500px] sm:w-screen py-2 border-b border-b-gray-300 sm:px-2'>
            <div className='basis-[14%] flex justify-between'>
                <HelpOutlineIcon onClick={handleTutorial} className='text-gray-400 cursor-pointer'/>
                <LeaderboardOutlinedIcon onClick={handleLeaderBoard} className={ guestMode ? (darkMode ? 'text-gray-600' : 'text-gray-200') : 'text-gray-400 cursor-pointer' }/>
            </div>
            <div className='basis-[70%] pl-6'>
                <div className={`${hardMode && 'text-red-600'} pl-7 select-none text-center font-bold uppercase text-3xl sm:text-[calc(100vw_/_40_*_1.875)] tracking-[0.2rem] pr-4`}>Wordle Clone</div>
            </div>
            <div className='basis-[20%] flex justify-between'>
                <AccountBoxOutlinedIcon onClick={handleProfile} className={ guestMode ? (darkMode ? 'text-gray-600' : 'text-gray-200') : 'text-gray-400 cursor-pointer' }/>
                <ShowChartIcon onClick={handleStats} className='text-gray-400 cursor-pointer'/>
                <SettingsIcon onClick={handleSettings} className='text-gray-400 cursor-pointer'/>
            </div>
        </div>

        <div className='min-h-[60px]'>
        </div>
        
      </div>

      <div className='absolute left-0 right-0 mx-auto flex flex-col-reverse items-center max-w-fit z-10'>

        {notifications.map((val) => {
            return (
              <span className={`${darkMode ? 'bg-[#d7dadc] text-black' : 'bg-black text-white'} rounded-md p-3 font-bold tracking-[0.5px] mb-1`}>
                {val.message}</span> 
            )
        })}
        </div>


      {winPage && <div className={`fixed top-0 left-0 w-screen h-screen ${darkMode ? 'bg-black/50' : 'bg-white/50'} z-10`}>
              </div> }
      </div>
  )
}

export default Header
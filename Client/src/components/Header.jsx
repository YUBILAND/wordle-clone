import React, { useContext, useEffect, useState } from 'react'
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
    }
  }

  function handleProfile() {
    if (accessProfile) {
      showProfilePage(true);
    }
    else {
      showProfilePage(false); 
      setClickDisabledProfile(true);
    }
  }

  const {hardMode, setHardMode} = useContext(KeyboardContext);

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

  return (
    <>
    {guestMode && <div className='select-none absolute top-[60px] left-0 flex justify-center w-full'> <span className={`${colorBlind ? 'text-[#f5793a]' : 'text-green-600'} text-2xl rounded-md p-1 font-bold tracking-widest`}>Guest Mode</span> </div>}

    {userMode && <div className='select-none absolute top-[60px] left-0 flex justify-center w-full'> <button className={` ${darkMode ?'text-gray-200' : 'text-gray-500' } text-2xl rounded-md p-1 font-bold tracking-widest cursor-default`}>{userID.username}</button> </div>}
    
    {winCompliment && <div id='hidePls' className='absolute top-[120px] left-0 flex justify-center w-full'> <span className='bg-black rounded-md text-white p-3 font-bold tracking-[0.5px]'>{compliments[whichCompliment()] || ''}</span> </div>}

    {notEnough && <div id='hidePls' className='absolute top-[120px] left-0 flex justify-center w-full'> <span className={`${darkMode ? 'bg-[#d7dadc] text-black' : 'bg-black text-white'} rounded-md  p-3 font-bold tracking-[0.5px]`}>Not enough letters</span> </div>}

    {wrongWord && <div id='hidePls' className='absolute top-[120px] left-0 flex justify-center w-full'> <span className='bg-black rounded-md text-white p-3 font-bold tracking-[0.5px]'>Not in word list</span> </div>}

    {clickDisabledLeaderBoard && <div id='hidePls' className='absolute top-[120px] left-0 flex justify-center w-full'> <span className='bg-black rounded-md text-white p-3 font-bold tracking-[0.5px]'>Login to access leaderboards</span> </div>}

    {clickDisabledProfile && <div id='hidePls' className='absolute top-[120px] left-0 flex justify-center w-full'> <span className='bg-black rounded-md text-white p-3 font-bold tracking-[0.5px]'>Login to access profile</span> </div>}

    {missingGreen && <div id='hidePls' className='absolute top-[120px] left-0 flex justify-center w-full'> <span className={`${darkMode ? 'bg-[#d7dadc] text-black' : 'bg-black text-white'} rounded-md  p-3 font-bold tracking-[0.5px]`}>Guess must contain {missingGreenLetter}</span> </div>}

    {!missingGreen && missingYellow && <div id='hidePls' className='absolute top-[120px] left-0 flex justify-center w-full'> <span className={`${darkMode ? 'bg-[#d7dadc] text-black' : 'bg-black text-white'} rounded-md  p-3 font-bold tracking-[0.5px]`}>Guess must contain {missingYellowLetter}</span> </div>}

    {(winPage || delay )&& 
        <Zoom in={winPage} timeout={500}>
            <div className='absolute top-[250px] left-[37%] w-[500px] h-fit rounded-md shadow-xl z-20' >
                <Statistics /> 
            </div>
        </Zoom>
        }
      {winPage && <div className={`absolute top-0 left-0 w-screen h-[930px] ${darkMode ? 'bg-black/50' : 'bg-white/50'}  z-10`}>
          </div> }
      {answer && <div className='absolute top-[120px] left-0 flex justify-center w-full'> <span className='bg-black rounded-md text-white p-3 font-bold tracking-[0.5px]'>{correctWord}</span> </div>}

    <Slide direction="up" in={leaderBoard} mountOnEnter unmountOnExit timeout={300}>
      <div> <LeaderBoard /> </div>
    </Slide>

    <Slide direction="up" in={tutorial} mountOnEnter unmountOnExit timeout={300}>
      <div> <Tutorial /> </div>
    </Slide>

    <Slide direction="up" in={settings} mountOnEnter unmountOnExit timeout={300}>
      <div> <Settings /> </div>
    </Slide>

    <Slide direction="up" in={profilePage} mountOnEnter unmountOnExit timeout={300}>
      <div> <Profile /> </div>
    </Slide>


    <div className='flex items-center mx-auto w-[500px]  py-2 border-b border-b-gray-300 mb-[150px]'>
        <div className='basis-[14%] flex justify-between'>
            <HelpOutlineIcon onClick={handleTutorial} className='text-gray-400 cursor-pointer'/>
            <LeaderboardOutlinedIcon onClick={handleLeaderBoard} className={ guestMode ? (darkMode ? 'text-gray-600' : 'text-gray-200') : 'text-gray-400 cursor-pointer' }/>
        </div>
        <div className='basis-[70%] pl-6'>
            <div className={`${hardMode && 'text-red-600'} pl-7 select-none text-right font-bold uppercase text-3xl tracking-[0.2rem] pr-4`}>Wordle Clone</div>
        </div>
        <div className='basis-[20%] flex justify-between'>
            <AccountBoxOutlinedIcon onClick={handleProfile} className={ guestMode ? (darkMode ? 'text-gray-600' : 'text-gray-200') : 'text-gray-400 cursor-pointer' }/>
            <ShowChartIcon onClick={handleStats} className='text-gray-400 cursor-pointer'/>
            <SettingsIcon onClick={handleSettings} className='text-gray-400 cursor-pointer'/>
        </div>
    </div>
    
    </>

  )
}

export default Header
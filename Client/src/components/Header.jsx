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

  return (
    <>
    {guestMode && <div className='select-none absolute top-[60px] left-0 flex justify-center w-full'> <span className=' text-green-600 text-2xl rounded-md p-1 font-bold tracking-widest'>Guest Mode</span> </div>}

    {userMode && (!tutorial && !leaderBoard && !profilePage && !settings ) && <div className='select-none absolute top-[60px] left-0 flex justify-center w-full'> <button className={` ${darkMode ?'text-gray-200' : 'text-gray-500' } text-2xl rounded-md p-1 font-bold tracking-widest cursor-default`}>{userID.username}</button> </div>}
        

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


    <div className='flex items-center mx-auto w-[500px] py-2 border-b border-b-gray-300 mb-[150px]'>
        <div className='basis-[14%] flex justify-between'>
            <HelpOutlineIcon onClick={handleTutorial} className='text-gray-400 cursor-pointer'/>
            <LeaderboardOutlinedIcon onClick={handleLeaderBoard} className={ guestMode ? 'text-gray-200' : 'text-gray-400 cursor-pointer' }/>
        </div>
        <div className='basis-[70%] pl-6'>
            <div className='pl-7 select-none text-right font-bold uppercase text-3xl tracking-[0.2rem] pr-4'>Wordle Clone</div>
        </div>
        <div className='basis-[20%] flex justify-between'>
            <AccountBoxOutlinedIcon onClick={handleProfile} className={ guestMode ? 'text-gray-200' : 'text-gray-400 cursor-pointer' }/>
            <ShowChartIcon onClick={handleStats} className='text-gray-400 cursor-pointer'/>
            <SettingsIcon onClick={handleSettings} className='text-gray-400 cursor-pointer'/>
        </div>
    </div>
    
    </>

  )
}

export default Header
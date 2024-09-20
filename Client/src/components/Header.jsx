import React, { useContext, useEffect } from 'react'
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

const Header = () => {
  const {winPage, setWinPage} = useContext(KeyboardContext);
  const {tutorial, showTutorial} = useContext(KeyboardContext);
  const {settings, showSettings} = useContext(KeyboardContext);
  const {leaderBoard, showLeaderBoard} = useContext(KeyboardContext);
  const {accessLeaderBoard, setAccessLeaderBoard} = useContext(KeyboardContext);
  const {clickLeaderBoard, setClickLeaderBoard} = useContext(KeyboardContext);

  const {profilePage, showProfilePage} = useContext(KeyboardContext);
  const {accessProfile, setAccessProfile} = useContext(KeyboardContext);
  const {clickProfile, setClickProfile} = useContext(KeyboardContext);

  const {guestMode, setGuestMode} = useContext(KeyboardContext);


  function handleTutorial() {
    showTutorial(!tutorial);
  }

  function handleSettings() {
    showSettings(!settings);
  }

  function handleStats() {
    setWinPage(!winPage);
  }

  // function handleProfile() {
  //   showProfilePage(!profilePage);
  // }

  useEffect(() => {
    axios.get('http://localhost:8081/authorized', { withCredentials: true })
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
      setClickLeaderBoard(true);
    }
  }

  function handleProfile() {
    if (accessProfile) {
      showProfilePage(true);
    }
    else {
      showProfilePage(false); 
      setClickProfile(true);
    }
  }

  return (
    <>
    <div className='flex items-center mx-auto w-[500px] py-2 border-b border-b-gray-300 mb-[150px]'>
        <div className='basis-[14%] flex justify-between'>
            <HelpOutlineIcon onClick={handleTutorial} className='text-gray-400 cursor-pointer'/>
            <LeaderboardOutlinedIcon onClick={handleLeaderBoard} className={ guestMode ? 'text-gray-200' : 'text-gray-400 cursor-pointer' }/>
        </div>
        <div className='basis-[70%] pl-6'>
            <h5 className='text-right font-bold uppercase text-3xl tracking-[0.2rem] pr-4'>Wordle Clone</h5>
        </div>
        <div className='basis-[20%] flex justify-between'>
            <AccountBoxOutlinedIcon onClick={handleProfile} className={ guestMode ? 'text-gray-200' : 'text-gray-400 cursor-pointer' }/>
            <ShowChartIcon onClick={handleStats} className='text-gray-400 cursor-pointer'/>
            <SettingsIcon onClick={handleSettings} className='text-gray-400 cursor-pointer'/>
        </div>
    </div>
    {leaderBoard && <LeaderBoard />}
    {tutorial && <Tutorial />}
    {settings && <Settings />}
    {profilePage && <Profile />}
    
    </>

  )
}

export default Header
import React, { useContext, useEffect } from 'react'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import { KeyboardContext } from '../Contexts/KeyboardContext';
import Tutorial from './Tutorial';
import Settings from './Settings';
import LeaderBoard from './LeaderBoard';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import axios from 'axios';

const Header = () => {
  const {winPage, setWinPage} = useContext(KeyboardContext);
  const {tutorial, showTutorial} = useContext(KeyboardContext);
  const {settings, showSettings} = useContext(KeyboardContext);
  const {leaderBoard, showLeaderBoard} = useContext(KeyboardContext);
  const {accessLeaderBoard, setAccessLeaderBoard} = useContext(KeyboardContext);
  const {clickLeaderBoard, setClickLeaderBoard} = useContext(KeyboardContext);



  function handleTutorial() {
    showTutorial(!tutorial);
  }

  function handleSettings() {
    showSettings(!settings);
  }

  function handleStats() {
    setWinPage(!winPage)
  }

  useEffect(() => {
    axios.get('http://localhost:8081/authorized', { withCredentials: true })
    .then(res => {
      if (res.data.auth) setAccessLeaderBoard(true);
        else setAccessLeaderBoard(false);
      
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



  return (
    <>
    <div className='flex items-center mx-auto w-[500px] py-2 border-b border-b-gray-300 mb-[150px]'>
        <div className='basis-[13%] flex justify-between'>
            <HelpOutlineIcon onClick={handleTutorial} className='text-gray-400 cursor-pointer'/>
            <LeaderboardOutlinedIcon onClick={handleLeaderBoard} className='text-gray-400 cursor-pointer'/>
        </div>
        <div className='basis-[75%] pl-6'>
            <h5 className='text-center font-bold uppercase text-3xl tracking-[0.2rem] pr-4'>Wordle Clone</h5>
        </div>
        <div className='basis-[13%] flex justify-between'>
            <ShowChartIcon onClick={handleStats} className='text-gray-400 cursor-pointer'/>
            <SettingsIcon onClick={handleSettings} className='text-gray-400 cursor-pointer'/>
        </div>
    </div>
    {leaderBoard && <LeaderBoard />}
    {tutorial && <Tutorial />}
    {settings && <Settings />}
    
    </>

  )
}

export default Header
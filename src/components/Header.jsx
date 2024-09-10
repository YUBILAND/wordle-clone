import React, { useContext } from 'react'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import { KeyboardContext } from '../Contexts/KeyboardContext';
import Tutorial from './Tutorial';
import Settings from './Settings';

const Header = () => {
  const {winPage, setWinPage} = useContext(KeyboardContext);
  const {tutorial, showTutorial} = useContext(KeyboardContext);
  const {settings, showSettings} = useContext(KeyboardContext);

  function handleTutorial() {
    showTutorial(!tutorial);
  }

  function handleSettings() {
    showSettings(!settings);
  }

  function handleStats() {
    setWinPage(!winPage)
  }



  return (
    <>
    <div className='flex items-center mx-auto w-[500px] py-2 border-b border-b-gray-300 mb-[150px]'>
        <div className='basis-[5%]'>
            <HelpOutlineIcon onClick={handleTutorial} className='text-gray-400 cursor-pointer'/>
        </div>
        <div className='basis-[87%]'>
            <h5 className='text-right font-bold uppercase text-3xl tracking-[0.2rem] pr-4'>Wordle Unlimited</h5>
        </div>
        <div className='basis-[13%] flex justify-between'>
            <LeaderboardOutlinedIcon onClick={handleStats} className='text-gray-400 cursor-pointer'/>
            <SettingsIcon onClick={handleSettings} className='text-gray-400 cursor-pointer'/>
        </div>
    </div>
    {tutorial && <Tutorial />}
    {settings && <Settings />}
    </>

  )
}

export default Header
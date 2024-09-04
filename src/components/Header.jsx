import React from 'react'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';
import SettingsIcon from '@mui/icons-material/Settings';

const Header = () => {
  return (
    <div className='flex items-center mx-auto w-[500px] py-2 border-b border-b-gray-300 mb-[150px]'>
        <div className='basis-[5%]'>
            <HelpOutlineIcon className='text-gray-400'/>
        </div>
        <div className='basis-[87%]'>
            <h5 className='text-right font-bold uppercase text-3xl tracking-[0.2rem] pr-4'>Wordle Unlimited</h5>
        </div>
        <div className='basis-[13%] flex justify-between'>
            <LeaderboardOutlinedIcon className='text-gray-400'/>
            <SettingsIcon className='text-gray-400'/>
        </div>
    </div>

  )
}

export default Header
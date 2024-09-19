import React, { useContext, useEffect, useState } from 'react'
import { KeyboardContext } from '../Contexts/KeyboardContext';
import CloseIcon from '@mui/icons-material/Close';
import GridOnIcon from '@mui/icons-material/GridOn';
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import WhatshotOutlinedIcon from '@mui/icons-material/WhatshotOutlined';
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios';

const LeaderBoard = () => {
  const {leaderBoard, showLeaderBoard} = useContext(KeyboardContext);
  const {darkMode, setDarkMode} = useContext(KeyboardContext);
  const {userMode, setUserMode} = useContext(KeyboardContext);
  const {guestMode, setGuestMode} = useContext(KeyboardContext);

  const [highestStreak, setHighestSteak] = useState([]);


  function handleX() {
    showLeaderBoard(!leaderBoard);
    }

    useEffect(() => {

        axios.get('http://localhost:8081/highestStreak')
        .then(res => {
            setHighestSteak(res.data);
        })
        .catch(err => {
            console.log(err);
        })

    }, [])

    
    


  return (
    <div className={`absolute top-0 left-0 w-screen h-screen z-10 ${darkMode ? 'bg-[#121213] text-white' : 'bg-white text-black'}`}>
        <div className='w-[500px] mx-auto'>
            <div className='flex justify-between font-bold tracking-[0.5px] uppercase my-2'>
                <CloseIcon sx={{opacity: '0'}}/>
                <span>LeaderBoard</span>
                <CloseIcon className='cursor-pointer' onClick={handleX} sx={{color: '#787c7e'}}/>
            </div>

            

            <div className='border-2 border-[#787c7e] rounded-md py-4 mb-2'>
                <div className='text-center pb-4 '>
                    <span className='bg-[gold] p-2 px-3 rounded-2xl font-bold tracking-widest'>TOP WORDLERS</span>
                </div>

                <div>

                    <div className='relative flex flex-col items-center'>
                        <div className='w-[128px] h-[128px] border-2 border-[#787c7e] bg-white z-40'></div>
                        <div className='font-bold tracking-widest'>{ highestStreak.length > 0 &&highestStreak[0].username}</div>
                        {/* <div className='absolute top-[-70px] left-30 z-30'><WhatshotOutlinedIcon sx={{color: 'red', fontSize: '16rem'}}/></div> */}
                        <div className='absolute top-0 left-[400px] '> HI</div>

                    </div>

                    <div className='flex justify-around'>

                        <div className=' flex flex-col items-center'>
                            <div className='w-[128px] h-[128px] border-2 border-[#787c7e]'></div>
                            <div className='text-center font-bold tracking-widest'>{highestStreak.length > 0 && highestStreak[1].username}</div>
                        </div>

                        <div className=' flex flex-col items-center'>
                            <div className='w-[128px] h-[128px] border-2 border-[#787c7e]'></div>
                            <div className='text-center font-bold tracking-widest'>{highestStreak.length > 0 && highestStreak[2].username}</div>
                        </div>
                        
                    </div>
                </div>

            </div>

            <div className='border-2 border-[#787c7e] rounded-md py-4 '>

                <div className='text-center font-bold text-xl uppercase tracking-widest p-2 mb-2'>
                    <span className=''>Leaderboard</span>
                    
                </div>
                <hr className='w-[90%] mx-auto mb-2'/>
                <div>

                    <div className='grid grid-cols-7 gap-2 px-2'>

                        <div className='col-span-1 text-center rounded-md'>
                            <Tooltip title="Rank" arrow placement="top">
                                <LeaderboardOutlinedIcon />
                            </Tooltip>
                        </div>
                        <div className='col-span-3 text-center rounded-md'>
                            <Tooltip title="Username" arrow placement="top">
                                <PersonOutlineOutlinedIcon />
                            </Tooltip>
                        </div>
                        <div className='col-span-1 text-center rounded-md'>
                            <Tooltip title="Streak" arrow placement="top">
                                <WhatshotOutlinedIcon sx={{color: 'orange'}}/>
                            </Tooltip>
                        </div>
                        <div className='col-span-1 text-center rounded-md'>
                            <Tooltip title="Highest" arrow placement="top">
                                <WhatshotOutlinedIcon sx={{color: 'red'}}/>
                            </Tooltip>
                        </div>
                        <div className='col-span-1 text-center rounded-md'>
                            <Tooltip title="Play count" arrow placement="top">
                                <GridOnIcon />
                            </Tooltip>
                        </div>
                        
                        {highestStreak.length > 0 && highestStreak.map((val, ind) => (
                            <>
                                <div className={`col-span-1 text-center font-bold rounded-md ${ind + 1 == 1 ? 'bg-yellow-300' : ind + 1 == 2 ? 'bg-[#dce1e4]' : ind + 1 == 3 ? 'bg-orange-500' : 'bg-gray-400'}`}>
                                    {ind + 1}
                                </div>
                                <div className={`col-span-3 text-center font-bold rounded-md ${ind + 1 == 1 ? 'bg-yellow-300' : ind + 1 == 2 ? 'bg-[#dce1e4]' : ind + 1 == 3 ? 'bg-orange-500' : 'bg-gray-400'}`}>
                                    {val.username}
                                </div>
                                <div className={`col-span-1 text-center font-bold rounded-md ${ind + 1 == 1 ? 'bg-yellow-300' : ind + 1 == 2 ? 'bg-[#dce1e4]' : ind + 1 == 3 ? 'bg-orange-500' : 'bg-gray-400'}`}>
                                    {val.streak}
                                </div>
                                <div className={`col-span-1 text-center font-bold rounded-md ${ind + 1 == 1 ? 'bg-yellow-300' : ind + 1 == 2 ? 'bg-[#dce1e4]' : ind + 1 == 3 ? 'bg-orange-500' : 'bg-gray-400'}`}>
                                    {val.highest}
                                </div>
                                <div className={`col-span-1 text-center font-bold rounded-md ${ind + 1 == 1 ? 'bg-yellow-300' : ind + 1 == 2 ? 'bg-[#dce1e4]' : ind + 1 == 3 ? 'bg-orange-500' : 'bg-gray-400'}`}>
                                    {val.played}
                                </div>
                            </>
                        ))}

                        
                        
                    </div>
                </div>

            </div>

        </div>
    </div>

  )
}

export default LeaderBoard
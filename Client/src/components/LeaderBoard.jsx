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

  const [highestStreak, setHighestStreak] = useState([]);
  const [currentStreak, setCurrentStreak] = useState([]);
  const [playCount, setPlayCount] = useState([]);

  const[highestButton, setHighestButton] = useState(false);
  const[streakButton, setStreakButton] = useState(false);
  const[playedButton, setPlayedButton] = useState(false);

  const[displayed, setDisplayed] = useState([]);

  const {userID, setUserID} = useContext(KeyboardContext);

  function handleX() {
    showLeaderBoard(!leaderBoard);
    }

    useEffect(() => { // fetches leaderboard data namely highest streak
        axios.get(`${process.env.REACT_APP_DATABASE_URL}/highestStreak`)
        .then(res => {
            setHighestStreak(res.data);
            // console.log(res.data)
            // setSeeHighest(true);
        })
        .catch(err => {
            console.log(err);
        })
    }, [])

    useEffect(() => {
        if (highestStreak.length > 0) {
            setDisplayed(highestStreak); //default will show higheststreak on open
            setHighestButton(true);
            setCurrentStreak([...highestStreak].sort((a , b) => b.streak - a.streak)); //sorted by current streak
            setPlayCount([...highestStreak].sort((a , b) => b.played - a.played)) // sorted by play count
        }
    }, [highestStreak])

    function handleHighestStreak() {
        setDisplayed(highestStreak);
        setHighestButton(true);
        setStreakButton(false);
        setPlayedButton(false);

    }

    function handleCurrentStreak() {
        setDisplayed(currentStreak);
        setHighestButton(false);
        setStreakButton(true);
        setPlayedButton(false);
    }

    function handlePlayCount() {
        setDisplayed(playCount);
        setHighestButton(false);
        setStreakButton(false);
        setPlayedButton(true);
    }

    const [rankOneImg, setRankOneImg] = useState('');
    const [rankTwoImg, setRankTwoImg] = useState('');
    const [rankThreeImg, setRankThreeImg] = useState('');

    useEffect(() => { //fetch profile pics of top 3 wordlers

        [0,1,2].map((ind) => {
            if (displayed[ind])
                axios.get(`${process.env.REACT_APP_DATABASE_URL}/getPfp`, { params: { id : displayed[ind].id } })
                .then(res => {
                    if (res.data.message === 'No pfp') {
                        const defaultPfp = 'https://nationalkidneypartners.com/wp-content/uploads/2023/05/headshot-placeholder.webp';
                        ind === 0 && setRankOneImg(defaultPfp);
                        ind === 1 && setRankTwoImg(defaultPfp);
                        ind === 2 && setRankThreeImg(defaultPfp);
                    }
                    else {
                        const header = 'http://localhost:8081/uploads/'
                        ind === 0 && setRankOneImg(header + res.data.pfp);
                        ind === 1 && setRankTwoImg(header + res.data.pfp);
                        ind === 2 && setRankThreeImg(header + res.data.pfp);
                    }
                })    
                .catch(err => {
                    console.error('Error fetching data:', err);
                }) 
        })
    }, [displayed])


  return (
    <div className={`absolute top-0 left-0 w-screen h-fit z-10 ${darkMode ? 'bg-[#121213] text-white' : 'bg-white text-black'}`}>
        <div className='w-[500px] mx-auto'>
            <div className='flex justify-between font-bold tracking-widest uppercase my-2 bg-[]'>
                <CloseIcon sx={{opacity: '0'}}/>
                <button className='uppercase cursor-default select-none'>Leaderboard</button>
                <CloseIcon className='cursor-pointer' onClick={handleX} sx={{color: '#787c7e'}}/>
            </div>

            <div className='flex justify-around font-bold tracking-widest p-2 border-2 border-[#787c7e] rounded-md mb-2'>
                <button onClick={handleHighestStreak} className={`p-2 border-2 border-[#787c7e] rounded-xl cursor-pointer select-none ${highestButton && (darkMode ? 'bg-gray-200 text-black' : 'bg-yellow-400')}`}>Top Streak</button>
                <button onClick={handleCurrentStreak} className={`p-2 border-2 border-[#787c7e] rounded-xl cursor-pointer select-none ${streakButton && (darkMode ? 'bg-gray-200 text-black' : 'bg-yellow-400')}`}>Current Streak</button>
                <button onClick={handlePlayCount} className={`p-2 border-2 border-[#787c7e] rounded-xl cursor-pointer select-none ${playedButton && (darkMode ? 'bg-gray-200 text-black' : 'bg-yellow-400')}`}>Play Count</button>
            </div>

            <div className='border-2 border-[#787c7e] rounded-md pb-4 mb-2'>
                <div className='text-center pb-4 '>
                    <button className={`w-full py-4 text-2xl cursor-default select-none bg-[gold] font-bold tracking-widest ${darkMode && 'text-black'}`}>TOP WORDLERS</button>
                </div>

                <div>
                    <div className='flex flex-col items-center'>
                        { displayed[0] && <img className='w-[128px] h-[128px] border-2 border-[#787c7e] object-contain select-none' src={rankOneImg} alt="" /> }
                        <button className='font-bold tracking-widest cursor-default select-none'>{ displayed.length > 0 && displayed[0].username }</button>
                        {/* <div className='absolute top-[-70px] left-30 z-30'><WhatshotOutlinedIcon sx={{color: 'red', fontSize: '16rem'}}/></div> */}
                    </div>

                    <div className='flex justify-around'>
                        <div className=' flex flex-col items-center'>
                            { displayed[1] && <img className='w-[96px] h-[96px] border-2 border-[#787c7e] object-contain select-none' src={rankTwoImg} alt="" /> }
                            <button className='text-center font-bold tracking-widest cursor-default select-none'>{displayed.length > 0 && displayed[1].username }</button>
                        </div>

                        <div className=' flex flex-col items-center'>
                            { displayed[2] && <img className='w-[96px] h-[96px] border-2 border-[#787c7e] object-contain select-none' src={rankThreeImg} alt="" /> }
                            <button className='text-center font-bold tracking-widest cursor-default select-none'>{displayed.length > 0 && displayed[2].username }</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='border-2 border-[#787c7e] rounded-md py-4 '>

                <div className='text-center font-bold text-xl uppercase tracking-widest p-2 mb-2'>
                    <button className='text-xl uppercase tracking-widest cursor-default select-none '>Leaderboard</button>
                </div>
                <hr className='w-[90%] mx-auto mb-2'/>
                <div>
                    <div className='grid grid-cols-7 gap-2 px-2'>
                        <div className={`opacity-70 col-span-1 text-center rounded-md`}>
                            <Tooltip title="Rank" arrow placement="top">
                                <LeaderboardOutlinedIcon />
                            </Tooltip>
                        </div>
                        <div className={`opacity-70 col-span-3 text-center rounded-md`}>
                            <Tooltip title="Username" arrow placement="top">
                                <PersonOutlineOutlinedIcon />
                            </Tooltip>
                        </div>
                        <div className={`${!highestButton && 'opacity-70'} col-span-1 text-center rounded-md`}>
                            <Tooltip title="Highest" arrow placement="top">
                                <WhatshotOutlinedIcon sx={{color: 'red'}}/>
                            </Tooltip>
                        </div>
                        <div className={`${!streakButton && 'opacity-70'} col-span-1 text-center rounded-md`}>
                            <Tooltip title="Streak" arrow placement="top">
                                <WhatshotOutlinedIcon sx={{color: 'orange'}}/>
                            </Tooltip>
                        </div>
                        <div className={`${!playedButton && 'opacity-70'} col-span-1 text-center rounded-md`}>
                            <Tooltip title="Play count" arrow placement="top">
                                <GridOnIcon />
                            </Tooltip>
                        </div>
                        
                        {displayed.length > 0 && displayed.map((val, ind) => (
                            <>
                                <button className={`opacity-70 !text-black cursor-default select-none col-span-1 text-center font-bold rounded-md border-2 border-transparent ${(val.id == userID.id ) && (darkMode ? '!border-white' : '!border-black')} ${ 
                                    (ind + 1 == 1) ? 'bg-yellow-300' : 
                                    (ind + 1 == 2) ? 'bg-[#dce1e4]' : 
                                    (ind + 1 == 3) ? 'bg-orange-400' : 
                                    (val.id == userID.id) ? 'bg-white border-2 !border-black ' : 
                                    'bg-white !border-gray-300'}`}>
                                    {ind + 1}
                                </button>
                                <button className={`opacity-70 !text-black cursor-default select-none col-span-3 text-center font-bold rounded-md border-2 border-transparent ${(val.id == userID.id ) && (darkMode ? '!border-white' : '!border-black')} ${
                                    (ind + 1 == 1) ? 'bg-yellow-300' : 
                                    (ind + 1 == 2) ? 'bg-[#dce1e4]' : 
                                    (ind + 1 == 3) ? 'bg-orange-400' : 
                                    (val.id == userID.id) ? 'bg-white border-2 !border-black' : 
                                    'bg-white !border-gray-300'}`}>
                                    {val.username}
                                </button>
                                <button className={`${ !highestButton && 'opacity-70' } !text-black cursor-default select-none col-span-1 text-center font-bold rounded-md border-2 border-transparent ${(val.id == userID.id ) && (darkMode ? '!border-white' : '!border-black')} ${
                                    (ind + 1 == 1) ? 'bg-yellow-300' : 
                                    (ind + 1 == 2) ? 'bg-[#dce1e4]' : 
                                    (ind + 1 == 3) ? 'bg-orange-400' : 
                                    (val.id == userID.id) ? 'bg-white border-2 !border-black' : 
                                    'bg-white !border-gray-300 '}`}>
                                    {val.highest}
                                </button>
                                <button className={`${ !streakButton && 'opacity-70' } !text-black cursor-default select-none col-span-1 text-center font-bold rounded-md border-2 border-transparent ${(val.id == userID.id ) && (darkMode ? '!border-white' : '!border-black')} ${
                                    (ind + 1 == 1) ? 'bg-yellow-300' : 
                                    (ind + 1 == 2) ? 'bg-[#dce1e4]' : 
                                    (ind + 1 == 3) ? 'bg-orange-400' : 
                                    (val.id == userID.id) ? 'bg-white border-2 !border-black' : 
                                    'bg-white !border-gray-300 '}`}>
                                    {val.streak}
                                </button>
                                
                                <button className={`${ !playedButton && 'opacity-70' } !text-black cursor-default select-none col-span-1 text-center font-bold rounded-md border-2 border-transparent ${(val.id == userID.id ) && (darkMode ? '!border-white' : '!border-black')} ${
                                    (ind + 1 == 1) ? 'bg-yellow-300' : 
                                    (ind + 1 == 2) ? 'bg-[#dce1e4]' : 
                                    (ind + 1 == 3) ? 'bg-orange-400' : 
                                    (val.id == userID.id) ? 'bg-white border-2 !border-black' : 
                                    'bg-white !border-gray-300 '}`}>
                                    {val.played}
                                </button>
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
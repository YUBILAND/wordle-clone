import React, { useContext, useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import ReplayIcon from '@mui/icons-material/Replay';
import ShareIcon from '@mui/icons-material/Share';
import { KeyboardContext } from '../Contexts/KeyboardContext';
import axios from 'axios';

const Statistics = () => {

    const {darkMode, setDarkMode} = useContext(KeyboardContext);
    const {winPage, setWinPage} = useContext(KeyboardContext);
    const {userID, setUserID} = useContext(KeyboardContext);
    const [statsDone, setStatsDone] = useState(false);
    const [stats, setStats] = useState(
        {
            guess1: 0,
            guess2: 0,
            guess3: 0,
            guess4: 0,
            guess5: 0,
            guess6: 0,
            played: 0,
            wins: 0,
            streak: 0,
            highest: 0,
        });

    const [width, setWidth] = useState({ 
        guess1: 0,
        guess2: 0,
        guess3: 0,
        guess4: 0,
        guess5: 0,
        guess6: 0
    }); 
    const [allZeros, setAllZeros] = useState(false);
    const {delay, setDelay} = useContext(KeyboardContext);
    const {win, setWin} = useContext(KeyboardContext);
    const {answer, showAnswer} = useContext(KeyboardContext);
    const {guessWon, setGuessWon} = useContext(KeyboardContext);


    useEffect(() => {
        
        const set = new Set(Object.values(width))
        const first = [...set][0]
        
        if (set.size == 1 && first == 0) {
            setAllZeros(true);
        } else setAllZeros(false);
        
    }, [width])

    useEffect(() => {
        if(winPage) {
            axios.get(`${process.env.REACT_APP_DATABASE_URL}/getStats`, { params: { ...userID } })
            .then(res => {
                setStats(prevStats => ({
                    ...prevStats, 
                    guess1: res.data.guess1,
                    guess2: res.data.guess2,
                    guess3: res.data.guess3,
                    guess4: res.data.guess4,
                    guess5: res.data.guess5,
                    guess6: res.data.guess6,
                    played: res.data.played,
                    wins: res.data.wins,
                    streak: res.data.streak,
                    highest: res.data.highest,
                }))
                setStatsDone(true);
            })
            .catch(err => console.log(err));
        }
    }, [winPage])


    useEffect(() => {
        if (statsDone) { // if stats done updating
            Object.entries(width).map(([key]) => {
                const guessMax = Math.max(stats.guess1, stats.guess2, stats.guess3, stats.guess4, stats.guess5, stats.guess6)
                setWidth(prevWidth => ({
                    ...prevWidth,
                    [key]: 10 + Math.round( guessMax ? (stats[key] / guessMax * 100) * (100 - 10) / 100 : 0)
                })) 
            } )
        }
    }, [statsDone])

    const {guestMode, setGuestMode} = useContext(KeyboardContext);
    const {userMode, setUserMode} = useContext(KeyboardContext);


    function handleX() {
        setWinPage(false);
        setDelay(true);
    }

    function handleReplay() {
        localStorage.clear();
        if (guestMode) localStorage.setItem('guestMode', JSON.stringify('true'));
        window.location.reload();
    }

  return (
    
    <div className={`flex flex-col items-center rounded-md ${darkMode ? 'bg-[#121213] text-white' : 'bg-white text-black'} pb-4 `}>
        <div className='w-full flex justify-end  pt-4 pr-4'>
            <CloseIcon className='cursor-pointer' onClick={handleX} sx={{color: '#787c7e'}}/>
        </div>
        <button className='cursor-default select-none text-center font-bold mb-2 uppercase tracking-[0.5px]'>Statistics</button>
        <div className='grid grid-cols-4 w-[250px] mx-auto text-center mb-2 gap-x-2'>
            <button className='cursor-default select-none text-4xl'>{stats.played}</button>
            <button className='cursor-default select-none text-4xl'>{Math.round(stats.wins / stats.played * 100) || 0}</button>
            <button className='cursor-default select-none text-4xl'>{stats.streak}</button>
            <button className='cursor-default select-none text-4xl'>{stats.highest}</button>
            <button className='cursor-default select-none text-xs'>Played</button>
            <button className='cursor-default select-none text-xs'>Win %</button>
            <button className='cursor-default select-none text-xs'>Current Streak</button>
            <button className='cursor-default select-none text-xs'>Max Streak</button>
        </div>
        <button className='cursor-default select-none text-center font-bold mb-2 uppercase tracking-[0.5px]'>Guess Distribution</button>

        <div className='flex w-[400px] mx-auto mb-2'>
            <div className='flex flex-col mr-1'>
                <button className='cursor-default select-none w-fit pb-[4px]'>1</button >
                <button className='cursor-default select-none w-fit pb-[4px]'>2</button >
                <button className='cursor-default select-none w-fit pb-[4px]'>3</button >
                <button className='cursor-default select-none w-fit pb-[4px]'>4</button >
                <button className='cursor-default select-none w-fit pb-[4px]'>5</button >
                <button className='cursor-default select-none w-fit pb-[4px]'>6</button >
            </div>
            <div className='flex flex-col w-full'>
                {allZeros ? 
                <>
                <button className= 'cursor-default select-none w-[10%] pl-2 gray text-right font-bold pr-2 mb-1'>{stats.guess1}</button >
                <button className= 'cursor-default select-none w-[10%] pl-2 gray text-right font-bold pr-2 mb-1'>{stats.guess2}</button >
                <button className= 'cursor-default select-none w-[10%] pl-2 gray text-right font-bold pr-2 mb-1'>{stats.guess3}</button >
                <button className= 'cursor-default select-none w-[10%] pl-2 gray text-right font-bold pr-2 mb-1'>{stats.guess4}</button >
                <button className= 'cursor-default select-none w-[10%] pl-2 gray text-right font-bold pr-2 mb-1'>{stats.guess5}</button >
                <button className= 'cursor-default select-none w-[10%] pl-2 gray text-right font-bold pr-2 mb-1'>{stats.guess6}</button >
                </>
                :
                <>
                <button style={{ width: `${width.guess1}%` }} className= {` ${ guessWon === 1 ? 'green' : 'gray' } cursor-default select-none text-right font-bold pr-2 mb-1`}>{stats.guess1}</button>
                <button style={{ width: `${width.guess2}%` }} className= {` ${ guessWon === 2 ? 'green' : 'gray' } cursor-default select-none text-right font-bold pr-2 mb-1`}>{stats.guess2}</button>
                <button style={{ width: `${width.guess3}%` }} className= {` ${ guessWon === 3 ? 'green' : 'gray' } cursor-default select-none text-right font-bold pr-2 mb-1`}>{stats.guess3}</button>
                <button style={{ width: `${width.guess4}%` }} className= {` ${ guessWon === 4 ? 'green' : 'gray' } cursor-default select-none text-right font-bold pr-2 mb-1`}>{stats.guess4}</button>
                <button style={{ width: `${width.guess5}%` }} className= {` ${ guessWon === 5 ? 'green' : 'gray' } cursor-default select-none text-right font-bold pr-2 mb-1`}>{stats.guess5}</button>
                <button style={{ width: `${width.guess6}%` }} className= {` ${ guessWon === 6 ? 'green' : 'gray' } cursor-default select-none text-right font-bold pr-2 mb-1`}>{stats.guess6}</button>
                </>
                }
            </div>

        </div>

        { ( win || answer ) &&
            <div className='flex justify-around w-full mx-auto pb-10'>
                <div className={`border-r ${darkMode ? 'border-white' : 'border-black'} pr-10`}>

                    <button onClick={handleReplay} className='flex items-center green uppercase text-2xl px-2 rounded-md py-2'>
                        Play again!
                        <ReplayIcon/>
                    </button>
                </div>
                <div>
                    <button className='flex items-center gray uppercase  text-2xl px-2 rounded-md py-2'>
                        Share
                        <ShareIcon />
                    </button>
                </div>

            </div>
        }
    </div>
    
  )
}

export default Statistics
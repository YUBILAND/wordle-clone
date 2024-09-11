import React, { useContext } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import ReplayIcon from '@mui/icons-material/Replay';
import ShareIcon from '@mui/icons-material/Share';
import { KeyboardContext } from '../Contexts/KeyboardContext';

const Statistics = () => {

    const {winPage, setWinPage} = useContext(KeyboardContext);

    function handleX() {
        setWinPage(!winPage)
    }

    function handleReplay() {
        window.location.reload();
    }

  return (
    <>
        <div className='absolute top-[250px] w-[500px] rounded-md shadow-xl bg-white z-20'>
            <div className='text-right mt-4 pr-4'>
                <CloseIcon className='cursor-pointer' onClick={handleX} sx={{color: '#787c7e'}}/>
            </div>
            <h1 className='text-center font-bold mb-2 uppercase tracking-[0.5px]'>Statistics</h1>
            <div className='grid grid-cols-4 w-[250px] mx-auto text-center mb-2 gap-x-2'>
                <div className='text-4xl'>12</div>
                <div className='text-4xl'>67</div>
                <div className='text-4xl'>1</div>
                <div className='text-4xl'>1</div>
                <div className='text-xs'>Played</div>
                <div className='text-xs'>Win %</div>
                <div className='text-xs'>Current Streak</div>
                <div className='text-xs'>Max Streak</div>
            </div>
            <h1 className='text-center font-bold mb-2 uppercase tracking-[0.5px]'>Guess Distribution</h1>

            <div className='flex w-[400px] mx-auto mb-2'>
                <div className='flex flex-col mr-1'>
                    <span className='w-fit pb-[4px]'>1</span>
                    <span className='w-fit pb-[4px]'>2</span>
                    <span className='w-fit pb-[4px]'>3</span>
                    <span className='w-fit pb-[4px]'>4</span>
                    <span className='w-fit pb-[4px]'>5</span>
                    <span className='w-fit pb-[4px]'>6</span>
                </div>
                <div className='w-full'>
                    <h1 className= 'w-full gray text-right font-bold pr-2 mb-1'>1</h1>
                    <h1 className= 'w-full gray text-right font-bold pr-2 mb-1'>1</h1>
                    <h1 className= 'w-full gray text-right font-bold pr-2 mb-1'>1</h1>
                    <h1 className= 'w-full gray text-right font-bold pr-2 mb-1'>1</h1>
                    <h1 className= 'w-full gray text-right font-bold pr-2 mb-1'>1</h1>
                    <h1 className= 'w-full gray text-right font-bold pr-2 mb-1'>1</h1>
                </div>

            </div>

            <div className='flex justify-around w-full mx-auto mb-10'>
                <div className='border-r border-black pr-10'>

                    <button onClick={handleReplay} className='flex items-center green uppercase  text-2xl px-2 rounded-md py-2'>
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
        </div>

        <div className='absolute top-0 left-0 w-screen h-screen bg-white/50 z-10'>
        </div>
    </>
  )
}

export default Statistics
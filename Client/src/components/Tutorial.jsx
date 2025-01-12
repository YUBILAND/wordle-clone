import React, { useContext } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { KeyboardContext } from '../Contexts/KeyboardContext';

const Tutorial = () => {

    const {darkMode, setDarkMode} = useContext(KeyboardContext);
    const {tutorial, showTutorial} = useContext(KeyboardContext);
    const {colorBlind, setColorBlind} = useContext(KeyboardContext);

    function handleX () {
        showTutorial(!tutorial);
    }
  return (
    
    <div className={`absolute top-0 left-0 w-screen h-screen z-10 ${darkMode ? 'bg-[#121213] text-white' : 'bg-white text-black'}`}>
        <div className='w-[500px] sm:w-screen px-4 mx-auto select-none'>
            <div className='flex justify-between font-bold tracking-[0.5px] uppercase my-2'>
                    <CloseIcon sx={{opacity: '0'}}/>
                    <span className='select-none'>How to play</span>
                    <CloseIcon className='cursor-pointer' onClick={handleX} sx={{color: '#787c7e'}}/>
            </div>
            <div className='w-[468px] sm:w-screen mx-auto'>
                <div className='my-4'>
                    <p className='my-2 text-sm select-none'>Guess the hidden word in 6 tries.</p>
                    <p className='my-2 text-sm select-none'>Each guess must be a valid 5 letter word, you cannot enter random letters. Hit the enter button to submit the guess.</p>
                    <p className='my-2 text-sm select-none'>After your submission, the color of the tiles will change as in the examples below.</p>
                </div>
                <hr />
                <div className='my-2'>
                    <div className='font-bold my-4 select-none'>Examples</div>
                    <div className='grid grid-cols-5 w-[47%] gap-1 my-2 select-none'>
                        <div className={` ${ colorBlind ? 'CBgreen' : 'green' } text-center w-[40px] h-[40px] text-4xl font-bold `}>G</div>
                        <div className='border-2 border-gray-500 text-center w-[40px] h-[40px] text-4xl font-bold '>A</div>
                        <div className='border-2 border-gray-500 text-center w-[40px] h-[40px] text-4xl font-bold '>M</div>
                        <div className='border-2 border-gray-500 text-center w-[40px] h-[40px] text-4xl font-bold '>E</div>
                        <div className='border-2 border-gray-500 text-center w-[40px] h-[40px] text-4xl font-bold '>S</div>
                    </div>
                    <p className='flex mt-2 mb-4'>The letter&nbsp;<p className='font-bold'>G</p>&nbsp;is in the word and in the correct spot.</p>
                    <div className=' grid grid-cols-5 w-[47%] gap-1 my-2'>
                        <div className='border-2 border-gray-500 text-center w-[40px] h-[40px] text-4xl font-bold'>H</div>
                        <div className={` ${ colorBlind ? 'CByellow' : 'yellow' } text-center w-[40px] h-[40px] text-4xl font-bold`}>O</div>
                        <div className='border-2 border-gray-500 text-center w-[40px] h-[40px] text-4xl font-bold'>T</div>
                        <div className='border-2 border-gray-500 text-center w-[40px] h-[40px] text-4xl font-bold'>E</div>
                        <div className='border-2 border-gray-500 text-center w-[40px] h-[40px] text-4xl font-bold'>L</div>
                    </div>
                    <p className='flex mt-2 mb-4'>The letter&nbsp;<p className='font-bold'>O</p>&nbsp;is in the word but in the wrong spot.</p>
                    <div className='grid grid-cols-5 w-[47%] gap-1 my-2'>
                        <div className='border-2 border-gray-500 text-center w-[40px] h-[40px] text-4xl font-bold'>C</div>
                        <div className='border-2 border-gray-500 text-center w-[40px] h-[40px] text-4xl font-bold'>L</div>
                        <div className='border-2 border-gray-500 text-center w-[40px] h-[40px] text-4xl font-bold'>I</div>
                        <div className='gray text-center w-[40px] h-[40px] text-4xl font-bold'>C</div>
                        <div className='border-2 border-gray-500 text-center w-[40px] h-[40px] text-4xl font-bold'>K</div>
                    </div>
                    <p className='flex mt-2 mb-4'>The letter&nbsp;<p className='font-bold'>C</p>&nbsp;is not in the word in any spot.</p>
                </div>

                <hr />
                <div className='mt-4'>
                    <span className='font-bold'>Unlimited wordle games all day long?</span>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Tutorial
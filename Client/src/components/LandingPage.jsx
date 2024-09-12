import React, { useContext, useState } from 'react'
import { KeyboardContext } from '../Contexts/KeyboardContext'
import Login from './Login';
import Register from './Register';


const LandingPage = () => {
    const {guestMode, setGuestMode} = useContext(KeyboardContext);
    const {loginPage, showLoginPage} = useContext(KeyboardContext);
    const {registerPage, showRegisterPage} = useContext(KeyboardContext);
    const {userID, setUserID} = useContext(KeyboardContext);

    function handleLogin() {
        showLoginPage(true);
    }

    function handleRegister() {
        showRegisterPage(true);
    }

    function handleGuest() {
        // setUserID(0);
        setGuestMode(true);
    }


  return (
    <div className='absolute top-0 left-0 bg-[#e3e3e1] w-screen min-h-screen'>
        <div className='w-[500px] mx-auto mt-8'>

            <div className='flex flex-col items-center'>
                <img 
                className='w-[50px] h-[50px]'
                src="https://static01.nyt.com/images/2022/03/02/crosswords/alpha-wordle-icon-new/alpha-wordle-icon-new-smallSquare252-v3.png?format=pjpg&quality=75&auto=webp&disable=upscale" alt="" />
                <h1 className='font-bold'>Wordle</h1>
            </div>

            {loginPage ? <Login /> : registerPage ? <Register /> :

            <div className='bg-white rounded-md shadow-xl'>
                <div className='mt-[200px] text-center text-4xl font-bold py-[50px]'>
                    <div className='flex justify-around py-4'>
                        <button onClick={handleLogin} className='green rounded-3xl px-4 pb-3 pt-2'>Login</button>
                        <button onClick={handleRegister} className='green rounded-3xl px-4 pb-3 pt-2'>Register</button>
                    </div>
                    <div className='py-6'>
                        <button onClick={handleGuest} className='green rounded-3xl px-4 pb-3 pt-2 cursor-pointer'>Play as guest</button>
                    </div>
                </div>
            
            </div>
                
            }
        </div>

        
    </div>

  )
}

export default LandingPage
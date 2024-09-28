import React, { useContext, useEffect, useState } from 'react'
import { KeyboardContext } from '../Contexts/KeyboardContext'
import CloseIcon from '@mui/icons-material/Close';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const GreenSwitch = styled((props) => (
  <Switch {...props} />
))(({ theme, colorblind }) => ({ // lowercase to avoid
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: colorblind ? '#f5793a' : '#65C466',
        opacity: 1,
        border: 0,
        ...theme.applyStyles('dark', {
          backgroundColor: '#2ECA45',
        }),
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.grey[100],
      ...theme.applyStyles('dark', {
        color: theme.palette.grey[600],
      }),
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: 0.7,
      ...theme.applyStyles('dark', {
        opacity: 0.3,
      }),
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: '#878a8c',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
    ...theme.applyStyles('dark', {
      backgroundColor: '#39393D',
    }),
  },
}));

const OrangeSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: '#f5793a',
        opacity: 1,
        border: 0,
        ...theme.applyStyles('dark', {
          backgroundColor: '#2ECA45',
        }),
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.grey[100],
      ...theme.applyStyles('dark', {
        color: theme.palette.grey[600],
      }),
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: 0.7,
      ...theme.applyStyles('dark', {
        opacity: 0.3,
      }),
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: '#878a8c',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
    ...theme.applyStyles('dark', {
      backgroundColor: '#39393D',
    }),
  },
}));

const Settings = () => {

    const {settings, showSettings} = useContext(KeyboardContext);
    const {darkMode, setDarkMode} = useContext(KeyboardContext);
    const {userMode, setUserMode} = useContext(KeyboardContext);
    const {guestMode, setGuestMode} = useContext(KeyboardContext);
    const {loginPage, showLoginPage} = useContext(KeyboardContext);
    const {registerPage, showRegisterPage} = useContext(KeyboardContext);
    const {userID, setUserID} = useContext(KeyboardContext);
    const {colorBlind, setColorBlind} = useContext(KeyboardContext);



    function handleX() {
        showSettings(!settings);
    }
    
    function handleDark() {
      setDarkMode(!darkMode);
    }

    function handleColorBlind() {
      setColorBlind(!colorBlind);
    }

    function handleLogOut() {
      axios.defaults.withCredentials = true;
      axios.post('http://localhost:8081/logout', { withCredentials: true })
        .then(res => {
          console.log(res.data.message);
          
        })
        .catch(err => console.log(err))

        showSettings(false);
        setUserMode(false);
        showLoginPage(false);
        showRegisterPage(false);
      

    }

    function handleLogIn() {
      showSettings(false);
      setGuestMode(false);
      showLoginPage(true);
    }

    function handleRegister() {
      showSettings(false);
      setGuestMode(false);
      showRegisterPage(true);
    }
    function handleEraseGuestData() {
      axios.post('http://localhost:8081/eraseGuestData', userID)
        .then(res => {
            console.log(res.data.message);
        })
        .catch(err => console.log(err));
    }

    // useEffect(() => {
    //   if (darkMode) {document.body.style.setProperty('background-color', 'black', 'important'); console.log("HELLO");}
    //   else document.body.style.backgroundColor = '!white';
      
    // }, [darkMode])

  return (
    <div className={`absolute top-0 left-0 w-screen h-[1000px] z-10 ${darkMode ? 'bg-[#121213] text-white' : 'bg-white text-black'}`}>
        <div className='w-[500px] mx-auto'>
            <div className='flex justify-between font-bold tracking-[0.5px] uppercase my-2'>
                <CloseIcon sx={{opacity: '0'}}/>
                <span>Settings</span>
                <CloseIcon className='cursor-pointer' onClick={handleX} sx={{color: '#787c7e'}}/>
            </div>
            
            <div className='flex py-2'>
                <div className='basis-4/5'>
                    <div>
                        <div className='text-lg'>Hard Mode</div>
                        <div className='text-gray-500 text-xs'>Any revealed hints must be used in subsequent guesses</div>
                    </div>
                </div>
                <div className='flex basis-1/5 items-center justify-end'>
                    <FormControlLabel className='!mx-0'control={<GreenSwitch  sx={{ m: 1, transform: 'scale(0.8)'}}/>}/>
                </div>
            </div>

            <hr/>

            <div className='flex justify-between items-center py-2'>
                
                <div className='text-lg'>Dark Theme</div>
                    
                <FormControlLabel className='!mx-0' control={
                  <GreenSwitch 
                  colorblind={colorBlind ? 1 : 0} // weird that you can't use true and false bool you need either str or in for DOM
                  checked={darkMode} 
                  onChange={handleDark} 
                  focusVisibleClassName=".Mui-focusVisible" 
                  disableRipple
                  sx={{ m: 1, transform: 'scale(0.8)'}}/>}/>
                
                
            </div>

            <hr/>

            <div className='flex py-2'>
                <div className='basis-4/5'>
                    <div>
                        <div className='text-lg'>Color Blind Mode</div>
                        <div className='text-gray-500 text-xs'>High contrast colors</div>
                    </div>
                </div>
                <div className='flex basis-1/5 items-center justify-end'>
                  <FormControlLabel className='!mx-0' control={
                    <OrangeSwitch 
                    checked={colorBlind} 
                    onChange={handleColorBlind} 
                    focusVisibleClassName=".Mui-focusVisible" 
                    disableRipple
                    sx={{ m: 1, transform: 'scale(0.8)'}}/>}/>

                </div>
            </div>

            <hr/>
            
            <div className='text-right pr-2 py-4'>
                Twitter
            </div>

            <hr/>

            <div className='text-center py-4'>
              {guestMode && 
              <div className='flex justify-around'>
                <button onClick={handleLogIn} className='basis-1/2 green text-white w-full h-full py-2 mx-4 font-bold rounded-xl'>Log In</button>
                <button onClick={handleRegister} className='basis-1/2 green text-white w-full h-full py-2 mx-4 font-bold rounded-xl'>Create an account</button>
              </div>
              }
              {userMode && 
                <button onClick={handleLogOut} className='bg-red-500 text-white py-2 px-2 font-bold rounded-xl'>Sign Out</button>
              }
            </div>

            <div className='flex justify-center'>
            <button onClick={handleEraseGuestData} className='bg-red-500 text-white w-1/2 h-full py-2  font-bold rounded-xl'>Erase local data</button>


            </div>

        </div>
    </div>
  )
}

export default Settings
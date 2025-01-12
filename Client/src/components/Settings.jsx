import React, { useContext, useEffect, useRef, useState } from 'react'
import { KeyboardContext } from '../Contexts/KeyboardContext'
import CloseIcon from '@mui/icons-material/Close';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const GreenSwitch = styled(({colorblind, ...props}) => (
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
    const {hardMode, setHardMode} = useContext(KeyboardContext);
    const {doneHash, setDoneHash} = useContext(KeyboardContext);

    function handleX() {
        showSettings(!settings);
    }
    
    function handleDark() {
      setDarkMode(!darkMode);
    }

    function handleHard() {
      
      
      setHardMode(!hardMode);
    }

    const isDisabled = !hardMode && doneHash['firstDone'];

    function handleClick() {
      if (isDisabled) {
        setHardModeDisabledClick(true);
      }
    }

    function handleColorBlind() {
      setColorBlind(!colorBlind);
    }

    function handleLogOut() {
      axios.defaults.withCredentials = true;
      axios.post(`${process.env.REACT_APP_DATABASE_URL}/logout`, { withCredentials: true })
        .then(res => {
          console.log(res.data.message);
          // showSettings(false);
          // setUserMode(false);
          // showLoginPage(false);
          // showRegisterPage(false);
          window.location.reload();
          localStorage.clear();
        })
        .catch(err => console.log(err))
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
      axios.post(`${process.env.REACT_APP_DATABASE_URL}/eraseGuestData`, userID)
        .then(res => {
            console.log(res.data.message);
        })
        .catch(err => console.log(err));
    }

    const mountRef1 = useRef(false);
    const mountRef2 = useRef(false);
    const mountRef3 = useRef(false);

    useEffect(() => {
      if ( !mountRef1.current ) { // skip on initial mount
        mountRef1.current = true;
        return;
      }
        axios.post(`${process.env.REACT_APP_DATABASE_URL}/hardMode`, {hardMode : [hardMode], id : userID.id})
        .then(res => {
          console.log(res.data.message);
        })
        .catch(err => {
          console.log(err);
        });
    }, [hardMode])

    useEffect(() => {
      if ( !mountRef2.current ) { // skip on initial mount
          mountRef2.current = true;
          return;
      }
        axios.post(`${process.env.REACT_APP_DATABASE_URL}/darkMode`, {darkMode : [darkMode], id : userID.id})
        .then(res => {
          console.log(res.data.message);
        })
        .catch(err => {
          console.log(err);
        });
      
    }, [darkMode])

    useEffect(() => {
      if ( !mountRef3.current ) { // skip on initial mount
        mountRef3.current = true;
        return;
      }
        axios.post(`${process.env.REACT_APP_DATABASE_URL}/colorMode`, {colorBlind : [colorBlind], id : userID.id})
        .then(res => {
          console.log(res.data.message);
        })
        .catch(err => {
          console.log(err);
        });
    }, [colorBlind])

    const [hardModeDisabledClick, setHardModeDisabledClick] = useState(false);

    if(hardModeDisabledClick) { // show not enoguh letters prompt and fade out
      setTimeout(function() {
          document.getElementById('hidePls') && (document.getElementById('hidePls').id = 'waa');
          setHardModeDisabledClick(false);
          }, 1000);
  }

  return (
    <div className={`select-none fixed top-0 left-0 w-screen h-screen z-10 ${darkMode ? 'bg-[#121213] text-white' : 'bg-white text-black'}`}>
      {hardModeDisabledClick && <div id='hidePls' className='z-10 absolute top-[120px] left-0 flex justify-center w-full'> <span className={`${darkMode ? 'bg-[#d7dadc] text-black' : 'bg-black text-white'} rounded-md  p-3 font-bold tracking-[0.5px]`}>Hard mode can only be enabled at the start of a round</span> </div>}
        <div className='w-[500px] sm:w-screen px-4 mx-auto'>
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
                <div onClick={handleClick} className='flex basis-1/5 items-center justify-end cursor-default'>
                      <GreenSwitch 
                      disabled = {isDisabled}
                      colorblind={colorBlind}
                      checked={hardMode}
                      onChange={handleHard}
                      sx={{ m: 1, transform: 'scale(0.8)', opacity: isDisabled ? 0.5 : 1}}
                      />
                </div>
            </div>

            <hr/>

            <div className='flex justify-between items-center py-2'>
                <div className='text-lg'>Dark Theme</div>
                  <GreenSwitch 
                  colorblind={colorBlind} // weird that you can't use true and false bool you need either str or in for DOM
                  checked={darkMode} 
                  onChange={handleDark} 
                  focusVisibleClassName=".Mui-focusVisible" 
                  disableRipple
                  style={{ cursor: 'default' }}
                  sx={{ m: 1, transform: 'scale(0.8)'}}
                  />
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
                    <OrangeSwitch 
                    checked={colorBlind} 
                    onChange={handleColorBlind} 
                    focusVisibleClassName=".Mui-focusVisible" 
                    disableRipple
                    style={{ cursor: 'default' }}
                    sx={{ m: 1, transform: 'scale(0.8)'}}
                    />
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
                <button onClick={handleLogIn} className={`${colorBlind ? 'bg-[#f5793a]' : 'green'} basis-1/2 text-white w-full h-full py-2 mx-4 font-bold rounded-xl`}>Log In</button>
                <button onClick={handleRegister} className={`${colorBlind ? 'bg-[#f5793a]' : 'green'} basis-1/2 text-white w-full h-full py-2 mx-4 font-bold rounded-xl`}>Create an account</button>
              </div>
              }
              {userMode && 
                <button onClick={handleLogOut} className={`${colorBlind ? 'bg-[#871F78]' : 'bg-red-500'} text-white py-2 px-2 font-bold rounded-xl`}>Sign Out</button>
              }
            </div>

            <div className='flex justify-center'>
            <button onClick={handleEraseGuestData} className={`${colorBlind ? 'bg-[#871F78]' : 'bg-red-500'} text-white w-1/2 h-full py-2  font-bold rounded-xl`}>Erase local data</button>


            </div>

        </div>
    </div>
  )
}

export default Settings
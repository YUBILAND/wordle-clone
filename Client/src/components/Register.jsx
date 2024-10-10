import React, { useContext, useEffect, useState } from 'react'
import { KeyboardContext } from '../Contexts/KeyboardContext'
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios'

const Register = () => {
    const {registerPage, showRegisterPage} = useContext(KeyboardContext);
    const [regAcc, setRegAcc] = useState({
        username: '',
        email: '',
        password: ''
    })
    const {userMode, setUserMode} = useContext(KeyboardContext);
    const[wrong, setWrong] = useState(false);
    const {settingsLoading, setSettingsLoading} = useContext(KeyboardContext);


    function handleClose() {
        showRegisterPage(false);
    }

    const handleRegister = (event) => {
        setRegAcc({...regAcc, [event.target.name] : [event.target.value]})
    }
    
    const {setUserID} = useContext(KeyboardContext);


    const handleSubmit = (event) => {
        event.preventDefault();
        axios.defaults.withCredentials = true;
        axios.post(`${process.env.REACT_APP_DATABASE_URL}/signup`, regAcc)
        .then(res => {
            if (res.data.message == "Registered Successfully!") {
                console.log(res.data.message)
                // console.log(res.data.id)
                console.log(res.data.id)
                setUserID({id : res.data.id, username : res.data.username})
                setWrong(false);
                setUserMode(true);
                setSettingsLoading(true);
            } else { 
                setWrong(true);
            }
        })
        .catch(err => console.log(err));
    }

  return (
    <div className='mt-[150px] w-[400px] mx-auto bg-white rounded-md shadow-xl'>
        <div className='pt-2 pr-2 text-right'>
            <CloseIcon className='cursor-pointer' onClick={handleClose} sx={{color: '#787c7e'}}/>
        </div>
        <div className='w-[300px] mx-auto '>
            {wrong &&
            <div className='text-center'>
                <p className='text-red-500 font-bold'>Username or Email Taken</p>
            </div>
            }
           <form onSubmit={handleSubmit} action="">
                <div className='flex flex-col pt-5 pb-3'>
                    <span className='font-bold text-2xl pb-2'>Username:</span>
                    <input onChange={handleRegister} className='bg-[#e3e3e1] rounded-md px-2'type="text" name='username' placeholder='Enter your username:'/>
                </div>
                <div className='flex flex-col py-3'>
                    <span className='font-bold text-2xl pb-2'>Email:</span>
                    <input onChange={handleRegister} className='bg-[#e3e3e1] rounded-md px-2'type="email" name='email' placeholder='Enter your email:'/>
                </div>
                <div className='flex flex-col pt-3 pb-5'>
                    <span className='font-bold text-2xl pb-2'>Password:</span>
                    <input onChange={handleRegister} className='bg-[#e3e3e1] rounded-md px-2'type="password" name='password' placeholder='Enter your password:'/>
                </div>
                <div className='flex justify-center pt-4 pb-8'>
                    <button type="submit" className='green font-bold text-2xl rounded-md px-4 py-2'>Register</button>
                </div>
            </form>
        </div>
    </div>

  )
}

export default Register
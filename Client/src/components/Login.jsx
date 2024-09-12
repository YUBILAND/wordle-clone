import React, { useContext, useState } from 'react'
import { KeyboardContext } from '../Contexts/KeyboardContext'
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const Login = () => {

    const {loginPage, showLoginPage} = useContext(KeyboardContext);
    const [logAcc, setLogAcc] = useState({
        username: '',
        password: ''
    })
    const {userMode, setUserMode} = useContext(KeyboardContext);
    const[wrong, setWrong] = useState(false);

    function handleClose() {
        showLoginPage(false);
    }

    const handleLogin = (event) => {
        setLogAcc({...logAcc, [event.target.name] : [event.target.value]})
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/login', logAcc)
        .then(res => {
            if (res.data.message == "Logged in") {
                setWrong(false);
                showLoginPage(false);
                setUserMode(true) 
                
            } else { 
                console.log(res.data.message)
                setWrong(true);
                
            }
        })
        .catch(err => console.log(err));
        
    }
    
  return (
    <div className='mt-[200px] w-[400px] mx-auto bg-white rounded-md shadow-xl'>
        <div className='pt-2 pr-2 text-right'>
            <CloseIcon className='cursor-pointer' onClick={handleClose} sx={{color: '#787c7e'}}/>
        </div>
        <div className='w-[300px] mx-auto '>
            {wrong &&
            <div className='text-center'>
                <p className='text-red-500 font-bold'>Username or password is incorrect</p>
            </div>
            }
            <form onSubmit={handleSubmit} action="">
                <div className='flex flex-col py-3'>
                    <span className='font-bold text-2xl pb-2'>Username:</span>
                    <input onChange={handleLogin} className='bg-[#e3e3e1] rounded-md px-2'type="text" name='username' placeholder='Enter your username:'/>
                </div>
                <div className='flex flex-col pt-3 pb-5'>
                    <span className='font-bold text-2xl pb-2'>Password:</span>
                    <input onChange={handleLogin} className='bg-[#e3e3e1] rounded-md px-2'type="password" name='password' placeholder='Enter your password:'/>
                </div>
                <div className='flex justify-center pt-4 pb-8'>
                    <button type='submit' className='green font-bold text-2xl rounded-md px-4 py-2'>Login</button>
                </div>
            </form>
        </div>
    </div>

  )
}

export default Login
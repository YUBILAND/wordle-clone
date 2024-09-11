import React, { useContext } from 'react'
import { KeyboardContext } from '../Contexts/KeyboardContext'
import CloseIcon from '@mui/icons-material/Close';

const Login = () => {

    const {loginPage, showLoginPage} = useContext(KeyboardContext);

    function handleClose() {
        showLoginPage(false);
    }
    
  return (
    <div className='mt-[200px] w-[400px] mx-auto bg-white rounded-md shadow-xl'>
        <div className='pt-2 pr-2 text-right'>
            <CloseIcon className='cursor-pointer' onClick={handleClose} sx={{color: '#787c7e'}}/>
        </div>
        <div className='w-[300px] mx-auto '>
            <div className='flex flex-col py-3'>
                <span className='font-bold text-2xl pb-2'>Username:</span>
                <input className='bg-[#e3e3e1] rounded-md px-2'type="text" placeholder='Enter your username:'/>
            </div>
            <div className='flex flex-col pt-3 pb-5'>
                <span className='font-bold text-2xl pb-2'>Password:</span>
                <input className='bg-[#e3e3e1] rounded-md px-2'type="password" placeholder='Enter your password:'/>
            </div>
            <div className='flex justify-center pt-4 pb-8'>
                <button className='green font-bold text-2xl rounded-md px-4 py-2'>Login</button>
            </div>
        </div>
    </div>

  )
}

export default Login
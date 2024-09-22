import React, { useContext, useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import BrushOutlinedIcon from '@mui/icons-material/BrushOutlined';
import { KeyboardContext } from '../Contexts/KeyboardContext';
import axios from 'axios';
import Zoom from '@mui/material/Zoom';
import Tooltip from '@mui/material/Tooltip';


const Profile = () => {

    const {darkMode, setDarkMode} = useContext(KeyboardContext);
    const {profilePage, showProfilePage} = useContext(KeyboardContext);
    const {userPfpPath, setUserPfpPath} = useContext(KeyboardContext);
    const {userID, setUserID} = useContext(KeyboardContext);
    const [imgSaved, setImgSaved] = useState(false);
    const [changeName, showChangeName] = useState(false);



    function handleX() {
        showProfilePage(false);
    }

    function handleXChangeName() {
        showChangeName(false);
    }

    function handleChangeName() {
        showChangeName(true);
    }

    function handleChange(event) {
        handleSubmit(event.target.files[0])
    }

    function handleSubmit(file) {
        const formData = new FormData();
        formData.append('file', file); // Append the image file
        formData.append('id', userID.id); // Append the user ID (accessing the id property)
        
        axios.post("http://localhost:8081/uploadPfp", formData)
        .then(res => {
            // console.log(res.data)
            // console.log(res.data.img)
            setUserPfpPath('http://localhost:8081/uploads/' + res.data.img)
            setImgSaved(true);
        })
        .catch(err => {
            console.log(err);
        })
    }

    if (imgSaved) {
        setTimeout(function() {
            document.getElementById('hidePls') && (document.getElementById('hidePls').id = 'waa');
            setImgSaved(false);
            }, 2000);
    }

    

  return (
    <div>
        {/* Opaque background for when popup changeName */}
        { changeName && 
            <div className='absolute top-0 left-0 w-screen h-[1000px] bg-white/50 z-20'>
            </div>
        }
        {/* Change Name pop up */}
        <Zoom in={changeName}> 
            <div className='text-base absolute w-64 top-[30%] left-[43.5%] border-8 border-gray-200 rounded-md z-30 pb-2'>
                <div className='flex justify-between font-bold tracking-[0.5px] uppercase pb-1'>
                    <CloseIcon sx={{opacity: '0'}}/>
                    <CloseIcon className='cursor-pointer' onClick={handleXChangeName} sx={{color: '#787c7e'}}/>
                </div>
                    <div className='text-center pb-2'>
                        <button className='pb-2 font-bold tracking-widest cursor-default'>
                            Change your name
                        </button>
                        <form action="">
                            <input className='border-2 rounded-md px-2 border-gray-200' type="text" placeholder='New username'/>
                        </form>
                    </div>
            </div> 
        </Zoom>
        
        <div className={`absolute top-0 left-0 w-screen h-[1000px] z-10 ${darkMode ? 'bg-[#121213] text-white' : 'bg-white text-black'}`}>
            <div className=' w-[500px] mx-auto'>
                <div className='flex justify-between font-bold tracking-[0.5px] uppercase my-2'>
                    <CloseIcon sx={{opacity: '0'}}/>
                    <button className='uppercase tracking-[0.5px] font-bold cursor-default'>Profile</button>
                    <CloseIcon className='cursor-pointer' onClick={handleX} sx={{color: '#787c7e'}}/>
                </div>
                <div className='relative flex justify-center mt-[50px] pb-2'>
                    <form onSubmit={handleSubmit}>
                    <div className='flex justify-center items-center w-32 h-32 bg-gray-200  transition ease-in-out hover:brightness-75'>
                        {userPfpPath ? <img className='w-32 h-32 object-contain' src={userPfpPath} alt=""/> : <img className='w-32 h-32 object-contain' src='https://nationalkidneypartners.com/wp-content/uploads/2023/05/headshot-placeholder.webp' alt="" />}
                        {/* <img className='w-32 h-32 object-contain' src="/uploads/1726806169549.png" alt=""/> */}
                        <input onChange={handleChange} type="file" title="" className='absolute w-32 h-32 bg-gray-200 opacity-0 cursor-pointer'/>
                    </div>
                    </form>
                </div>

                <div className='relative w-fit mx-auto flex justify-between items-center font-bold text-2xl tracking-widest uppercase my-2'>
                    <CloseIcon sx={{opacity: '0'}}/>
                    <Tooltip title="Copy name" arrow placement="top">
                        <button className='hover:bg-gray-200 px-2 rounded-md'>{userID.username}</button>
                    </Tooltip>
                    <Tooltip title="Change Name" arrow placement="right">
                        <BrushOutlinedIcon className='cursor-pointer pl-2' onClick={handleChangeName} sx={{color: '#787c7e'}}/>
                    </Tooltip>
                </div>
                <hr />
            </div>
        </div>
    </div>
  )
}

export default Profile
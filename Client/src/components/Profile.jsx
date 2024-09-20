import React, { useContext, useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import BrushOutlinedIcon from '@mui/icons-material/BrushOutlined';
import { KeyboardContext } from '../Contexts/KeyboardContext';
import axios from 'axios';


const Profile = () => {

    const {darkMode, setDarkMode} = useContext(KeyboardContext);
    const {profilePage, showProfilePage} = useContext(KeyboardContext);
    const [changePfp, setChangePfp] = useState('');
    const {userPfpPath, setUserPfpPath} = useContext(KeyboardContext);
    const {userID, setUserID} = useContext(KeyboardContext);
    const [imgSaved, setImgSaved] = useState(false);


    function handleX() {
        showProfilePage(!profilePage);
    }

    function handleChangeName() {
        //
    }

    function handleChange(event) {
        // console.log(event.target.files[0])
        // console.log(URL.createObjectURL(event.target.files[0]));

        // setChangePfp(event.target.files[0]);
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
    <div className={`absolute top-0 left-0 w-screen h-[1000px] z-10 ${darkMode ? 'bg-[#121213] text-white' : 'bg-white text-black'}`}>
        <div className=' w-[500px] mx-auto'>
            <div className='flex justify-between font-bold tracking-[0.5px] uppercase my-2'>
                <CloseIcon sx={{opacity: '0'}}/>
                <span>Profile</span>
                <CloseIcon className='cursor-pointer' onClick={handleX} sx={{color: '#787c7e'}}/>
            </div>
            <div className='relative flex justify-center mt-[50px] pb-2'>
                {/* {imgSaved && <div id='hidePls' className='absolute top-[120px] left-0 flex justify-center w-full'> <span className='bg-black rounded-md text-white p-3 font-bold tracking-[0.5px]'>Profile picture saved</span> </div>} */}
                <form onSubmit={handleSubmit}>
                <div className='flex justify-center items-center w-32 h-32 bg-gray-200  transition ease-in-out hover:brightness-75'>
                    {userPfpPath ? <img className='w-32 h-32 object-contain' src={userPfpPath} alt=""/> : <img className='w-32 h-32 object-contain' src='https://nationalkidneypartners.com/wp-content/uploads/2023/05/headshot-placeholder.webp' alt="" />}
                    {/* <img className='w-32 h-32 object-contain' src="/uploads/1726806169549.png" alt=""/> */}
                    <input onChange={handleChange} type="file" className='absolute w-32 h-32 bg-gray-200 opacity-0 cursor-pointer'/>
                </div>
                </form>
            </div>

            <div className='w-fit mx-auto flex justify-between items-center font-bold text-2xl tracking-widest uppercase my-2'>
                <CloseIcon sx={{opacity: '0'}}/>
                <button className='cursor-default'>namae</button>
                <BrushOutlinedIcon className='cursor-pointer pl-2' onClick={handleChangeName} sx={{color: '#787c7e'}}/>
            </div>

            <hr />

            {/* <button type="submit">Upload</button> */}
            



        </div>
    </div>

  )
}

export default Profile
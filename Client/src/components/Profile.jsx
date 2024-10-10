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
    const [nameSaved, setNameSaved] = useState(false);
    const [changeName, showChangeName] = useState(false);
    const [newName, setNewName] = useState('');
    const [incorrectMsg, setIncorrectMsg] = useState({short : false, taken: false, same: false})
    



    function handleX() { //close Profile page
        showProfilePage(false);
        
    }

    function handleXChangeName() { //close change name popup
        showChangeName(false);
        setIncorrectMsg(prevState => ({
            ...prevState,
            short : false,
            taken : false, 
            same : false,
        }));
        setNewName(''); //clear state
        document.getElementById('nameField').value = ''; // clear input field
    }

    function handleClickChangeName() { // open change name popup
        showChangeName(true);
    }

    function handleChange(event) { //capture input of file for pfp
        handleSubmit(event.target.files[0])
    }

    function handleSubmit(file) { //sumbit pfp to server
        const formData = new FormData();
        formData.append('file', file); // Append the image file
        formData.append('id', userID.id); // Append the user ID (accessing the id property)
        
        axios.post(`${process.env.REACT_APP_DATABASE_URL}/uploadPfp`, formData)
        .then(res => {
            // console.log(res.data)
            // console.log(res.data.img)
            setUserPfpPath(`${process.env.REACT_APP_DATABASE_URL}/uploads/` + res.data.img)
            setImgSaved(true);
        })
        .catch(err => {
            console.log(err);
        })
    }

    if (imgSaved) { // fade animation of pfp saved
        setTimeout(function() {
            setImgSaved(false);
            }, 2000);
    }

    const handleNewName = (event) => { //capture input of new name into state newName
        setNewName(event.target.value)
    }
    
    const handleChangeName = (event) => { //on click, send to server to verify and change name
        event.preventDefault();
        if (newName.length < 3) {
            setIncorrectMsg(prevState => ({
            ...prevState,
            short : true,
            taken : false, 
            same : false,
            }));
        }
        else {
            axios.post(`${process.env.REACT_APP_DATABASE_URL}/changeName`, { id: userID.id, changedName : newName})
            .then(res => {
                console.log(res.data.message)
                if (res.data.taken) { //name already exists
                    if (res.data.same) { //already your name
                        setIncorrectMsg(prevState => ({
                            ...prevState,
                            short : false,
                            taken : false, 
                            same : true,
                        }));
                    }
                    else if (!res.data.same) { //already someone elses name
                        setIncorrectMsg(prevState => ({
                            ...prevState,
                            short : false,
                            taken : true, 
                            same : false,
                        }));
                    }
                } else {
                    //changeName
                    setNameSaved(true);
                    showChangeName(false);
                    setIncorrectMsg(prevState => ({
                        ...prevState,
                        short : false,
                        taken : false, 
                        same : false,
                    }));
                    setUserID(prevUser => ({...prevUser, username : newName}))
                    setNewName(''); // clear state
                    document.getElementById('nameField').value = ''; // clear input field
                }
            })
            .catch(err => console.log(err));
        }
    }

    if (nameSaved) { // fade animation of name change saved
        setTimeout(function() {
            setNameSaved(false);
            }, 2000);
    }
    

  return (
    <div>
        { changeName && //Opaque background for when popup changeName
            <div className={`absolute top-0 left-0 w-screen h-[930px] ${darkMode ? 'bg-black/50' : 'bg-white/50' } z-20`}>
            </div>
        }
        {/* Change Name pop up */}
        <Zoom in={changeName} > 
            <div className={`text-base absolute w-64 top-[30%] left-[43.5%] border-8 ${darkMode ? 'bg-[#121213] border-gray-400' : 'bg-white border-gray-200'} rounded-md z-30 pb-2`}>
                <div className='flex justify-between items-center tracking-wide pb-1'>
                    <CloseIcon sx={{opacity: '0'}}/>
                    <div className='text-red-500 text-sm pt-2'>{incorrectMsg.short ? 'Username too short' : incorrectMsg.taken ? 'Username already taken' : incorrectMsg.same && 'Bruh thats U'}</div>
                    <CloseIcon className='cursor-pointer' onClick={handleXChangeName} sx={{color: '#787c7e'}}/>
                </div>
                    <div className='text-center pb-2'>
                        <button className=' pb-2 font-bold tracking-widest cursor-default'>
                            Change username
                        </button>
                        <form onSubmit={handleChangeName}>
                            <input id="nameField" onChange={handleNewName} className=' !text-black border-2 rounded-md px-2 border-gray-200' type="text" placeholder='New username'/>
                        
                            <button type='submit' className=' border-4 border-gray-400 px-2 mt-3 rounded-md font-bold tracking-widest'>
                                Change
                            </button>
                        </form>  
                    </div>
            </div> 
        </Zoom>
        
        <div className={`absolute top-0 left-0 w-screen h-[930px] z-10 ${darkMode ? 'bg-[#121213] text-white' : 'bg-white text-black'}`}>
            <div className=' w-[500px] mx-auto'>
                <div className='flex justify-between font-bold tracking-[0.5px] uppercase my-2'>
                    <CloseIcon sx={{opacity: '0'}}/>
                    <button className='uppercase tracking-[0.5px] font-bold cursor-default'>Profile</button>
                    <CloseIcon className='cursor-pointer' onClick={handleX} sx={{color: '#787c7e'}}/>
                </div>
                <div  className='relative  flex justify-center'>
                    <div className={`${!imgSaved && 'opacity-0'} bg-green-200 rounded-md border-2 border-green-700 p-2`}>Profile picture saved</div>
                    <div className={`absolute ${!nameSaved && 'opacity-0'} bg-green-200 rounded-md border-2 border-green-700 p-2`}>Changed name</div>

                    
                </div>
                <div className='relative flex justify-center mt-[10px] pb-2'>
                    <form onSubmit={handleSubmit}>
                    <div className='flex justify-center items-center w-32 h-32 bg-gray-200  transition ease-in-out hover:brightness-75'>
                        <img className='w-32 h-32 object-contain' src={userPfpPath} alt=""/> 
                        {/* <img className='w-32 h-32 object-contain' src="/uploads/1726806169549.png" alt=""/> */}
                        <input onChange={handleChange} type="file" title="" className='absolute w-32 h-32 bg-gray-200 opacity-0 cursor-pointer'/>
                    </div>
                    </form>
                </div>

                <div className='relative w-fit mx-auto flex justify-between items-center font-bold text-2xl tracking-widest uppercase my-2'>
                    <CloseIcon sx={{opacity: '0'}}/>
                    <Tooltip title="Copy name" arrow placement="top">
                        <button className={`${darkMode ? 'hover:bg-gray-500' : 'hover:bg-gray-200' } px-2 rounded-md`}>{userID.username}</button>
                    </Tooltip>
                    <Tooltip title="Change Name" arrow placement="right">
                        <BrushOutlinedIcon className='cursor-pointer pl-2' onClick={handleClickChangeName} sx={{color: '#787c7e'}}/>
                    </Tooltip>
                </div>
                <hr />
            </div>
        </div>
    </div>
  )
}

export default Profile
import React, { useState, useContext, useEffect } from 'react'
import Keyboard from 'react-simple-keyboard';
import "react-simple-keyboard/build/css/index.css";
import './Keys.css'
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';
import inputMask from "simple-keyboard-input-mask";
import { KeyboardContext } from '../Contexts/KeyboardContext';

const Keys = () => {

    const [green, setGreen] = useState([]);
    const [yellow, setYellow] = useState([]);
    const [gray, setGray] = useState([]);
    const [buttonTheme, setButtonTheme] = useState([])


    const {kbColor} = useContext(KeyboardContext);
    

    // useEffect(() => {
        
        console.log(kbColor);

    //     // console.log(kbColor.length);
    //     // for (let i = 0; i < 10; i++) {
    //     //     console.log("here")
    //     // }

    // }, [kbColor])

    // const colorChange = (color) => {
    //     return (
    //     color == 'green' ?
    //         '#6aaa64'
    //     : color == 'yellow' ? 
    //         '#c9b458'
    //     : 
    //         '#787c7e'
    //     )
    // }

    useEffect(() => {

        if (kbColor) {

            kbColor.map((res) => (
                
                // console.log(Object.keys(res))
                // console.log(res[Object.keys(res)[2]])
                Object.keys(res).forEach((key) => {
                    // document.querySelector(`[data-skbtn=${key.toLowerCase()}]`).style.backgroundColor = colorChange(res[key])
                    // console.log(document.querySelector("kibord").buttonTheme[0])
                    // document.querySelector(`[data-skbtn=${key.toLowerCase()}]`).style.color = 'white'

                    res[key] == "green" 
                    ?
                    setGreen(prevKey => ([
                        ...prevKey,
                        key.toLowerCase()
                    ]))
                    :
                    res[key] == 'yellow'
                    ?
                    setYellow(prevKey => ([
                        ...prevKey,
                        key.toLowerCase()
                    ]))
                    :
                    setGray(prevKey => ([
                        ...prevKey,
                        key.toLowerCase()
                    ]))
                    

                    
                })
                // console.log(res)
            ))
        }

    }, [kbColor])

    const [greenString, setGreenString] = useState('');
    const [yellowString, setYellowString] = useState('');
    const [grayString, setGrayString] = useState('');

    useEffect(() => {

        green && setGreenString(green.join(' '))

        // if gray in yellow remove from gray
        if (yellow && gray){
            console.log(gray)
            const grayYellow = gray.filter((color) => !yellow.includes(color));
            setGrayString(grayYellow.join(' '))

        }
            //if yellow in green remove from yellow
        if ( green && yellow) {
            const yellowGreen = yellow.filter((color) => !green.includes(color));
            setYellowString(yellowGreen.join(' '))
        }   
        
        if (gray && !yellow) {
            setGrayString(gray.join(' '))
        }

        if (yellow && !gray) {
            setYellowString(yellow.join(' '))
        }

        



    }, [green, yellow, gray])


    useEffect(() => {
        

        setButtonTheme([
            {
                class: "green",
                buttons: greenString || ' '
            },
            {
                class: "yellow",
                buttons: yellowString  || ' '
            },
            {
                class: "gray",
                buttons: grayString || ' '
            },
            {
                class: "buttons",
                buttons: 'q w e r t y u i o p a s d f g h j k l ENTER z x c v b n m DEL'
            }
        ])


    
    },[greenString, yellowString, grayString])

    // useEffect(() => {
    //     if (buttonTheme.length > 0) {
    //     console.table(`buttonTheme=${buttonTheme[2]['buttons']}`)
    //     }
    // }, [buttonTheme])
    

    const kbChange = (input) => {
        console.log(input)
    }


    return (
        <div className='mx-auto w-[500px] h-[198px]'>

        <Keyboard 
        className="kibord w-full p-0"
        onChange={kbChange}
            
        modules = {[inputMask]}
        inputMask ={{
            default: {
            mask: '1235',
            regex: /^[a-zA-Z0-9_-]*$/
            }
        }}
        layout={{
            default : [
            'q w e r t y u i o p',
            'a s d f g h j k l',
            'ENTER z x c v b n m DEL'
            ]
        }}
        buttonTheme={buttonTheme}
        theme="hg-theme-default board"
        
        />
        </div>
    )
}

export default Keys
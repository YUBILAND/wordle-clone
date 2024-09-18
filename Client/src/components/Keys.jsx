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

    useEffect(() => {
        if (kbColor) {
            kbColor.map((res) => (
                Object.keys(res).forEach((key) => {
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
            // console.log(gray)
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
    
    const{guesses, setGuesses} = useContext(KeyboardContext);

    const {guessLength, setGuessLength} = useContext(KeyboardContext);


    const kbChange = (input) => {
        // if (input.slice(-1) == "L") {
            
        // } else {
            
        // }
    }

    const {doneHash, setDoneHash} = useContext(KeyboardContext);
    const {canEnterHash, setCanEnterHash} = useContext(KeyboardContext);

    const {notEnough, setNotEnough} = useContext(KeyboardContext);
    const {wrongWord, setWrongWord} = useContext(KeyboardContext);
    const {wordleList, setWordleList} = useContext(KeyboardContext);
    

    const onKeyPress = button => {
        // console.log("Button pressed", button);
        Object.entries(doneHash).some(([key, value]) => {
            const doneKey = key.replace('Done', '')
            const canEnterKey = doneKey + 'CanEnter';
            
            if (!value) {
                if (button == "DEL") {
                    setGuessLength(prevGuessLen => prevGuessLen - 1);
                    setGuesses( prevGuess => ({ ...prevGuess, [doneKey] : (prevGuess[doneKey].slice(0, prevGuess[doneKey].length - 1))}))
                } else if (button == "ENTER") {
                    if (canEnterHash[canEnterKey]) {
                        if (wordleList.includes(guesses[doneKey].toLowerCase())) {
                            setDoneHash(prevDone => ({ ...prevDone, [key]: true}));
                            setGuessLength(0);
                        } else setWrongWord(true);
                    } else setNotEnough(true);
                } else {
                    setGuessLength(prevGuessLen => prevGuessLen + 1)
                    setGuesses( prevGuess => ({ ...prevGuess, [doneKey]: (prevGuess[doneKey] + button.toUpperCase())}))
                }
                return true;
            }
            return false;
        })

            
    }

    useEffect(() => {
        // console.log(guesses.first)

    }, [guesses])


    return (
        <div className='mx-auto w-[500px] h-[198px]'>

        <Keyboard 
        className="kibord w-full p-0"
        onChange={kbChange}
        onKeyPress={onKeyPress}
            
        modules = {[inputMask]}
        inputMask ={{
            default: {
            mask: '12345',
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
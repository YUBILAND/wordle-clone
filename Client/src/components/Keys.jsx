import React, { useState, useContext, useEffect } from 'react'
import Keyboard from 'react-simple-keyboard';
import "react-simple-keyboard/build/css/index.css";
import './Keys.css'
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';
import inputMask from "simple-keyboard-input-mask";
import { KeyboardContext } from '../Contexts/KeyboardContext';

const Keys = () => {

    const {darkMode, setDarkMode} = useContext(KeyboardContext);
    const [green, setGreen] = useState([]);
    const [yellow, setYellow] = useState([]);
    const [gray, setGray] = useState([]);
    const [buttonTheme, setButtonTheme] = useState([])
    const {kbColor} = useContext(KeyboardContext);
    const {colorBlind, setColorBlind} = useContext(KeyboardContext);


    useEffect(() => { // break down guess into their color states by letter
        // console.log(kbColor)
        if (kbColor.length) {
            // kbColor.map((guess) => (
                Object.entries(kbColor.at(-1)).forEach(([letter, color]) => {
                    color == "green" 
                    ?
                    setGreen(prevKey => ([
                        ...prevKey,
                        letter.toLowerCase()
                    ]))
                    :
                    color == 'yellow'
                    ?
                    setYellow(prevKey => ([
                        ...prevKey,
                        letter.toLowerCase()
                    ]))
                    :
                    setGray(prevKey => ([
                        ...prevKey,
                        letter.toLowerCase()
                    ]))
                })
                // console.log(res)
            // ))
        }
    }, [kbColor])

    const [greenString, setGreenString] = useState('');
    const [yellowString, setYellowString] = useState('');
    const [grayString, setGrayString] = useState('');

    useEffect(() => { //overwrites previous inaccurate guess with updated color, ex. word is blimp, first guess is pupil, l is yellow, second guess plane, l is green , overwrite with green
        
        // console.log(`green is ${[...new Set(green)]}`)
        // console.log(`yellow is ${[...new Set(yellow)]}`)
        // console.log(`gray is ${[...new Set(gray)]}`)

        // whitespace is for the react keyboard readability

        green && setGreenString(green.join(' ')) //green always should be displayed

        const removeGreenfromYellow = yellow.filter((color) => !green.includes(color));
        const removeGreenfromGray = gray.filter((color) => !green.includes(color));

        const removeYellowfromGray = removeGreenfromGray.filter((color) => !removeGreenfromYellow.includes(color));

        setYellowString(removeGreenfromYellow.join(' '));
        setGrayString(removeYellowfromGray.join(' '));
        
    }, [green, yellow, gray])

    useEffect(() => { // switches color of button theme based on color blind mode
        if (colorBlind) {
            setButtonTheme(prevTheme => prevTheme.map(item => {
                if (item.class === 'green') {
                    return {
                        ...item,
                        class : 'CBgreen'
                    }
                } else if (item.class === 'yellow') {
                    return {
                        ...item,
                        class : 'CByellow'
                    }
                } else {
                    return item;
                }
            }) 
            )
        } else {
            setButtonTheme(prevTheme => prevTheme.map(item => {
                if (item.class === 'CBgreen') {
                    return {
                        ...item,
                        class : 'green'
                    }
                } else if (item.class === 'CByellow') {
                    return {
                        ...item,
                        class : 'yellow'
                    }
                } else {
                    return item;
                }
            }) 
            )
        }
    }, [colorBlind])

    useEffect(() => {
        if (darkMode) {
            setButtonTheme(prevTheme => prevTheme.map(item => {
                if (item.class === 'buttons') {
                    return {
                        ...item,
                        class : 'DMbuttons'
                    }
                } else if (item.class === 'gray') {
                    return {
                        ...item,
                        class : 'DMgray'
                    }
                }
                else {
                    return item;
                }
            }))
        } else {
            setButtonTheme(prevTheme => prevTheme.map(item => {
                if (item.class === 'DMbuttons') {
                    return {
                        ...item,
                        class : 'buttons'
                    }
                } else if (item.class === 'DMgray') {
                    return {
                        ...item,
                        class : 'gray'
                    }
                }
                else {
                    return item;
                }
            }))
        }
    }, [darkMode])
    
    useEffect(() => { //sets keyboard color on each guess rerender
        setButtonTheme([
            {
                class: `${ colorBlind ? 'CBgreen': 'green' }`,
                buttons: greenString || ' '
            },
            {
                class: `${ colorBlind ? 'CByellow': 'yellow' }`,
                buttons: yellowString  || ' '
            },
            {
                class: `${ darkMode ? 'DMgray': 'gray' }`,
                buttons: grayString || ' '
            },
            {
                class: `${ darkMode ? 'DMbuttons' : 'buttons' }`,
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
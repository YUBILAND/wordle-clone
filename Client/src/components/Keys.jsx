import React, { useState, useContext, useEffect, useRef } from 'react'
import Keyboard from 'react-simple-keyboard';
import "react-simple-keyboard/build/css/index.css";
import './Keys.css'
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';
import inputMask from "simple-keyboard-input-mask";
import { KeyboardContext } from '../Contexts/KeyboardContext';

const Keys = () => {

    const {darkMode, setDarkMode} = useContext(KeyboardContext);
    const [green, setGreen] = useState(() => {
        const existingGreen = JSON.parse(localStorage.getItem('green'));
        return existingGreen || [];
    });
    const [yellow, setYellow] = useState(() => {
        const existingYellow = JSON.parse(localStorage.getItem('yellow'));
        return existingYellow || [];
    });
    const [gray, setGray] = useState(() => {
        const existingGray = JSON.parse(localStorage.getItem('gray'));
        return existingGray || [];
    });
    const buttonTheme = useRef([{class: `${ darkMode ? 'DMbuttons' : 'buttons' }`,
        buttons: 'q w e r t y u i o p a s d f g h j k l ENTER z x c v b n m DEL'}])

    const {kbColor} = useContext(KeyboardContext);
    const {colorBlind, setColorBlind} = useContext(KeyboardContext);

    useEffect(() => { // break down guess into their color states by letter
        if (kbColor.length) {
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
        }
    }, [kbColor])

    const [greenString, setGreenString] = useState('');
    const [yellowString, setYellowString] = useState('');
    const [grayString, setGrayString] = useState('');

    const [update, setUpdate] = useState(false);

    const {leftWiggle, setLeftWiggle} = useContext(KeyboardContext);
    const {rightWiggle, setRightWiggle} = useContext(KeyboardContext);

    useEffect(() => { //overwrites previous inaccurate guess with updated color, ex. word is blimp, first guess is pupil, l is yellow, second guess plane, l is green , overwrite with green
        
        // console.log(`green is ${[...new Set(green)]}`)
        // console.log(`yellow is ${[...new Set(yellow)]}`)
        // console.log(`gray is ${[...new Set(gray)]}`)

        // whitespace is for the react keyboard readability
        // console.log('green is ', green)
        // console.log('yellow is ', yellow)
        // console.log('gray is ', new Set(gray))

        //green
        const existingGreen = JSON.parse(localStorage.getItem('green')) || [];
        if (JSON.stringify(existingGreen) !== JSON.stringify(green)) localStorage.setItem('green', JSON.stringify(Array.from(new Set(green))));

        const existingYellow = JSON.parse(localStorage.getItem('yellow')) || [];
        if (JSON.stringify(existingYellow) !== JSON.stringify(yellow)) localStorage.setItem('yellow', JSON.stringify(Array.from(new Set(yellow))));

        const existingGray = JSON.parse(localStorage.getItem('gray')) || [];
        if (JSON.stringify(existingGray) !== JSON.stringify(gray)) localStorage.setItem('gray', JSON.stringify(Array.from((new Set(gray)))));

        green && setGreenString(green.join(' ')) //green always should be displayed

        const removeGreenfromYellow = yellow.filter((color) => !green.includes(color));
        console.log(removeGreenfromYellow)
        const removeGreenfromGray = gray.filter((color) => !green.includes(color));

        const removeYellowfromGray = removeGreenfromGray.filter((color) => !removeGreenfromYellow.includes(color));

        setYellowString(removeGreenfromYellow.join(' '));
        setGrayString(removeYellowfromGray.join(' '));
    }, [green, yellow, gray])


    const {guessLength, setGuessLength} = useContext(KeyboardContext);
    const {settings, showSettings} = useContext(KeyboardContext);
    const [clickedSettings, setClickedSettings] = useState(false);
    const skipMount = useRef(false);
    useEffect(() => {
        if (!skipMount.current) { //skip mount
            skipMount.current = true;
            return;
        }
        if (skipMount.current) {
            setClickedSettings(true); // user clicked on settings
        }
    }, [settings, guessLength])

    const {doneHash, setDoneHash} = useContext(KeyboardContext);

    useEffect(() => {
        setClickedSettings(false); 
    }, [doneHash])
    
    const [random, setRandom] = useState(false);
    const randomRef = useRef(false);

    useEffect(() => { //sets keyboard color on each guess rerender, new guesses as well as initial mount
        buttonTheme.current = [
            {
                class: `${ darkMode ? 'DMbuttons' : 'buttons' }`,
                buttons: 'q w e r t y u i o p a s d f g h j k l ENTER z x c v b n m DEL'
            }
        ]
        if (clickedSettings || random !== randomRef.current) { // once you click ui element, style button, 
            if (random !== randomRef.current) randomRef.current = random; //if random changes that means that game is finished
            if (darkMode && colorBlind) {
                greenString.length && greenString.split(' ').map((res, ind) => {
                    const button = document.querySelector(`[data-skbtn="${res}"]`);
                    button.classList.remove('KBgreen');
                    button.classList.add('KBCBgreen');
                })

                yellowString.length && yellowString.split(' ').map((res, ind) => {
                    const button = document.querySelector(`[data-skbtn="${res}"]`);
                    button.classList.remove('KByellow');
                    button.classList.add('KBCByellow');
                })

                grayString.length && grayString.split(' ').map((res, ind) => {
                    const button = document.querySelector(`[data-skbtn="${res}"]`);
                    button.classList.add('KBDMgray');
                })
            }
            else if (darkMode) {
                greenString.length && greenString.split(' ').map((res, ind) => {
                    const button = document.querySelector(`[data-skbtn="${res}"]`);
                    button.classList.remove('KBCBgreen');
                    button.classList.add('KBgreen');
                })

                yellowString.length && yellowString.split(' ').map((res, ind) => {
                    const button = document.querySelector(`[data-skbtn="${res}"]`);
                    button.classList.remove('KBCByellow');
                    button.classList.add('KByellow');
                })

                grayString.length && grayString.split(' ').map((res, ind) => {
                    const button = document.querySelector(`[data-skbtn="${res}"]`);
                    button.classList.add('KBDMgray');
                })
            }
            else if (colorBlind) {
                greenString.length && greenString.split(' ').map((res, ind) => {
                    const button = document.querySelector(`[data-skbtn="${res}"]`);
                    button.classList.remove('KBgreen');
                    button.classList.add('KBCBgreen');
                })

                yellowString.length && yellowString.split(' ').map((res, ind) => {
                    const button = document.querySelector(`[data-skbtn="${res}"]`);
                    button.classList.remove('KByellow');
                    button.classList.add('KBCByellow');
                })

                grayString.length && grayString.split(' ').map((res, ind) => {
                    const button = document.querySelector(`[data-skbtn="${res}"]`);
                    button.classList.add('KBgray');
                })
            }
            else {
                greenString.length && greenString.split(' ').map((res, ind) => {
                    const button = document.querySelector(`[data-skbtn="${res}"]`);
                    button.classList.remove('KBCBgreen');
                    button.classList.add('KBgreen');
                })

                yellowString.length && yellowString.split(' ').map((res, ind) => {
                    const button = document.querySelector(`[data-skbtn="${res}"]`);
                    button.classList.remove('KBCByellow');
                    button.classList.add('KByellow');
                })

                grayString.length && grayString.split(' ').map((res, ind) => {
                    const button = document.querySelector(`[data-skbtn="${res}"]`);
                    button.classList.remove('KBDMgray');
                    button.classList.add('KBgray');
                })
            }
        }
        else {
            setTimeout(() => {
                if (darkMode && colorBlind) {
                    greenString.length && greenString.split(' ').map((res, ind) => {
                        const button = document.querySelector(`[data-skbtn="${res}"]`);
                        button.classList.remove('KBCByellow');
                        button.classList.add('KBCBgreen');
                    })
    
                    yellowString.length && yellowString.split(' ').map((res, ind) => {
                        const button = document.querySelector(`[data-skbtn="${res}"]`);
                        button.classList.add('KBCByellow');
                    })
    
                    grayString.length && grayString.split(' ').map((res, ind) => {
                        const button = document.querySelector(`[data-skbtn="${res}"]`);
                        button.classList.add('KBDMgray');
                    })
                }
                else if (darkMode) {
                    greenString.length && greenString.split(' ').map((res, ind) => {
                        const button = document.querySelector(`[data-skbtn="${res}"]`);
                        button.classList.remove('KByellow');
                        button.classList.add('KBgreen');
                    })
    
                    yellowString.length && yellowString.split(' ').map((res, ind) => {
                        const button = document.querySelector(`[data-skbtn="${res}"]`);
                        button.classList.add('KByellow');
                    })
    
                    grayString.length && grayString.split(' ').map((res, ind) => {
                        const button = document.querySelector(`[data-skbtn="${res}"]`);
                        button.classList.add('KBDMgray');
                    })
                }
                else if (colorBlind) {
                    greenString.length && greenString.split(' ').map((res, ind) => {
                        const button = document.querySelector(`[data-skbtn="${res}"]`);
                        button.classList.remove('KBCByellow');
                        button.classList.add('KBCBgreen');
                    })
    
                    yellowString.length && yellowString.split(' ').map((res, ind) => {
                        const button = document.querySelector(`[data-skbtn="${res}"]`);
                        button.classList.add('KBCByellow');
                    })
    
                    grayString.length && grayString.split(' ').map((res, ind) => {
                        const button = document.querySelector(`[data-skbtn="${res}"]`);
                        button.classList.add('KBgray');
                    })
                }
                else {
                    greenString.length && greenString.split(' ').map((res, ind) => {
                        const button = document.querySelector(`[data-skbtn="${res}"]`);
                        button.classList.remove('KBCBgreen');
                        button.classList.remove('KByellow');
                        button.classList.add('KBgreen');
                    })
    
                    yellowString.length && yellowString.split(' ').map((res, ind) => {
                        const button = document.querySelector(`[data-skbtn="${res}"]`);
                        button.classList.remove('KBCByellow');
                        button.classList.add('KByellow');
                    })
    
                    grayString.length && grayString.split(' ').map((res, ind) => {
                        const button = document.querySelector(`[data-skbtn="${res}"]`);
                        button.classList.remove('KBDMgray');
                        button.classList.add('KBgray');
                    })
                }
            }, 1000)

            //so when a letter changes from yellow to green we need to remove yellow from the class. only applies for yellow -> green b/c gray and green will never change color.
        }

    },[greenString, yellowString, grayString, darkMode, colorBlind, settings, guessLength, random, leftWiggle, rightWiggle])

    const{guesses, setGuesses} = useContext(KeyboardContext);
    const {canEnterHash, setCanEnterHash} = useContext(KeyboardContext);
    const {notEnough, setNotEnough} = useContext(KeyboardContext);
    const {wrongWord, setWrongWord} = useContext(KeyboardContext);
    const {wordleList, setWordleList} = useContext(KeyboardContext);
    const {enterPressed, setEnterPressed} = useContext(KeyboardContext);
    const {removeStyle, setRemoveStyle} = useContext(KeyboardContext);
    const {win, setWin} = useContext(KeyboardContext);

    const doneHashRef = useRef({});
    const delayRef = useRef(true)

    if (doneHash.firstDone) {
        if (doneHashRef.current !== doneHash) {
            delayRef.current = false
            doneHashRef.current = doneHash;
            setTimeout(() => {
                delayRef.current = true
            }, 1000)
        }
    }
    
    const onKeyPress = button => {

        if (delayRef.current) {
            const firstFalseKey = Object.entries(doneHash).find(([key, value]) => !value)?.[0]
            if (!firstFalseKey || win) {
                setRandom(!random)
                return;
            }
            const doneKey = firstFalseKey.replace('Done', '')
            const canEnterKey = doneKey + 'CanEnter';
            
            if (button == "DEL") { // if press delete key
                if (guessLength > 0) { // if guess is not empty delete that character
                    setGuessLength(prevGuessLen => prevGuessLen - 1);
                    setGuesses( prevGuess => ({ ...prevGuess, [doneKey] : (prevGuess[doneKey].slice(0, prevGuess[doneKey].length - 1))}))
                }
                else { // else if it is empty, show left wiggle to indicate no char to delete
                    setLeftWiggle(firstFalseKey);
                    setClickedSettings(true); //basically doesn't cause the timeout slide animation
                    setTimeout(() => {
                        setLeftWiggle('');
                    }, 100)
                }
            } else if (button == "ENTER") { // else if button is "ENTER"
                if (canEnterHash[canEnterKey]) { // if canEnter is true
                    if (wordleList.includes(guesses[doneKey].toLowerCase())) { // if word is a valid word
                        setEnterPressed(true);
                        setRemoveStyle(false);
                        setDoneHash(prevDone => ({ ...prevDone, [firstFalseKey]: true}));
                        setGuessLength(0);
                    } else setWrongWord(true); // else if word not valid show wrong word banner
                } else setNotEnough(true); // else if canEnter is false, means there is not enough chars
            } else { // else if letter is pressed (button pressed is not "del" or 'enter', then it must be a letter)
                if (guessLength < 5) { // if guess is not full add letter to guess
                    setGuessLength(prevGuessLen => prevGuessLen + 1)
                    setGuesses( prevGuess => ({ ...prevGuess, [doneKey]: (prevGuess[doneKey] + button.toUpperCase())}))
                    setClickedSettings(true); 
                } else if (guessLength === 5) { // else if it is full, produce right wiggle to indicate you can't add anymore
                    setRightWiggle(firstFalseKey);
                    setClickedSettings(true); //basically doesn't cause the timeout slide animation

                    setTimeout(() => {
                        setRightWiggle('');
                    }, 100)
                }
            }
        }
    }



    return (
        <div className='mx-auto w-[500px] h-[198px]'>

        <Keyboard 
        className="kibord w-full p-0"
        // onChange={kbChange}
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
        buttonTheme={buttonTheme.current}
        theme="hg-theme-default board"
        
        />
        </div>
    )
}

export default Keys
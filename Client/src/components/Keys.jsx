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

        // console.log(kbColor)
        if (kbColor.length) {
            console.log(kbColor)
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

    const [update, setUpdate] = useState(false)

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
        const removeGreenfromGray = gray.filter((color) => !green.includes(color));

        const removeYellowfromGray = removeGreenfromGray.filter((color) => !removeGreenfromYellow.includes(color));

        setYellowString(removeGreenfromYellow.join(' '));
        setGrayString(removeYellowfromGray.join(' '));
        
    }, [green, yellow, gray])

    // useEffect(() => { // switches already guessed color of button theme based on color blind mode
    //     if (colorBlind) {
    //         buttonTheme.current = buttonTheme.current.map(item => {
    //             if (item.class === 'KBgreen') {
    //                 return {
    //                     ...item,
    //                     class : 'KBCBgreen'
    //                 }
    //             } else if (item.class === 'KByellow') {
    //                 return {
    //                     ...item,
    //                     class : 'KBCByellow'
    //                 }
    //             } else {
    //                 return item;
    //             }
    //         }) 
    //     } else {

    //         buttonTheme.current = buttonTheme.current.map(item => {
    //             if (item.class === 'KBCBgreen') {
    //                 return {
    //                     ...item,
    //                     class : 'KBgreen'
    //                 }
    //             } else if (item.class === 'KBCByellow') {
    //                 return {
    //                     ...item,
    //                     class : 'KByellow'
    //                 }
    //             } else {
    //                 return item;
    //             }
    //         }) 
    //     }
    // }, [colorBlind])

    // useEffect(() => {
    //     if (darkMode) {
    //         buttonTheme.current = buttonTheme.current.map(item => {
    //             if (item.class === 'buttons') {
    //                 return {
    //                     ...item,
    //                     class : 'DMbuttons'
    //                 }
    //             } else if (item.class === 'KBgray') {
    //                 return {
    //                     ...item,
    //                     class : 'KBDMgray'
    //                 }
    //             }
    //             else {
    //                 return item;
    //             }
    //         })
    //     } else {
    //         buttonTheme.current = buttonTheme.current.map(item => {
    //             if (item.class === 'DMbuttons') {
    //                 return {
    //                     ...item,
    //                     class : 'buttons'
    //                 }
    //             } else if (item.class === 'KBDMgray') {
    //                 return {
    //                     ...item,
    //                     class : 'KBgray'
    //                 }
    //             }
    //             else {
    //                 return item;
    //             }
    //         })
    //     }
    // }, [darkMode])

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
    

    useEffect(() => { //sets keyboard color on each guess rerender, new guesses as well as initial mount
        buttonTheme.current = [
            {
                class: `${ darkMode ? 'DMbuttons' : 'buttons' }`,
                buttons: 'q w e r t y u i o p a s d f g h j k l ENTER z x c v b n m DEL'
            }
        ]
            if (clickedSettings) {
                // if (greenString.length + yellowString.length + grayString.length > 0) {
                //     buttonTheme.current = [
                //         {
                //             class: `${ colorBlind ? 'KBCBgreen': 'KBgreen' }`,
                //             buttons: greenString || ' '
                //         },
                //         {
                //             class: `${ colorBlind ? 'KBCByellow': 'KByellow' }`,
                //             buttons: yellowString  || ' '
                //         },
                //         {
                //             class: `${ darkMode ? 'KBDMgray': 'KBgray' }`,
                //             buttons: grayString || ' '
                //         },
                //     ]
                // }
                if (darkMode && colorBlind) {
                    greenString.length && greenString.split(' ').map((res, ind) => {
                        const button = document.querySelector(`[data-skbtn="${res}"]`);
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
                        button.classList.add('KBgreen');
                    })

                    yellowString.length && yellowString.split(' ').map((res, ind) => {
                        const button = document.querySelector(`[data-skbtn="${res}"]`);
                        button.classList.remove('KBCBgreen');
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
                    // if (greenString.length + yellowString.length + grayString.length > 0) {
                    //     buttonTheme.current = [
                    //         {
                    //             class: `${ colorBlind ? 'KBCBgreen': 'KBgreen' }`,
                    //             buttons: greenString || ' '
                    //         },
                    //         {
                    //             class: `${ colorBlind ? 'KBCByellow': 'KByellow' }`,
                    //             buttons: yellowString  || ' '
                    //         },
                    //         {
                    //             class: `${ darkMode ? 'KBDMgray': 'KBgray' }`,
                    //             buttons: grayString || ' '
                    //         },
                    //     ]
                    // }
                    if (darkMode && colorBlind) {
                        greenString.length && greenString.split(' ').map((res, ind) => {
                            const button = document.querySelector(`[data-skbtn="${res}"]`);
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
                            button.classList.add('KBgreen');
                        })
        
                        yellowString.length && yellowString.split(' ').map((res, ind) => {
                            const button = document.querySelector(`[data-skbtn="${res}"]`);
                            button.classList.remove('KBCBgreen');
                            button.classList.add('KByellow');
                        })
        
                        grayString.length && grayString.split(' ').map((res, ind) => {
                            const button = document.querySelector(`[data-skbtn="${res}"]`);
                            button.classList.remove('KBDMgray');
                            button.classList.add('KBgray');
                        })
                    }
                }, 1000)
            }
    },[greenString, yellowString, grayString, darkMode, colorBlind, settings, guessLength])

    // const kbChange = (input) => {
    //     // if (input.slice(-1) == "L") {
            
    //     // } else {
            
    //     // }
    // }
    
    const{guesses, setGuesses} = useContext(KeyboardContext);
    const {canEnterHash, setCanEnterHash} = useContext(KeyboardContext);
    const {notEnough, setNotEnough} = useContext(KeyboardContext);
    const {wrongWord, setWrongWord} = useContext(KeyboardContext);
    const {wordleList, setWordleList} = useContext(KeyboardContext);
    const {enterPressed, setEnterPressed} = useContext(KeyboardContext);
    const {removeStyle, setRemoveStyle} = useContext(KeyboardContext);

    const onKeyPress = button => {
        // console.log("Button pressed", button);
        
        
        Object.entries(doneHash).some(([key, value]) => {
            const doneKey = key.replace('Done', '')
            const canEnterKey = doneKey + 'CanEnter';
            
            if (!value) {
                if (button == "DEL" && guessLength > 0) {
                    setGuessLength(prevGuessLen => prevGuessLen - 1);
                    setGuesses( prevGuess => ({ ...prevGuess, [doneKey] : (prevGuess[doneKey].slice(0, prevGuess[doneKey].length - 1))}))
                } else if (button == "ENTER") {
                    if (canEnterHash[canEnterKey]) {
                        if (wordleList.includes(guesses[doneKey].toLowerCase())) {
                            setEnterPressed(true);
                            setRemoveStyle(false);
                            setDoneHash(prevDone => ({ ...prevDone, [key]: true}));
                            setGuessLength(0);
                        } else setWrongWord(true);
                    } else setNotEnough(true);
                } else if (button != "DEL" && guessLength < 5){
                    setGuessLength(prevGuessLen => prevGuessLen + 1)
                    setGuesses( prevGuess => ({ ...prevGuess, [doneKey]: (prevGuess[doneKey] + button.toUpperCase())}))
                    setClickedSettings(true); 
                }
                return true;
            }
            return false;
        })    
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
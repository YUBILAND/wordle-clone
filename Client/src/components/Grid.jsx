import React, { useEffect, useState, useRef, useContext } from 'react'
import { KeyboardContext } from '../Contexts/KeyboardContext';
import CloseIcon from '@mui/icons-material/Close';
import ReplayIcon from '@mui/icons-material/Replay';
import ShareIcon from '@mui/icons-material/Share';
import './Grid.css'
import axios from 'axios';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';



const Grid = () => {
    
    const {darkMode} = useContext(KeyboardContext);
    const {colorBlind, setColorBlind} = useContext(KeyboardContext);
    const {profilePage, showProfilePage} = useContext(KeyboardContext);
    const {tutorial, showTutorial} = useContext(KeyboardContext);
    const {leaderBoard, showLeaderBoard} = useContext(KeyboardContext);
    const {settings, showSettings} = useContext(KeyboardContext);
    const {userID, setUserID} = useContext(KeyboardContext);
    const {kbColor, setKbColor} = useContext(KeyboardContext);
    const {winPage, setWinPage} = useContext(KeyboardContext);
    const {guessWon, setGuessWon} = useContext(KeyboardContext);
    const {winCompliment, setWinCompliment} = useContext(KeyboardContext);
    const {win, setWin} = useContext(KeyboardContext);
    const {answer, showAnswer} = useContext(KeyboardContext);
    const {notEnough, setNotEnough} = useContext(KeyboardContext);
    const {wrongWord, setWrongWord} = useContext(KeyboardContext);
    const {wordleList, setWordleList} = useContext(KeyboardContext);
    const {doneHash, setDoneHash} = useContext(KeyboardContext);
    const {canEnterHash, setCanEnterHash} = useContext(KeyboardContext);
    const [guessResults, setGuessResults] = useState(() => {
        const existingguessResults = JSON.parse(localStorage.getItem('guessResults'));
        return existingguessResults || {
            first: [], 
            second: [], 
            third: [], 
            fourth: [], 
            fifth: [], 
            sixth: []
        };
    });
    const refHash = useRef({first: false, second: false, third: false, fourth: false, fifth: false, sixth: false})
    const [loading, setLoading] = useState(true);
    const {correctWord, setCorrectWord} = useContext(KeyboardContext)
    const {guesses, setGuesses} = useContext(KeyboardContext);
    const {clickDisabledLeaderBoard, setClickDisabledLeaderBoard} = useContext(KeyboardContext);
    const {clickDisabledProfile, setClickDisabledProfile} = useContext(KeyboardContext);
    const {guestMode, setGuestMode} = useContext(KeyboardContext);
    const {guessLength, setGuessLength} = useContext(KeyboardContext);
    const [loss, setLoss] = useState(() => {
        const existingLoss = JSON.parse(localStorage.getItem('loss'));
        return existingLoss || false;
    });
    const {enterPressed, setEnterPressed} = useContext(KeyboardContext);
    const {removeStyle, setRemoveStyle} = useContext(KeyboardContext);

    const {leftWiggle, setLeftWiggle} = useContext(KeyboardContext);
    const {rightWiggle, setRightWiggle} = useContext(KeyboardContext);
    const {hardMode, setHardMode} = useContext(KeyboardContext);

    const hardGreen = useRef(['', '', '', '', '']);
    const hardYellow = useRef([]);





    useEffect(() => { //loads wordle list
        const fetchWords = async () => { 
            const response = await fetch('/wordle-La.txt');
            const text = await response.text();
            const removeSpecial = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
            const lines = removeSpecial.split('\n').slice(0, 2315);
            setWordleList(lines)
        };
        fetchWords();
    }, []);
    useEffect(() => { //chooses random correct word from wordle list
        console.log(wordleList)

        if (wordleList.length > 0 && !correctWord) {
        setCorrectWord(wordleList[Math.floor(Math.random() * 2315)].toUpperCase());
        // setCorrectWord('MAMMA')
        setLoading(false);
        }
    }, [wordleList])
    useEffect(() => { // prints correctWord
        if( correctWord )
            console.log('The Correct Word is ' + correctWord)
            const existingCorrectWord = JSON.parse(localStorage.getItem('correctWord')) || '';
            if (JSON.stringify(existingCorrectWord) !== JSON.stringify(correctWord)) localStorage.setItem('correctWord', JSON.stringify(correctWord));
    }, [correctWord])

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
    useEffect(() => { //Register key press and save to state, del too
        const onPress = async (event) => {
            if (delayRef.current) {
                const firstFalseKey = Object.entries(doneHash).find(([key, value]) => !value)?.[0];
                if (event.key === 'Backspace') {
                    if (firstFalseKey && guessLength > 0) {
                        const firstDonetoFirst = firstFalseKey.split('Done')[0];
                        setGuessLength(prevGuessLen => prevGuessLen - 1);
                        setGuesses( prevGuess => ({ ...prevGuess, [firstDonetoFirst]: (prevGuess[firstDonetoFirst].slice(0, prevGuess[firstDonetoFirst].length - 1))}))
                    }
                    else { //deleting nothing so do left wiggle animation
                        setLeftWiggle(firstFalseKey);
                        setTimeout(() => {
                            setLeftWiggle('');
                        }, 100)
                    }
                } else if (event.key.match(/[a-zA-Z]/) && event.key.length === 1) {
                    if (firstFalseKey && guessLength < 5) {
                        const firstDonetoFirst = firstFalseKey.split('Done')[0];
                        setGuessLength(prevGuessLen => prevGuessLen + 1);
                        setGuesses( prevGuess => ({ ...prevGuess, [firstDonetoFirst]: (prevGuess[firstDonetoFirst] + event.key.toUpperCase())}))
                    }
                    else { //adding nothing so do right wiggle animation
                        setRightWiggle(firstFalseKey);
                        setTimeout(() => {
                            setRightWiggle('');
                        }, 100)
                    }
                } 
            };
        }
        if(!win) {
            // Attach event listener
            document.addEventListener('keydown', onPress);
        
            // Cleanup function to remove event listener
            return () => {
            document.removeEventListener('keydown', onPress);
            };
        }
    }, [win, guessLength, doneHash]); // Depend only on the completion status

    const missingGreenRef = useRef(false);
    const missingYellowRef = useRef(false);

    const {missingGreen, setMissingGreen} = useContext(KeyboardContext);
    const {missingYellow, setMissingYellow} = useContext(KeyboardContext);

    const missingGreenHash = useRef({});
    const missingYellowArr = useRef([]);

    const {clickNotEnough, setClickNotEnough} = useContext(KeyboardContext);
    const {clickWrongWord, setClickWrongWord} = useContext(KeyboardContext);

    useEffect(() => { // 'Enter' Key Functionality
        const onPress = (event) => {
            if (delayRef.current) {
                if (event.key === 'Enter') {
                    const firstFalseKey = Object.entries(doneHash).find(([key, value]) => !value)?.[0];
                   

                    if (!firstFalseKey) {
                        return;
                    }
                    const firstDonetoFirstCanEnter = firstFalseKey.split('Done')[0] + 'CanEnter' // changes firstDone to firstCanEnter
                    if (canEnterHash[firstDonetoFirstCanEnter]) { // if user can enter, guessLength must be 5
                        const firstDonetoFirst = firstFalseKey.split('Done')[0]  // changes firstDone to first
                        if (wordleList.includes(guesses[firstDonetoFirst].toLowerCase())) { // if guess is valid word
                            if (hardMode) { // hard mode is toggled
                                hardGreen.current.map((letter, index) => { // go throguh each green letter
                                    if (letter && guesses[firstDonetoFirst][index] !== letter) { // if letter at index in users guess is not green
                                        missingGreenHash.current = {...missingGreenHash.current, [index] : letter}
                                        missingGreenRef.current = true;
                                    }
                                })
                                hardYellow.current.map((letter, index) => {
                                    if (!guesses[firstDonetoFirst].includes(letter)) { // if letter at index in users guess is not green
                                        missingYellowArr.current = [...missingYellowArr.current, letter]
                                        // console.log('whats missing from yellow letter is ',missingYellowArr.current)
                                        missingYellowRef.current = true;
                                    }
                                })
                                // console.log('is there a missing green? ',missingGreenRef.current)
                                // console.log('is there a missing yellow? ',missingYellowRef.current)
                                if (!missingGreenRef.current && !missingYellowRef.current) {
                                    setEnterPressed(true);
                                    setRemoveStyle(false);
                                    setDoneHash(prevDone => ({ ...prevDone, [firstFalseKey]: true}));
                                    setGuessLength(0);
                                }
                                else {
                                    if (missingGreenRef.current) setMissingGreen(true);
                                    if (missingYellowRef.current) setMissingYellow(true);
                                }
                            }
                            else {
                                setEnterPressed(true);
                                setRemoveStyle(false);
                                setDoneHash(prevDone => ({ ...prevDone, [firstFalseKey]: true}));
                                setGuessLength(0);
                            }
                        } else { // else if not valid word
                            setWrongWord(true)
                            setClickWrongWord(prev => !prev)

                        }; 
                    } else {
                        setNotEnough(true)
                        setClickNotEnough(prev => !prev)
                    }; //else if if user can't enter, guessLength less than 5
                }
            }
        }
        if (!win) {
            document.addEventListener('keydown', onPress);
            return () => {
            document.removeEventListener('keydown', onPress);
            };
        }
    },[win, doneHash, canEnterHash])

    const {missingGreenLetter, setMissingGreenLetter} = useContext(KeyboardContext);
    const {missingYellowLetter, setMissingYellowLetter} = useContext(KeyboardContext);

    
    if ((missingGreenRef.current && missingYellowRef.current) || missingGreenRef.current) {
        setMissingGreenLetter(Object.entries(missingGreenHash.current).find(([key, value]) => value != '')?.[1]);
        missingGreenRef.current = false;

    }
    else if (missingYellowRef.current) {
        setMissingYellowLetter(missingYellowArr.current[0]);
        missingYellowRef.current = false;

    }
            const compareString = (str1, str2) => { // compare guess to correctword, return arr of index of green ( ex '135' so first third and fifth are green)
                var indexMatch = [];
                for (let i = 0; i < str1.length; i++) {
                    if (str1[i] == str2[i]) {
                        indexMatch.push(i);
                    }
                } return indexMatch;
            }

            useEffect(() => { // evaluates whether user can press enter as a valid guess, length 5

                const firstFalseKey = Object.entries(doneHash).find(([key, value]) => !value)?.[0];
                if (firstFalseKey) {
                    const firstDonetoFirst = firstFalseKey.split('Done')[0] // 'firstDone' to 'first'
                    const firstDonetoFirstCanEnter = firstFalseKey.split('Done')[0] + 'CanEnter' // 'firstDone' to 'firstCanEnter'
                    if (guesses[firstDonetoFirst].length == 5) setCanEnterHash(prevCanEnter => ({ ...prevCanEnter, [firstDonetoFirstCanEnter]: true}));
                    else setCanEnterHash(prevCanEnter => ({ ...prevCanEnter, [firstDonetoFirstCanEnter]: false}));   
                }
                   
            }, [guesses])

            const greenLetter = (dummyWord, guessedWord) => { //looks for green first
                const greenIndex = compareString(correctWord, guessedWord); // arry of green index
                var offset = 0;
                for (let i = 0; i < greenIndex.length; i++) {
                    dummyWord = dummyWord.slice(0, [parseInt(greenIndex[i]) - offset]) + dummyWord.slice(parseInt(greenIndex[i]) + 1 - offset);
                    // console.log(dummyWord)
                    offset++;
                }
                return dummyWord;
            }

            const evalGuess = (dummyWord, letter, pos) => { //assign letter green, yellow, or gray
                if (letter == correctWord[pos]) {
                    return 'green';
                } else if (dummyWord.includes(letter)) {
                    return 'yellow';
                } else {
                    return 'gray';
                }
            }

            var cheatVar;

            const evaluteGuess = (res, ind) => { //helper func for evaluating guess
                if (guessResults.first) {
                    const newCheatVar = cheatVar;
                    cheatVar = cheatVar.replace(res, '')
                    return evalGuess(newCheatVar, res, ind) //check for green, yellow and gray
                }
            }

            const guessRow = useRef(1); // keep track of variable between useEffect renders

            useEffect(() => { // ref
                const existingGuessRow = JSON.parse(localStorage.getItem('currentRow'));
                if (existingGuessRow) guessRow.current = existingGuessRow;
            }, [])

            const guessesLoaded = useRef(false);
    useEffect(() => {
        setTimeout(() => {
            setEnterPressed(false)
        },1000)

    }, [enterPressed])
        
    const firstTime = useRef(true);
    useEffect(() => { // evaluates guess, sets when user wins or loses
        if (!guessesLoaded.current) 
            setTimeout(() => {
                guessesLoaded.current = true;
        }, 1000) // after refresh, set guessesloaded to true so animation won't appear for previous guesses. added timeout so set true right after animation finishes, solves removeStyle being false for split second after making guess causing flicker due to previous guesses showing transparent border and such

        if (firstTime.current) { //skip on mount
            firstTime.current = false;
            return;
        }
        console.log('enterPressed is ',enterPressed)
        if (!enterPressed) { //skip on mount Solves? doubling the grid from 5 to 10 because of saving changes, if enter not pressed don't run this code again
            return;
        }

        const lastTrueKey = Object.entries(doneHash).reduce((acc, [key, value]) => {
            return value ? key : acc;
        }, 0);
            
            const firstDonetoFirst = lastTrueKey.split('Done')[0]; // remove "Done" from "firstDone" to get 'first'; use for accessing hashmap
            if ( lastTrueKey !== 0 && !refHash.current[firstDonetoFirst]) { //player has made first guess
                
                cheatVar = greenLetter(correctWord, guesses[firstDonetoFirst])
                const colorGuess = guesses[firstDonetoFirst].split('').map((res, ind) => ( // gets color mapping for each letter guess
                    evaluteGuess(res, ind)
                ))
                setGuessResults(prevResults => ({
                    ...prevResults,
                    [firstDonetoFirst] : [...prevResults[firstDonetoFirst], ...colorGuess]
                }));
                let newKbColor = guesses[firstDonetoFirst].split('').reduce((acc, res, ind) => { //removes duplicates to map to keyboard (ex. plump) only one color for p.
                    if ( acc[res] == 'green' || acc[res] == 'yellow') {
                        
                            // green and yellow get priority over gray so don't overwrite. 
                            // (ex blimp and guess is booby, first b is green so don't overwrite with second b which is gray.)
                            // (ex blimp and guess is poppy, first p is yellow so don't overwrite with second or third p which is gray.)
                        
                    } else 
                    acc[res] = colorGuess[ind];
                    return acc;
                }, {});
                setKbColor(prevResults => [
                    ...prevResults,
                    { ...newKbColor }
                ])
                const set = new Set(Object.values(newKbColor))
                const first = [...set][0]
                if (set.size == 1 && first == 'green') {
                    setWin(true);
                    localStorage.setItem('win', JSON.stringify(true))
                    setGuessWon(guessRow.current);
                    localStorage.setItem('guessWon', JSON.stringify( guessRow.current))
                    return;
                } else if ( firstDonetoFirst == "sixth" ){
                    showAnswer(true);
                    localStorage.setItem('answer', JSON.stringify(true))
                    setLoss(true);
                    localStorage.setItem('loss', JSON.stringify(true))
                    return;
                }
                guessRow.current += 1;
                localStorage.setItem('currentRow',JSON.stringify( guessRow.current)) // just display
                refHash.current[firstDonetoFirst] = true;
            }
    }, [doneHash]);

    useEffect(() => {
        const existingDoneHash = JSON.parse(localStorage.getItem('doneHash')) || {
            firstDone: false, 
            secondDone: false, 
            thirdDone: false, 
            fourthDone: false, 
            fifthDone: false, 
            sixthDone: false
        };
        if (JSON.stringify(existingDoneHash) !== JSON.stringify(doneHash)) localStorage.setItem('doneHash', JSON.stringify(doneHash));
    }, [doneHash])

    useEffect(() => {
        const existingguessResults = JSON.parse(localStorage.getItem('guessResults')) || {
            first: [], 
            second: [], 
            third: [], 
            fourth: [], 
            fifth: [], 
            sixth: []
        };
        if (JSON.stringify(existingguessResults) !== JSON.stringify(guessResults)) localStorage.setItem('guessResults', JSON.stringify(guessResults));
        
        const existingguesses = JSON.parse(localStorage.getItem('guesses')) || {
            first: '', 
            second: '', 
            third: '', 
            fourth: '', 
            fifth: '', 
            sixth: ''
        };
        if (JSON.stringify(existingguesses) !== JSON.stringify(guesses)) localStorage.setItem('guesses', JSON.stringify(guesses));

    }, [guessResults])

    useEffect(() => {
        const existingKbColor = JSON.parse(localStorage.getItem('kbColor')) || [];
        if (JSON.stringify(existingKbColor) !== JSON.stringify(kbColor)) localStorage.setItem('kbColor', JSON.stringify(kbColor));
        
    }, [kbColor])

    const updated = useRef(false); // Solves: user can't refresh to gain infinite wins
    useEffect(() => { // ref
        const existingUpdated = JSON.parse(localStorage.getItem('updatedStats'));
        if (existingUpdated) updated.current = existingUpdated;
    }, [])
    useEffect(() => { // update stats after game finish
        if ((win || loss) && !updated.current) {
            axios.post(`${process.env.REACT_APP_DATABASE_URL}/updateStats`, {...userID, win: win, guessWon: guessWon})
            .then(res => {
                updated.current = true;
                localStorage.setItem('updatedStats', JSON.stringify(updated.current))
            })
            .catch(err => console.log(err));
        }
    }, [win, loss])

    useEffect(() => { // 1 sec delay after win before stats is shown
        if (win) {
            setWinCompliment(true);
            setTimeout(() => {
                setWinPage(true);
            }, 1000)
        }
    }, [win])

    if(missingGreen || missingYellow) { // show not enoguh letters prompt and fade out
        missingGreenHash.current = [];
        missingYellowArr.current = [];
        setTimeout(() => {
            document.getElementById('hidePls') && (document.getElementById('hidePls').id = 'waa');
            setMissingGreen(false);
            setMissingYellow(false);
            
            }, 1000);
    }

    if(winCompliment) { // show win compliment and fade out
        setTimeout(() => {
            document.getElementById('hidePls') && (document.getElementById('hidePls').id = 'waa');
            setWinCompliment(false);
            }, 3000);
    }

    if(notEnough) { // show not enoguh letters prompt and fade out
        setTimeout(() =>  { // this is for animation
            setNotEnough(false);
            }, 1000);
    }

    if (wrongWord) { // show wrong word prompt and fade out
        setTimeout(() => {
            document.getElementById('hidePls') && (document.getElementById('hidePls').id = 'waa');
            setWrongWord(false);
            }, 1000);
    }

    if (clickDisabledLeaderBoard) { // show disabled leadeboard prompt and fade out
        setTimeout(() => {
            document.getElementById('hidePls') && (document.getElementById('hidePls').id = 'waa');
            setClickDisabledLeaderBoard(false);
            }, 2000);
    }

    if (clickDisabledProfile) { // show disabled profile prompt and fade out
        setTimeout(() => {
            document.getElementById('hidePls') && (document.getElementById('hidePls').id = 'waa');
            setClickDisabledProfile(false);
            }, 2000);
    }

    useEffect(() => {
        if (loss) { // 1 sec delay after loss before stats is shown
            setTimeout(() => {
                setWinPage(true);
            }, 1000);
        }
    }, [loss])

    const {delay, setDelay} = useContext(KeyboardContext);
    
    useEffect(() => {
        if (!winPage) {
            setTimeout(() => {
                setDelay(false);
                }, 1000);
        }
    }, [winPage])

    function handleAnimationStart() { //remove style after 400 ms of animation
        setTimeout(() => {
            setRemoveStyle(true);
        }, 400)
    }

    const [clickedSettings, setClickedSettings] = useState(false);
    const skipMount = useRef(false);
    useEffect(() => { // remove flip animation, state variable
        if (skipMount.current) {
            setClickedSettings(true);
        }
        if (!skipMount.current) {
            skipMount.current = true;
        }
    }, [settings, leaderBoard, profilePage, tutorial])
    
    useEffect(() => { //when guess made, let animation resume
        setClickedSettings(false);
    }, [doneHash])

    useEffect(() => {
        if (hardMode && Object.keys(guessResults).length) {
            // you need to use every letter, if green same position, if yellow any position, ignore gray
            Object.entries(guessResults).map(([rowName, colorArr]) => {
                if (colorArr.includes('green')) {
                    colorArr.map((color, ind) => {
                        if (color === 'green') {
                            hardGreen.current[ind] = guesses[rowName][ind]
                            if (hardYellow.current.includes(guesses[rowName][ind])) {
                                hardYellow.current = hardYellow.current.filter(item => item !== guesses[rowName][ind]);
                            }
                        }
                    })
                }
                if (colorArr.includes('yellow')) {
                    colorArr.map((color, ind) => {
                        if (color === 'yellow' && !hardYellow.current.includes(guesses[rowName][ind]) && !hardGreen.current.includes(guesses[rowName][ind])) {
                            hardYellow.current = [...hardYellow.current, guesses[rowName][ind]]
                        }
                    })
                }
            })
            console.log('hardGreen is ',hardGreen.current)
            console.log('hardYellow is ',hardYellow.current)
        }
    }, [hardMode, guessResults])

  return (

    <div className={`mx-auto w-[500px] sm:w-screen opacity-100 ${darkMode ? 'bg-[#121213] text-white' : 'bg-white text-black'}`}>
        <div className='grid grid-cols-5 w-max mx-auto gap-2'>
        {clickedSettings 
            ?
        Object.entries(doneHash).map(([key, value]) => { // this maps rows without the FLIP animation. (Like when come back from a menu like settings)
            const firstFalseKey = Object.entries(doneHash).find(([key, value]) => !value)?.[0]; // find first false key, this would be the current user input row
            const firstDonetoFirst = key.split('Done')[0];
            return ( 
                (guessesLoaded.current && value) ? // if past mount and this rows guess is done already
                <>
                    {guessResults[firstDonetoFirst] && guessResults[firstDonetoFirst].length > 0 
                        ? // if there is a guess
                        (guessResults[firstDonetoFirst].map((res, ind) => ( // map each letter to a gridbox
                            
                            <div className= { `border-2 select-none ${ // using buttons and cursor-default to make it unclickable and unhighlightable
                                res == 'green' ? ( colorBlind ? 'CBgreen'  : 'green' ) :  
                                res == 'yellow' ? ( colorBlind ? 'CByellow' : 'yellow' ) : 
                                ( darkMode ? 'DMgray' : 'gray' ) } 
                                flex items-center justify-center w-[64px] sm:w-[calc(100vw_/_500_*_64)] h-[64px] sm:h-[calc(100vw_/_500_*_64)] uppercase text-3xl font-bold text-white` }>
                                {guesses[firstDonetoFirst][ind] || ''}
                            </div>
                            
                        )))  
                        : [0,1,2,3,4].map((res) => ( // this prevents row from disappearing, im assuming that doneHash updates but guessResults hasn't so there is a missing row that won't be accounted for thus it would disappear for a split second causing Keys to shift up, this takes care of that scenario by keeping an empty row there until guessResults updates in which case it will show the guessed gridbox, WEIRDLY THIS GLITCH ONLY SHOWS AFTER clickedSettings, on mount doesn't show
                            guesses[firstDonetoFirst][res] 
                            ? 
                            <div className='select-none border-2 border-gray-500 flex items-center justify-center w-[64px] sm:w-[calc(100vw_/_500_*_64)] h-[64px] sm:h-[calc(100vw_/_500_*_64)] uppercase text-3xl font-bold'> 
                                {guesses[firstDonetoFirst][res]} 
                            </div>
                            : 
                            <div className='select-none border-2 border-gray-300 flex items-center justify-center w-[64px] sm:w-[calc(100vw_/_500_*_64)] h-[64px] sm:h-[calc(100vw_/_500_*_64)] uppercase text-3xl font-bold'>
                            </div>
                        
                        ))
                    }
                </>
                :
                <>
                    {[0,1,2,3,4].map((res) => (  // for each row of user current input 
                        guesses[firstDonetoFirst][res] // if the user typed in letters but didn't enter the guess
                        ?  //show letters in gridbox
                        <div className={`${rightWiggle.length && key == rightWiggle && 'addNothingWiggle'} ${(notEnough || wrongWord) && 'wiggle'} w-max`}>
                            <div key={res} className={`${guesses[firstDonetoFirst][res] && 'pop'} ${rightWiggle.length && key == rightWiggle && 'addNothingWiggle'} select-none border-2 border-[#565758] flex items-center justify-center w-[64px] sm:w-[calc(100vw_/_500_*_64)] h-[64px] sm:h-[calc(100vw_/_500_*_64)] uppercase text-3xl font-bold`}>
                                {guesses[firstDonetoFirst][res]}
                            </div>
                        </div>
                        : // else show nothing
                        <div key={res} className={`select-none border-2 ${darkMode && 'border-[#3a3a3c]'} ${key == firstFalseKey && (notEnough || wrongWord) && 'wiggle'} ${leftWiggle.length && key == leftWiggle && 'deleteNothingWiggle'} flex items-center justify-center w-[64px] sm:w-[calc(100vw_/_500_*_64)] h-[64px] sm:h-[calc(100vw_/_500_*_64)] uppercase text-3xl font-bold`}>
                        </div>
                    ))}
                </>
            )})

            :

            Object.entries(doneHash).map(([key, value]) => { // on MOUNT, this will map the rows that require the FLIP animation, 
                const lastTrueKey = Object.entries(doneHash).reduce((acc, [key, value]) => { // ROW with MOST RECENT GUESS
                    return value ? key : acc;
                }, 0);
                const firstFalseKey = Object.entries(doneHash).find(([key, value]) => !value)?.[0]; // find FIRST FALSE key, this would be the CURRENT user INPUT ROW
                const firstDonetoFirst = key.split('Done')[0]; // change syntax to access object
                return ( 
                    // on mount here
                    <div key={key} className='flex col-span-5 gap-2'>
                    {// if row already guessed && MOUNT OR user just submitted guess
                        ((value && !guessesLoaded.current) || (key === lastTrueKey)) ?  // on first refresh need animation, on user guess need row animation
                            <>
                                {guessResults[firstDonetoFirst] && guessResults[firstDonetoFirst].length > 0 ? // for previous guesses
                                    (guessResults[firstDonetoFirst].map((res, ind) => { 
                                        const delay = ind * 100;                //animation stuff
                                        const style1 = {
                                            animationDelay: `${delay}ms`,
                                        };
                                        const style2 = removeStyle ? {} : { backgroundColor: 'transparent', color: 'transparent', borderColor: (darkMode ? '#3a3a3c' : '#d1d5db')}
                                        return (
                                            <div style={{ ...style1 , ...style2}} onAnimationStart={handleAnimationStart} className= { `flip border-2 select-none ${ // guesses with animation
                                                res == 'green' ? ( colorBlind ? 'CBgreen'  : 'green' ) :  
                                                res == 'yellow' ? ( colorBlind ? 'CByellow' : 'yellow' ) : 
                                                ( darkMode ? 'DMgray' : 'gray' ) } 
                                                flex items-center justify-center w-[64px] sm:w-[calc(100vw_/_500_*_64)] h-[64px] sm:h-[calc(100vw_/_500_*_64)] uppercase text-3xl font-bold text-white` }>
                                                {guesses[firstDonetoFirst][ind] || ''}
                                            </div>
                                        )
                                    }))  : [0,1,2,3,4].map((res) => ( // FIX GLITCH OF MISSING ROW
                                        guesses[firstDonetoFirst][res]
                                        ? 
                                        <div className='select-none border-2 border-gray-500 flex items-center justify-center w-[64px] sm:w-[calc(100vw_/_500_*_64)] h-[64px] sm:h-[calc(100vw_/_500_*_64)] uppercase text-3xl font-bold'>
                                            {guesses[firstDonetoFirst][res]}
                                        </div>
                                        : 
                                        <div className='select-none border-2 border-gray-300 flex items-center justify-center w-[64px] sm:w-[calc(100vw_/_500_*_64)] h-[64px] sm:h-[calc(100vw_/_500_*_64)] uppercase text-3xl font-bold'>
                                        </div>
                                    
                                    ))
                                }
                            </>
                        :
                        (guessesLoaded.current && (key !== lastTrueKey) && value) ? // PREVIOUS GUESSES, after they have been guessed they should have no animation unless refresh
                            <>
                                {
                                    (guessResults[firstDonetoFirst].map((res, ind) => ( 
                                        <div className= { `border-2 select-none ${
                                            res == 'green' ? ( colorBlind ? 'CBgreen'  : 'green' ) :  
                                            res == 'yellow' ? ( colorBlind ? 'CByellow' : 'yellow' ) : 
                                            ( darkMode ? 'DMgray' : 'gray' ) } 
                                            flex items-center justify-center w-[64px] sm:w-[calc(100vw_/_500_*_64)] h-[64px] sm:h-[calc(100vw_/_500_*_64)] uppercase text-3xl font-bold text-white  `}>
                                            {guesses[firstDonetoFirst][ind] || ''}
                                        </div>
                                    )))  
                                }
                            </>
                        :
                            <>
                                {[0,1,2,3,4].map((res) => ( // ROWS concerning CURRENT user input or unguessed rows
                                    guesses[firstDonetoFirst][res]
                                    ? 
                                    <div className={`${rightWiggle.length && key == rightWiggle && 'addNothingWiggle'} ${(notEnough || wrongWord) && 'wiggle'} w-max`}>
                                        <div key={res} className={`${guesses[firstDonetoFirst][res] && 'pop'} ${rightWiggle.length && key == rightWiggle && 'addNothingWiggle'} select-none border-2 border-[#565758] flex items-center justify-center w-[64px] sm:w-[calc(100vw_/_500_*_64)] h-[64px] sm:h-[calc(100vw_/_500_*_64)] uppercase text-3xl font-bold`}>
                                            {guesses[firstDonetoFirst][res]}
                                        </div>
                                    </div>
                                    
                                    : // EMPTY ROWS
                                    <div key={res} className={`select-none border-2 ${darkMode && 'border-[#3a3a3c]'} ${key == firstFalseKey && (notEnough || wrongWord) && 'wiggle'} ${leftWiggle.length && key == leftWiggle && 'deleteNothingWiggle'} flex items-center justify-center w-[64px] sm:w-[calc(100vw_/_500_*_64)] h-[64px] sm:h-[calc(100vw_/_500_*_64)] uppercase text-3xl font-bold`}>
                                        
                                    </div>
                                ))}
                            </>
                        }
                    </div>
                )
            })
        }
        </div>
    </div>
  )
}

export default Grid
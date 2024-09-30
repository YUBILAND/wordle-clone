import React, { useEffect, useState, useRef, useContext } from 'react'
import raw from '../assets/wordle-La.txt'
import { KeyboardContext } from '../Contexts/KeyboardContext';
import CloseIcon from '@mui/icons-material/Close';
import ReplayIcon from '@mui/icons-material/Replay';
import ShareIcon from '@mui/icons-material/Share';
import './Grid.css'
import Statistics from './Statistics';
import axios from 'axios';
import Zoom from '@mui/material/Zoom';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';



const Grid = () => {
    
    const {darkMode} = useContext(KeyboardContext);
    const {colorBlind, setColorBlind} = useContext(KeyboardContext);
    const {profilePage, showProfilePage} = useContext(KeyboardContext);
    const {tutorial, showTutorial} = useContext(KeyboardContext);
    const {leaderBoard, showLeaderBoard} = useContext(KeyboardContext);
    const {settings, showSettings} = useContext(KeyboardContext);
    const {userMode, setUserMode} = useContext(KeyboardContext);
    const {userID, setUserID} = useContext(KeyboardContext);
    const {kbColor, setKbColor} = useContext(KeyboardContext);
    const {winPage, setWinPage} = useContext(KeyboardContext);
    const {guessWon, setGuessWon} = useContext(KeyboardContext);
    const [winCompliment, setWinCompliment] = useState(false);
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
    const [correctWord, setCorrectWord] = useState(() => {
        const existingCorrectWord = JSON.parse(localStorage.getItem('correctWord'));
        return existingCorrectWord || '';
    });
    const {guesses, setGuesses} = useContext(KeyboardContext);
    const {clickDisabledLeaderBoard, setClickDisabledLeaderBoard} = useContext(KeyboardContext);
    const {clickDisabledProfile, setClickDisabledProfile} = useContext(KeyboardContext);
    const {guestMode, setGuestMode} = useContext(KeyboardContext);
    const {guessLength, setGuessLength} = useContext(KeyboardContext);
    const [loss, setLoss] = useState(() => {
        const existingLoss = JSON.parse(localStorage.getItem('loss'));
        return existingLoss || false;
    });



    useEffect(() => { //loads wordle list
        const fetchWords = async () => { 
            const response = await fetch(raw);
            const text = await response.text();
            const lines = text.split('\r\n').slice(0, 2315);
            setWordleList(lines)
        };
        fetchWords();
    }, []);
    
    useEffect(() => { //chooses random correct word from wordle list
        if (wordleList.length > 0 && !correctWord) {
        setCorrectWord(wordleList[Math.floor(Math.random() * 2315)].toUpperCase());
        // setCorrectWord('BLIMP')
        // console.log(wordleList);
        setLoading(false);
        }
    }, [wordleList])

    useEffect(() => { // prints correctWord
        if( correctWord )
            console.log('The Correct Word is ' + correctWord)
            const existingCorrectWord = JSON.parse(localStorage.getItem('correctWord')) || '';
            if (JSON.stringify(existingCorrectWord) !== JSON.stringify(correctWord)) localStorage.setItem('correctWord', JSON.stringify(correctWord));
    }, [correctWord])


    useEffect(() => { //Register key press and save to state, del too
        const onPress = (event) => {
            if (event.key === 'Backspace') {
            if (!doneHash.firstDone && guessLength > 0) {
                setGuessLength(prevGuessLen => prevGuessLen - 1);
                // guessLength -= 1;
                setGuesses( prevGuess => ({ ...prevGuess, first: (prevGuess.first.slice(0, prevGuess.first.length - 1))}))
            } 
            else if (!doneHash.secondDone && guessLength > 0) {
                setGuessLength(prevGuessLen => prevGuessLen - 1);
                // guessLength -= 1;
                setGuesses( prevGuess => ({ ...prevGuess, second: (prevGuess.second.slice(0, prevGuess.second.length - 1))}))
            } 
            else if (!doneHash.thirdDone && guessLength > 0) {
                setGuessLength(prevGuessLen => prevGuessLen - 1);
                // guessLength -= 1;
                setGuesses( prevGuess => ({ ...prevGuess, third: (prevGuess.third.slice(0, prevGuess.third.length - 1))}))
            } 
            else if (!doneHash.fourthDone && guessLength > 0) {
                setGuessLength(prevGuessLen => prevGuessLen - 1);
                // guessLength -= 1;
                setGuesses( prevGuess => ({ ...prevGuess, fourth: (prevGuess.fourth.slice(0, prevGuess.fourth.length - 1))}))
            } 
            else if (!doneHash.fifthDone && guessLength > 0) {
                setGuessLength(prevGuessLen => prevGuessLen - 1);
                // guessLength -= 1;
                setGuesses( prevGuess => ({ ...prevGuess, fifth: (prevGuess.fifth.slice(0, prevGuess.fifth.length - 1))}))
            } 
            else if (!doneHash.sixthDone && guessLength > 0) {
                setGuessLength(prevGuessLen => prevGuessLen - 1);
                // guessLength -= 1;
                setGuesses( prevGuess => ({ ...prevGuess, sixth: (prevGuess.sixth.slice(0, prevGuess.sixth.length - 1))}))
            } 
            } else if (event.key.match(/[a-zA-Z]/) && event.key.length === 1) {
            if (!doneHash.firstDone && guessLength < 5) {

                setGuessLength(prevGuessLen => prevGuessLen + 1);
                // guessLength += 1;
                // console.log(guessLength);
                setGuesses( prevGuess => ({ ...prevGuess, first: (prevGuess.first + event.key.toUpperCase())}))
            }
            else if (!doneHash.secondDone && guessLength < 5) {
                setGuessLength(prevGuessLen => prevGuessLen + 1);
                // guessLength += 1;
                setGuesses( prevGuess => ({ ...prevGuess, second: (prevGuess.second + event.key.toUpperCase())}))
            } 
            else if (!doneHash.thirdDone && guessLength < 5) {
                setGuessLength(prevGuessLen => prevGuessLen + 1);
                // guessLength += 1;
                setGuesses( prevGuess => ({ ...prevGuess, third: (prevGuess.third + event.key.toUpperCase())}))
            } 
            else if (!doneHash.fourthDone && guessLength < 5) {
                setGuessLength(prevGuessLen => prevGuessLen + 1);
                // guessLength += 1;
                setGuesses( prevGuess => ({ ...prevGuess, fourth: (prevGuess.fourth + event.key.toUpperCase())}))
            } 
            else if (!doneHash.fifthDone && guessLength < 5) {
                setGuessLength(prevGuessLen => prevGuessLen + 1);
                // guessLength += 1;
                setGuesses( prevGuess => ({ ...prevGuess, fifth: (prevGuess.fifth + event.key.toUpperCase())}))
            } 
            else if (!doneHash.sixthDone && guessLength < 5) {
                setGuessLength(prevGuessLen => prevGuessLen + 1);
                // guessLength += 1;
                setGuesses( prevGuess => ({ ...prevGuess, sixth: (prevGuess.sixth + event.key.toUpperCase())}))
            }
            } 
        };
        if(!win) {
            // Attach event listener
            document.addEventListener('keydown', onPress);
        
            // Cleanup function to remove event listener
            return () => {
            document.removeEventListener('keydown', onPress);
            };
        }
    }, [win, guessLength, doneHash]); // Depend only on the completion status

    const enterPressed = useRef(false)
    const [removeStyle, setRemoveStyle ]= useState(false);

    useEffect(() => { // 'Enter' Key Functionality
        const onPress = (event) => {
            if (event.key === 'Enter') {
                if (!doneHash.firstDone) {
                    if (canEnterHash.firstCanEnter) {
                        if (wordleList.includes(guesses.first.toLowerCase())) {
                            enterPressed.current = true;
                            setRemoveStyle(false);
                            setDoneHash(prevDone => ({ ...prevDone, firstDone: true}));
                            setGuessLength(0);
                        } else setWrongWord(true);
                    } else setNotEnough(true);
                }
                else if (!doneHash.secondDone) {
                    if (canEnterHash.secondCanEnter) {
                        if (wordleList.includes(guesses.second.toLowerCase())) {
                            enterPressed.current = true;
                            setRemoveStyle(false);

                            setDoneHash(prevDone => ({ ...prevDone, secondDone: true}));
                            setGuessLength(0);
                        } else setWrongWord(true);
                    } else setNotEnough(true);
                }
                else if (!doneHash.thirdDone) {
                    if (canEnterHash.thirdCanEnter) {
                        if (wordleList.includes(guesses.third.toLowerCase())) {
                            enterPressed.current = true;
                            setRemoveStyle(false);

                            setDoneHash(prevDone => ({ ...prevDone, thirdDone: true}));
                            setGuessLength(0);
                        } else setWrongWord(true);
                    } else setNotEnough(true);
                }
                else if (!doneHash.fourthDone) {
                    if (canEnterHash.fourthCanEnter) {
                        if (wordleList.includes(guesses.fourth.toLowerCase())) {
                            enterPressed.current = true;
                            setRemoveStyle(false);
                            setDoneHash(prevDone => ({ ...prevDone, fourthDone: true}));
                            setGuessLength(0);
                        } else setWrongWord(true);
                    } else setNotEnough(true);
                }
                else if (!doneHash.fifthDone) {
                    if (canEnterHash.fifthCanEnter) {
                        if (wordleList.includes(guesses.fifth.toLowerCase())) {
                            enterPressed.current = true;
                            setDoneHash(prevDone => ({ ...prevDone, fifthDone: true}));
                            setGuessLength(0);
                        } else setWrongWord(true);
                    } else setNotEnough(true);
                }
                else if (!doneHash.sixthDone) {
                    if (canEnterHash.sixthCanEnter) {
                        if (wordleList.includes(guesses.sixth.toLowerCase())) {
                            enterPressed.current = true;
                            setDoneHash(prevDone => ({ ...prevDone, sixthDone: true}));
                            setGuessLength(0);
                        } else setWrongWord(true);
                    } else setNotEnough(true);
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
    
    const compareString = (str1, str2) => { // compare guess to correctword, return arr of index of green ( ex '135' so first third and fifth are green)
        var indexMatch = [];
        for (let i = 0; i < str1.length; i++) {
            if (str1[i] == str2[i]) {
                indexMatch.push(i);
            }
        } return indexMatch;
    }
    
    useEffect(() => { // evaluates whether user can press enter as a valid guess, length 5
        // console.log(guesses.first)
        if (!doneHash.firstDone) {
            if (guesses.first.length == 5) setCanEnterHash(prevCanEnter => ({ ...prevCanEnter, firstCanEnter: true}));
            else setCanEnterHash(prevCanEnter => ({ ...prevCanEnter, firstCanEnter: false}));
        }
        else if (!doneHash.secondDone) {
            if (guesses.second.length == 5) setCanEnterHash(prevCanEnter => ({ ...prevCanEnter, secondCanEnter: true}));
            else setCanEnterHash(prevCanEnter => ({ ...prevCanEnter, secondCanEnter: false}));
        }
        else if (!doneHash.thirdDone) {
            if (guesses.third.length == 5) setCanEnterHash(prevCanEnter => ({ ...prevCanEnter, thirdCanEnter: true}));
            else setCanEnterHash(prevCanEnter => ({ ...prevCanEnter, thirdCanEnter: false}));
        }
        else if (!doneHash.fourthDone) {
            if (guesses.fourth.length == 5) setCanEnterHash(prevCanEnter => ({ ...prevCanEnter, fourthCanEnter: true}));
            else setCanEnterHash(prevCanEnter => ({ ...prevCanEnter, fourthCanEnter: false}));
        }
        else if (!doneHash.fifthDone) {
            if (guesses.fifth.length == 5) setCanEnterHash(prevCanEnter => ({ ...prevCanEnter, fifthCanEnter: true}));
            else setCanEnterHash(prevCanEnter => ({ ...prevCanEnter, fifthCanEnter: false}));
        }
        else if (!doneHash.sixthDone) {
            if (guesses.sixth.length == 5) setCanEnterHash(prevCanEnter => ({ ...prevCanEnter, sixthCanEnter: true}));
            else setCanEnterHash(prevCanEnter => ({ ...prevCanEnter, sixthCanEnter: false}));
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

    useEffect(() => {
        console.log(doneHash)
    }, [])
    

    const firstTime = useRef(false);
    useEffect(() => { // evaluates guess, sets when user wins or loses
        if (!firstTime.current) { //skip on mount
            firstTime.current = true;
            return;
        }
        if (!enterPressed.current) { //skip on mount
            return;
        }
        const lastTrueKey = Object.entries(doneHash).reduce((acc, [key, value]) => {
            return value ? key : acc;
        }, 0);

        // Object.entries(doneHash).map(([ key, value ]) => {
            
            const place = lastTrueKey.split('Done')[0] // remove "Done" from "firstDone" to get 'first'; use for accessing hashmap
            if ( lastTrueKey !== 0 && !refHash.current[place]) { //player has made first guess
                
                cheatVar = greenLetter(correctWord, guesses[place])
                const colorGuess = guesses[place].split('').map((res, ind) => ( // gets color mapping for each letter guess
                    evaluteGuess(res, ind)
                ))
                setGuessResults(prevResults => ({
                    ...prevResults,
                    [place] : [...prevResults[place], ...colorGuess]
                }));
                // console.log(colorGuess)
                // console.log(guesses.first)
                let newKbColor = guesses[place].split('').reduce((acc, res, ind) => { //removes duplicates to map to keyboard (ex. plump) only one color for p.
                    if ( acc[res] == 'green' || acc[res] == 'yellow') {
                        
                            // green and yellow get priority over gray so don't overwrite. 
                            // (ex blimp and guess is booby, first b is green so don't overwrite with second b which is gray.)
                            // (ex blimp and guess is poppy, first p is yellow so don't overwrite with second or third p which is gray.)
                        
                    } else 
                    acc[res] = colorGuess[ind];
                    return acc;
                }, {});
                // console.log(newKbColor)
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
                } else if ( place == "sixth" ){
                    showAnswer(true);
                    setLoss(true);
                    return;
                }
                guessRow.current += 1;
                localStorage.setItem('currentRow',JSON.stringify( guessRow.current)) // just display

                refHash.current[place] = true;
            }
        // })
       
    }, [doneHash]);

    useEffect(() => {
        localStorage.setItem('answer', JSON.stringify(answer))
    }, [answer])

    useEffect(() => {
        localStorage.setItem('loss', JSON.stringify(loss))
    }, [loss])


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

        console.log(guessResults)
        
    }, [guessResults])

    useEffect(() => {
        const existingKbColor = JSON.parse(localStorage.getItem('kbColor')) || [];
        if (JSON.stringify(existingKbColor) !== JSON.stringify(kbColor)) localStorage.setItem('kbColor', JSON.stringify(kbColor));
        
    }, [kbColor])

    const updated = useContext(KeyboardContext); // Solves: user can't refresh to gain infinite wins
    useEffect(() => { // ref
        const existingUpdated = JSON.parse(localStorage.getItem('updatedStats'));
        if (existingUpdated) updated.current = existingUpdated;
    }, [])
    useEffect(() => { // update stats after game finish
        if (( win ^ answer) && !updated.current) {
            axios.post('http://localhost:8081/updateStats', {...userID, win: win, guessWon: guessWon})
            .then(res => {
                console.log(res.data.message)
                updated.current = true;
                localStorage.setItem('updatedStats', JSON.stringify(updated.current))
            })
            .catch(err => console.log(err));
        }
    }, [win, answer])

    useEffect(() => { // 1 sec delay after win before stats is shown
        if (win) {
            setWinCompliment(true);
            setTimeout(() => {
                /* Code to run after 4 seconds */
                // alert('wow you have brain')
                setWinPage(true);
            }, 6000)
        }
    }, [win])

    if(winCompliment) { // show win compliment and fade out
        setTimeout(function() {
            document.getElementById('hidePls') && (document.getElementById('hidePls').id = 'waa');
            setWinCompliment(false);
            }, 5000);
    }

    if(notEnough) { // show not enoguh letters prompt and fade out
        setTimeout(function() {
            document.getElementById('hidePls') && (document.getElementById('hidePls').id = 'waa');
            setNotEnough(false);

            }, 5000);

    }

    if (wrongWord) { // show wrong word prompt and fade out
        setTimeout(function() {
            document.getElementById('hidePls') && (document.getElementById('hidePls').id = 'waa');
            setWrongWord(false);
            }, 5000);
    }

    if (clickDisabledLeaderBoard) { // show disabled leadeboard prompt and fade out
        setTimeout(function() {
            document.getElementById('hidePls') && (document.getElementById('hidePls').id = 'waa');
            setClickDisabledLeaderBoard(false);
            }, 2000);
    }

    if (clickDisabledProfile) { // show disabled profile prompt and fade out
        setTimeout(function() {
            document.getElementById('hidePls') && (document.getElementById('hidePls').id = 'waa');
            setClickDisabledProfile(false);
            }, 2000);
    }

    useEffect(() => {
        if (loss) { // 1 sec delay after loss before stats is shown
            // setLoss(false);
            setTimeout(function() {
                setWinPage(true);
            }, 1000);
            
        }
    }, [loss])
    

    function whichCompliment() { // determines which compliment to give based on how many guesses player took
        const firstTrueIndex = Object.entries(doneHash).findIndex(([key, value]) => !value);
        // console.log(doneHash);
        // console.log(firstTrueIndex);
        if (firstTrueIndex != -1) {
            return firstTrueIndex;
        } else return 6;
    }

    const compliments = [ // compliment list
        "",               
        "Genius",        
        "Magnificent",   
        "Impressive",    
        "Splendid",     
        "Great",        
        "Phew"          
    ];

    const {delay, setDelay} = useContext(KeyboardContext);
    
    useEffect(() => {
        if (!winPage) {
            setTimeout(function() {
                setDelay(false);
                }, 1000);
        }
    }, [winPage])

    const backgroundColor = useRef('transparent');
    const color = useRef('transparent');
    const borderColor = useRef('transparent');

    const style2 = 
        removeStyle ? {} : { backgroundColor: 'transparent', color: 'transparent', borderColor: (darkMode ? '#3a3a3c' : '#d1d5db')}

    function handleAnimationStart() {
        setTimeout(() => {
            setRemoveStyle(true);

    }, 400)

    }

    
    

  return (
    <div className={`mx-auto w-[500px] opacity-100 mb-[110px] ${darkMode ? 'bg-[#121213] text-white' : 'bg-white text-black'} z-0`}>

        {guestMode && <div className='absolute top-[60px] left-0 flex justify-center w-full'> <span className='text-green-600 text-2xl rounded-md p-1 font-bold tracking-widest'>Guest Mode</span> </div>}

        {userMode && (!tutorial && !leaderBoard && !profilePage && !settings ) && <div className='absolute top-[60px] left-0 flex justify-center w-full z-0'> <button className={` ${darkMode ?'text-gray-200' : 'text-gray-500' } text-2xl rounded-md p-1 font-bold tracking-widest cursor-default`}>{userID.username}</button> </div>}

        {winCompliment && <div id='hidePls' className='absolute top-[120px] left-0 flex justify-center w-full'> <span className='bg-black rounded-md text-white p-3 font-bold tracking-[0.5px]'>{compliments[whichCompliment()] || ''}</span> </div>}

        {notEnough && <div id='hidePls' className='absolute top-[120px] left-0 flex justify-center w-full'> <span className='bg-black rounded-md text-white p-3 font-bold tracking-[0.5px]'>Not enough letters</span> </div>}

        {wrongWord && <div id='hidePls' className='absolute top-[120px] left-0 flex justify-center w-full'> <span className='bg-black rounded-md text-white p-3 font-bold tracking-[0.5px]'>Not in word list</span> </div>}

        {clickDisabledLeaderBoard && <div id='hidePls' className='absolute top-[120px] left-0 flex justify-center w-full'> <span className='bg-black rounded-md text-white p-3 font-bold tracking-[0.5px]'>Login to access leaderboards</span> </div>}

        {clickDisabledProfile && <div id='hidePls' className='absolute top-[120px] left-0 flex justify-center w-full'> <span className='bg-black rounded-md text-white p-3 font-bold tracking-[0.5px]'>Login to access profile</span> </div>}

                
        {/* {winPage && <div className=''> <Statistics /> </div>
        } */}
    {/* {winPage || delay &&  */}

    {/* <ClickAwayListener onClickAway={handleClickAway}> */}

        {(winPage || delay )&& 
        <Zoom in={winPage} timeout={500}>
            <div className='absolute top-[250px] w-[500px] h-fit rounded-md shadow-xl z-20' >
                <Statistics /> 
            </div>
        </Zoom>
        }


                {/* {winPage && 
                <>  
                    <div className='absolute top-[250px] w-[500px] h-fit rounded-md shadow-xl bg-white z-20' >
                        <Statistics /> 
                    </div>
                    <div className='absolute top-0 left-0 w-screen h-[1000px] bg-white/50 z-10'>
                     </div>
                </>
                } */}

        {/* </ClickAwayListener> */}

    {/* } */}

        {winPage && <div className={`absolute top-0 left-0 w-screen h-[930px] ${darkMode ? 'bg-black/50' : 'bg-white/50'}  z-10`}>
            </div> }

        {answer && <div className='absolute top-[120px] left-0 flex justify-center w-full'> <span className='bg-black rounded-md text-white p-3 font-bold tracking-[0.5px]'>{correctWord}</span> </div>}

        <div className='grid grid-cols-5 w-[340px] mx-auto gap-2'>

            { //displays grid, simplified immensly
            Object.entries(doneHash).map(([key, value]) => ( // maps how many rows
                <div key={key}className='flex col-span-5 gap-2'>
                    {value ? //through debuggin there is a time delay between which makes it so value is true but what is displayed is empty div because guessResults is not populated yet
                    <>   {/* // The div the player guessed in would become 0 because while value == true, guessResults state hadn't updated and so it essentially rendered an empty div which cause the first div to shrink to h-0 and thus only the 2,3,4,5,6 divs rendered, thats why it looked like the bottom div disappeared.*/}
                        {guessResults[key.split('Done')[0]] && guessResults[key.split('Done')[0]].length > 0 ?
                            (guessResults[key.split('Done')[0]].map((res, ind) => { // maps how many columns (user input)
                                const delay = ind * 100;
                                const style1 = {
                                    animationDelay: `${delay}ms`,
                                };
                                return (
                                    
                                <button style={{ ...style1 , ...style2}} onAnimationStart={handleAnimationStart} className= { `flip border-2 cursor-default ${
                                    res == 'green' ? ( colorBlind ? 'CBgreen'  : 'green' ) :  
                                    res == 'yellow' ? ( colorBlind ? 'CByellow' : 'yellow' ) : 
                                    ( darkMode ? 'DMgray' : 'gray' ) } 
                                    flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold text-white` }>
                                    {guesses[key.split('Done')[0]][ind] || ''}
                                </button>
                                )
                            }))  : [0,1,2,3,4].map((res) => ( // maps how many columns (empty input)
                                guesses[key.split('Done')[0]][res]
                                ? 
                                <button className='cursor-default border-2 border-gray-500 flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold'>
                                    {guesses[key.split('Done')[0]][res]}
                                </button>
                                : 
                                <button className='cursor-default border-2 border-gray-300 flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold'>
                                </button>
                            
                            ))
                            }
                    </>
                    :   
                    <>
                        {[0,1,2,3,4].map((res) => ( // maps how many columns (empty input)
                            guesses[key.split('Done')[0]][res]
                            ? 
                            <div  className='border-2 border-[#565758] flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold'>
                                {guesses[key.split('Done')[0]][res]}
                            </div>
                            : 
                            <div  className={`border-2 ${darkMode && 'border-[#3a3a3c]'} flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold`}>
                            </div>
                        
                        ))}
                    </>
                    }
                </div>
            ))
        }
        
        </div>
    
    </div>
  )
}

export default Grid
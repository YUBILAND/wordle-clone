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
    const {setKbColor} = useContext(KeyboardContext);
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
    const [guessResults, setGuessResults] = useState({first: [], second: [], third: [], fourth: [], fifth: [], sixth: []})
    const refHash = useRef({first: false, second: false, third: false, fourth: false, fifth: false, sixth: false})
    const [loading, setLoading] = useState(true);
    const [correctWord, setCorrectWord] = useState('');
    const{guesses, setGuesses} = useContext(KeyboardContext);
    const {clickDisabledLeaderBoard, setClickDisabledLeaderBoard} = useContext(KeyboardContext);
    const {clickDisabledProfile, setClickDisabledProfile} = useContext(KeyboardContext);
    const {guestMode, setGuestMode} = useContext(KeyboardContext);
    const {guessLength, setGuessLength} = useContext(KeyboardContext);
    const [loss, setLoss] = useState(false);



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
        if (wordleList.length > 0) {
        setCorrectWord(wordleList[Math.floor(Math.random() * 2315)].toUpperCase());
        // setCorrectWord('BLIMP')
        // console.log(wordleList);
        setLoading(false);
        }
    }, [wordleList])

    useEffect(() => { // prints correctWord
        if( correctWord )
            console.log('The Correct Word is ' + correctWord)
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

    useEffect(() => { // 'Enter' Key Functionality
        const onPress = (event) => {
            if (event.key === 'Enter') {
                if (!doneHash.firstDone) {
                    if (canEnterHash.firstCanEnter) {
                        if (wordleList.includes(guesses.first.toLowerCase())) {
                            setDoneHash(prevDone => ({ ...prevDone, firstDone: true}));
                            setGuessLength(0);
                        } else setWrongWord(true);
                    } else setNotEnough(true);
                }
                else if (!doneHash.secondDone) {
                    if (canEnterHash.secondCanEnter) {
                        if (wordleList.includes(guesses.second.toLowerCase())) {
                            setDoneHash(prevDone => ({ ...prevDone, secondDone: true}));
                            setGuessLength(0);
                        } else setWrongWord(true);
                    } else setNotEnough(true);
                }
                else if (!doneHash.thirdDone) {
                    if (canEnterHash.thirdCanEnter) {
                        if (wordleList.includes(guesses.third.toLowerCase())) {
                            setDoneHash(prevDone => ({ ...prevDone, thirdDone: true}));
                            setGuessLength(0);
                        } else setWrongWord(true);
                    } else setNotEnough(true);
                }
                else if (!doneHash.fourthDone) {
                    if (canEnterHash.fourthCanEnter) {
                        if (wordleList.includes(guesses.fourth.toLowerCase())) {
                            setDoneHash(prevDone => ({ ...prevDone, fourthDone: true}));
                            setGuessLength(0);
                        } else setWrongWord(true);
                    } else setNotEnough(true);
                }
                else if (!doneHash.fifthDone) {
                    if (canEnterHash.fifthCanEnter) {
                        if (wordleList.includes(guesses.fifth.toLowerCase())) {
                            setDoneHash(prevDone => ({ ...prevDone, fifthDone: true}));
                            setGuessLength(0);
                        } else setWrongWord(true);
                    } else setNotEnough(true);
                }
                else if (!doneHash.sixthDone) {
                    if (canEnterHash.sixthCanEnter) {
                        if (wordleList.includes(guesses.sixth.toLowerCase())) {
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

    const whichguessacc = useRef(1); // use ref to keep track of variable between useEffect renders
    useEffect(() => { // evaluates guess, sets when user wins or loses
        Object.entries(doneHash).map(([ key, value ]) => {
            const place = key.split('Done')[0] // removes Done from key like firstDone leaving first to access value of other hashmap
            if (value && !refHash.current[place]) { //player has made first guess
                
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
                    setGuessWon('guess' + String(whichguessacc.current));
                } else if ( place == "sixth" ){
                    showAnswer(true);
                    setLoss(true);
                }
                whichguessacc.current += 1;

                refHash.current[place] = true;
            }
        })
       
    }, [doneHash]);

    useEffect(() => { // update stats after game finish
        if (win ^ answer) {
            axios.post('http://localhost:8081/updateStats', {...userID, win: win, guessWon: guessWon})
            .then(res => {
                console.log(res.data.message)
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
            }, 1000)
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

    if (loss) { // 1 sec delay after loss before stats is shown
        setLoss(false);
        setTimeout(function() {
            setWinPage(true);
        }, 1000);
        
    }

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

    // const handleClickAway = () => {
    //     setWinPage(false);
    //     setDelay(true);
        

    //     setTimeout(function() {
    //         setDelay(false);
    //         }, 1000);
    // }
    
    useEffect(() => {
        if (!winPage) {
            setTimeout(function() {
                setDelay(false);
                }, 1000);
        }
    }, [winPage])

    
    

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

        <div className='grid grid-cols-5 w-[340px] mx-auto gap-2 '>

            { //displays grid, simplified immensly
            Object.entries(doneHash).map(([key, value]) => ( // maps how many rows

                (value) ? 
                <>

                    {guessResults[key.split('Done')[0]].map((res, ind) => ( // maps how many columns
                        <div  className= { `border-2  ${
                            res == 'green' ? ( colorBlind ? 'CBgreen' : 'green' ) :  
                            res == 'yellow' ? ( colorBlind ? 'CByellow' : 'yellow' ) : 
                            'gray' } 
                            flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold text-white` }>
                            {guesses[key.split('Done')[0]][ind] || ''}
                        </div>
                    ))}
                </>
                :   
                <>
                    {[0,1,2,3,4].map((res) => (
                        guesses[key.split('Done')[0]][res]
                        ? 
                        <div  className='border-2 border-gray-500 flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold'>
                            {guesses[key.split('Done')[0]][res]}
                        </div>
                        : 
                        <div  className='border-2 border-gray-300 flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold'>
                        </div>
                    
                    ))}
                </>
            ))
        }
        
        </div>
    
    </div>
  )
}

export default Grid
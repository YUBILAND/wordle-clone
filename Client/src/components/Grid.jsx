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
                Object.entries(doneHash).some(([key,val]) => {
                    if (!val && guessLength > 0) {
                        const firstDonetoFirst = key.split('Done')[0];;
                        setGuessLength(prevGuessLen => prevGuessLen - 1);
                        setGuesses( prevGuess => ({ ...prevGuess, [firstDonetoFirst]: (prevGuess[firstDonetoFirst].slice(0, prevGuess[firstDonetoFirst].length - 1))}))
                        return true;
                    }
                    return false;
                })
            } else if (event.key.match(/[a-zA-Z]/) && event.key.length === 1) {
                Object.entries(doneHash).some(([key,val]) => {
                    if (!val && guessLength < 5) {
                        const firstDonetoFirst = key.split('Done')[0];;
                        setGuessLength(prevGuessLen => prevGuessLen + 1);
                        setGuesses( prevGuess => ({ ...prevGuess, [firstDonetoFirst]: (prevGuess[firstDonetoFirst] + event.key.toUpperCase())}))
                        return true;
                    }
                    return false;
                })
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

    const {enterPressed, setEnterPressed} = useContext(KeyboardContext);
    const {removeStyle, setRemoveStyle} = useContext(KeyboardContext);

    useEffect(() => { // 'Enter' Key Functionality
        const onPress = (event) => {
            if (event.key === 'Enter') {
                Object.entries(doneHash).some(([key, val]) => {
                    if (!val) {
                        const firstDonetoFirstCanEnter = key.split('Done')[0] + 'CanEnter' // changes firstDone to firstCanEnter
                        if (canEnterHash[firstDonetoFirstCanEnter]) {
                            const firstDonetoFirst = key.split('Done')[0]  // changes firstDone to first
                            if (wordleList.includes(guesses[firstDonetoFirst].toLowerCase())) {
                                setEnterPressed(true);
                                setRemoveStyle(false);
                                setDoneHash(prevDone => ({ ...prevDone, [key]: true}));
                                setGuessLength(0);
                            } else setWrongWord(true); 

                        } else setNotEnough(true);
                        return true;
                    }
                    return false;
                })
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
        Object.entries(doneHash).some(([key, val]) => {
            if (!val) {
                const firstDonetoFirst = key.split('Done')[0] // 'firstDone' to 'first'
                const firstDonetoFirstCanEnter = key.split('Done')[0] + 'CanEnter' // 'firstDone' to 'firstCanEnter'
                if (guesses[firstDonetoFirst].length == 5) setCanEnterHash(prevCanEnter => ({ ...prevCanEnter, [firstDonetoFirstCanEnter]: true}));
                else setCanEnterHash(prevCanEnter => ({ ...prevCanEnter, [firstDonetoFirstCanEnter]: false}));
                return true;
            }
            return false;
        })
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
                    localStorage.setItem('answer', JSON.stringify(answer))
                    setLoss(true);
                    localStorage.setItem('loss', JSON.stringify(loss))
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

    useEffect(() => {
        if (loss) { // 1 sec delay after loss before stats is shown
            setTimeout(function() {
                setWinPage(true);
            }, 1000);
        }
    }, [loss])
    
    function whichCompliment() { // determines which compliment to give based on how many guesses player took
        const firstTrueIndex = Object.entries(doneHash).findIndex(([key, value]) => !value);
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

    function handleAnimationStart() {
        setTimeout(() => {
            setRemoveStyle(true);
        }, 400)
    }

    // const flipButtons = document.querySelectorAll('button.flip');
    // setTimeout(() => {
    //     flipButtons.forEach(button => {
    //         button.classList.remove('flip');  // 'flip' animation class caused it to appear above mui slide animation, so remove classname after animation finishes
    //     });
    // }, 1000) 

    const [clickedSettings, setClickedSettings] = useState(false);
    const skipMount = useRef(false);
    useEffect(() => {
        
        if (skipMount.current) {
            setClickedSettings(true);
            // setTimeout(() => {
            //     setClickedSettings(false);

            // }, 1000)
        }
        if (!skipMount.current) {
            skipMount.current = true;
        }

    }, [settings])
    
    useEffect(() => {
        setClickedSettings(false);
    }, [doneHash])

  return (

    <div className={`mx-auto w-[500px] opacity-100 mb-[110px] ${darkMode ? 'bg-[#121213] text-white' : 'bg-white text-black'} z-0`}>

        {guestMode && <div className='absolute top-[60px] left-0 flex justify-center w-full'> <span className='text-green-600 text-2xl rounded-md p-1 font-bold tracking-widest'>Guest Mode</span> </div>}

        {userMode && (!tutorial && !leaderBoard && !profilePage && !settings ) && <div className='absolute top-[60px] left-0 flex justify-center w-full z-0'> <button className={` ${darkMode ?'text-gray-200' : 'text-gray-500' } text-2xl rounded-md p-1 font-bold tracking-widest cursor-default`}>{userID.username}</button> </div>}

        {winCompliment && <div id='hidePls' className='absolute top-[120px] left-0 flex justify-center w-full'> <span className='bg-black rounded-md text-white p-3 font-bold tracking-[0.5px]'>{compliments[whichCompliment()] || ''}</span> </div>}

        {notEnough && <div id='hidePls' className='absolute top-[120px] left-0 flex justify-center w-full'> <span className='bg-black rounded-md text-white p-3 font-bold tracking-[0.5px]'>Not enough letters</span> </div>}

        {wrongWord && <div id='hidePls' className='absolute top-[120px] left-0 flex justify-center w-full'> <span className='bg-black rounded-md text-white p-3 font-bold tracking-[0.5px]'>Not in word list</span> </div>}

        {clickDisabledLeaderBoard && <div id='hidePls' className='absolute top-[120px] left-0 flex justify-center w-full'> <span className='bg-black rounded-md text-white p-3 font-bold tracking-[0.5px]'>Login to access leaderboards</span> </div>}

        {clickDisabledProfile && <div id='hidePls' className='absolute top-[120px] left-0 flex justify-center w-full'> <span className='bg-black rounded-md text-white p-3 font-bold tracking-[0.5px]'>Login to access profile</span> </div>}

        {(winPage || delay )&& 
        <Zoom in={winPage} timeout={500}>
            <div className='absolute top-[250px] w-[500px] h-fit rounded-md shadow-xl z-20' >
                <Statistics /> 
            </div>
        </Zoom>
        }

        {winPage && <div className={`absolute top-0 left-0 w-screen h-[930px] ${darkMode ? 'bg-black/50' : 'bg-white/50'}  z-10`}>
            </div> }

        {answer && <div className='absolute top-[120px] left-0 flex justify-center w-full'> <span className='bg-black rounded-md text-white p-3 font-bold tracking-[0.5px]'>{correctWord}</span> </div>}

        <div className='grid grid-cols-5 w-[340px] mx-auto gap-2'>

        {clickedSettings && console.log("clicked settings")}

        {clickedSettings 

            ?
            
        Object.entries(doneHash).map(([key, value]) => { // maps how many rows
            // const lastTrueKey = Object.entries(doneHash).reduce((acc, [key, value]) => {
            //     return value ? key : acc;
            // }, 0);
            const firstDonetoFirst = key.split('Done')[0];
            return ( 
                (guessesLoaded.current && value) ? 
                <>
                    {guessResults[firstDonetoFirst] && guessResults[firstDonetoFirst].length > 0 ?
                        (guessResults[firstDonetoFirst].map((res, ind) => ( // maps how many columns (user input)
                            
                            <button className= { `border-2 cursor-default ${
                                res == 'green' ? ( colorBlind ? 'CBgreen'  : 'green' ) :  
                                res == 'yellow' ? ( colorBlind ? 'CByellow' : 'yellow' ) : 
                                ( darkMode ? 'DMgray' : 'gray' ) } 
                                flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold text-white` }>
                                {guesses[firstDonetoFirst][ind] || ''}
                            </button>
                            
                        )))  : [0,1,2,3,4].map((res) => ( // maps how many columns (empty input)
                            guesses[firstDonetoFirst][res]
                            ? 
                            <button className='cursor-default border-2 border-gray-500 flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold'>
                                {guesses[firstDonetoFirst][res]}
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
                        guesses[firstDonetoFirst][res]
                        ? 
                        <div  className='border-2 border-[#565758] flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold'>
                            {guesses[firstDonetoFirst][res]}
                        </div>
                        : 
                        <div  className={`border-2 ${darkMode && 'border-[#3a3a3c]'} flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold`}>
                        </div>
                    
                    ))}
                </>
            )})

            :

            Object.entries(doneHash).map(([key, value]) => { // maps how many rows

                const lastTrueKey = Object.entries(doneHash).reduce((acc, [key, value]) => {
                    return value ? key : acc;
                }, 0);
                const firstDonetoFirst = key.split('Done')[0];
                return ( 

                    // on mount here
                    <div key={key}className='flex col-span-5 gap-2'>
                    { 
                        ( 
                            (value && !guessesLoaded.current) || (guessesLoaded.current && key === lastTrueKey)) ?  // on first refresh need animation, on user guess need row animation
                        <>
                            {guessResults[firstDonetoFirst] && guessResults[firstDonetoFirst].length > 0 ?
                                (guessResults[firstDonetoFirst].map((res, ind) => { // maps how many columns (user input)
                                    const delay = ind * 100;
                                    const style1 = {
                                        animationDelay: `${delay}ms`,
                                    };
                                    const style2 = removeStyle ? {} : { backgroundColor: 'transparent', color: 'transparent', borderColor: (darkMode ? '#3a3a3c' : '#d1d5db')}
                                    return (
                                        <button style={{ ...style1 , ...style2}} onAnimationStart={handleAnimationStart} className= { `flip border-2 cursor-default ${
                                            res == 'green' ? ( colorBlind ? 'CBgreen'  : 'green' ) :  
                                            res == 'yellow' ? ( colorBlind ? 'CByellow' : 'yellow' ) : 
                                            ( darkMode ? 'DMgray' : 'gray' ) } 
                                            flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold text-white` }>
                                            {guesses[firstDonetoFirst][ind] || ''}
                                        </button>
                                    )
                                }))  : [0,1,2,3,4].map((res) => ( // maps how many columns (empty input)
                                    guesses[firstDonetoFirst][res]
                                    ? 
                                    <button className='cursor-default border-2 border-gray-500 flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold'>
                                        {guesses[firstDonetoFirst][res]}
                                    </button>
                                    : 
                                    <button className='cursor-default border-2 border-gray-300 flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold'>
                                    </button>
                                
                                ))
                            }
                        </>
                        :   
                        (guessesLoaded.current && (key !== lastTrueKey) && value) ? // previous guesses, after making guess they should have no animation
                            <>
                                {guessResults[firstDonetoFirst] && guessResults[firstDonetoFirst].length > 0 ?
                                    (guessResults[firstDonetoFirst].map((res, ind) => ( // maps how many columns (user input)
                                        
                                        <button className= { `border-2 cursor-default ${
                                            res == 'green' ? ( colorBlind ? 'CBgreen'  : 'green' ) :  
                                            res == 'yellow' ? ( colorBlind ? 'CByellow' : 'yellow' ) : 
                                            ( darkMode ? 'DMgray' : 'gray' ) } 
                                            flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold text-white` }>
                                            {guesses[firstDonetoFirst][ind] || ''}
                                        </button>
                                        
                                    )))  : [0,1,2,3,4].map((res) => ( // maps how many columns (empty input)
                                        guesses[firstDonetoFirst][res]
                                        ? 
                                        <button className='cursor-default border-2 border-gray-500 flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold'>
                                            {guesses[firstDonetoFirst][res]}
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
                                guesses[firstDonetoFirst][res]
                                ? 
                                <div  className='border-2 border-[#565758] flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold'>
                                    {guesses[firstDonetoFirst][res]}
                                </div>
                                : 
                                <div  className={`border-2 ${darkMode && 'border-[#3a3a3c]'} flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold`}>
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
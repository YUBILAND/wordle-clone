import React, { useEffect, useState, useRef, useContext } from 'react'
import raw from '../assets/wordle-La.txt'
import { KeyboardContext } from '../Contexts/KeyboardContext';
import CloseIcon from '@mui/icons-material/Close';
import ReplayIcon from '@mui/icons-material/Replay';
import ShareIcon from '@mui/icons-material/Share';
import './Grid.css'
import Statistics from './Statistics';
import axios from 'axios';

const Grid = () => {

    
    // const [kbColor, setKbColor] = useState({});
    const {darkMode} = useContext(KeyboardContext);
    const {userID, setUserID} = useContext(KeyboardContext);
    const {setKbColor} = useContext(KeyboardContext);
    const {winPage, setWinPage} = useContext(KeyboardContext);
    const {guessWon, setGuessWon} = useContext(KeyboardContext);
    const [winCompliment, setWinCompliment] = useState(false);
    const {win, setWin} = useContext(KeyboardContext);
    const [answer, showAnswer] = useState(false);
    const {notEnough, setNotEnough} = useContext(KeyboardContext);
    const {wrongWord, setWrongWord} = useContext(KeyboardContext);
    const {wordleList, setWordleList} = useContext(KeyboardContext);
    const {doneHash, setDoneHash} = useContext(KeyboardContext);
    const {canEnterHash, setCanEnterHash} = useContext(KeyboardContext);
    const [guessResults, setGuessResults] = useState({first: [], second: [], third: [], fourth: [], fifth: [], sixth: []})
    const firstRef = useRef(false);
    const secondRef = useRef(false);
    const thirdRef = useRef(false);
    const fourthRef = useRef(false);
    const fifthRef = useRef(false);
    const sixthRef = useRef(false);

    const [loading, setLoading] = useState(true);
    const [correctWord, setCorrectWord] = useState('');

    // const[guesses, setGuesses] = useState({first: '', second: '', third: '', fourth: '', fifth: '', sixth: ''});
    const{guesses, setGuesses} = useContext(KeyboardContext);

    const [dummyWords, setDummyWords] = useState({first: '', second: '', third: '', fourth: '', fifth: '', sixth: ''});

    useEffect(() => {
        const fetchWords = async () => { 
            const response = await fetch(raw);
            const text = await response.text();
            const lines = text.split('\r\n').slice(0, 2315);
            setWordleList(lines)
        };
        fetchWords();
    }, []);
    
    useEffect(() => {
        if (wordleList.length > 0) {
        setCorrectWord(wordleList[Math.floor(Math.random() * 2315)].toUpperCase());
        console.log(wordleList);
        setLoading(false);
        }
    }, [wordleList])

    useEffect(() => {
        setDummyWords({first: correctWord})
        if( correctWord )
            console.log(correctWord)
    }, [correctWord])

    const {guessLength, setGuessLength} = useContext(KeyboardContext);

    // var guessLength = 0;

    useEffect(() => {
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


    useEffect(() => {
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
    
    const compareString = (str1, str2) => {
        var indexMatch = '';
        for (let i = 0; i < str1.length; i++) {
            if (str1[i] == str2[i]) {
                indexMatch += i;
            }
        } return indexMatch;
    }
    
    useEffect(() => {
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

    const greenLetter = (dummyWord, guessedWord) => {
        const greenIndex = compareString(correctWord, guessedWord);
        var offset = 0;
        for (let i = 0; i < greenIndex.length; i++) {
            dummyWord = dummyWord.slice(0, [parseInt(greenIndex[i]) - offset]) + dummyWord.slice(parseInt(greenIndex[i]) + 1 - offset);
            console.log(dummyWord)
            offset++;
        }
        return dummyWord;
    }

    const evalGuess = (dummyWord, letter, pos) => {
        if (letter == correctWord[pos]) {
            return 'green';
        } else if (dummyWord.includes(letter)) {
            return 'yellow';
        } else {
            return 'gray';
        }
    }

    var cheatVar;

    const evaluteGuess = (res, ind) => {
        if (guessResults.first) {
            
            const newCheatVar = cheatVar;
            cheatVar = cheatVar.replace(res, '')
            return evalGuess(newCheatVar, res, ind) //check for green, yellow and gray
        }
    }

    useEffect(() => {
        if (doneHash.firstDone && !firstRef.current) { //player has made first guess
            cheatVar = greenLetter(correctWord, guesses.first)
            const colorGuess = guesses.first.split('').map((res, ind) => (
                evaluteGuess(res, ind)
            ))
            setGuessResults(prevResults => ({
                ...prevResults,
                first: [...prevResults.first, ...colorGuess]
            }));
            let newKbColor = guesses.first.split('').reduce((acc, res, ind) => {
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
                setGuessWon('guess1');
            }
            firstRef.current = true;
        }
        if (doneHash.secondDone && !secondRef.current) { //player has made second guess
            cheatVar = greenLetter(correctWord, guesses.second)
            const colorGuess = guesses.second.split('').map((res, ind) => (
                evaluteGuess(res, ind)
            ))
            setGuessResults(prevResults => ({
                ...prevResults,
                second: [...prevResults.second, ...colorGuess]
            }));
            let newKbColor = guesses.second.split('').reduce((acc, res, ind) => {
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
                setGuessWon('guess2');
            }
            secondRef.current = true;
        }
        if (doneHash.thirdDone && !thirdRef.current) { //player has made first guess
            cheatVar = greenLetter(correctWord, guesses.third)
            const colorGuess = guesses.third.split('').map((res, ind) => (
                evaluteGuess(res, ind)
            ))
            setGuessResults(prevResults => ({
                ...prevResults,
                third: [...prevResults.third, ...colorGuess]
            }));
            let newKbColor = guesses.third.split('').reduce((acc, res, ind) => {
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
                setGuessWon('guess3');
            }
            thirdRef.current = true;
        }
        if (doneHash.fourthDone && !fourthRef.current) { //player has made first guess
            cheatVar = greenLetter(correctWord, guesses.fourth)
            const colorGuess = guesses.fourth.split('').map((res, ind) => (
                evaluteGuess(res, ind)
            ))
            setGuessResults(prevResults => ({
                ...prevResults,
                fourth: [...prevResults.fourth, ...colorGuess]
            }));
            let newKbColor = guesses.fourth.split('').reduce((acc, res, ind) => {
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
                setGuessWon('guess4');
            }
            fourthRef.current = true;
        }
        if (doneHash.fifthDone && !fifthRef.current) { //player has made first guess
            cheatVar = greenLetter(correctWord, guesses.fifth)
            const colorGuess = guesses.fifth.split('').map((res, ind) => (
                evaluteGuess(res, ind)
            ))
            setGuessResults(prevResults => ({
                ...prevResults,
                fifth: [...prevResults.fifth, ...colorGuess]
            }));

            let newKbColor = guesses.fifth.split('').reduce((acc, res, ind) => {
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
                setGuessWon('guess5');
            }
            fifthRef.current = true;
        }
        if (doneHash.sixthDone && !sixthRef.current) { //player has made final guess
            cheatVar = greenLetter(correctWord, guesses.sixth)
            const colorGuess = guesses.sixth.split('').map((res, ind) => (
                evaluteGuess(res, ind)
            ))
            setGuessResults(prevResults => ({
                ...prevResults,
                sixth: [...prevResults.sixth, ...colorGuess]
            }));
            let newKbColor = guesses.sixth.split('').reduce((acc, res, ind) => {
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
                setGuessWon('guess6');

            } else {
                showAnswer(true);
            }
            sixthRef.current = true;
        }
        // Repeat this pattern for the remaining guesses (third, fourth, etc.)
    }, [doneHash]);

    useEffect(() => {
        if (win ^ answer) {
            console.log(userID.id)
            
            axios.post('http://localhost:8081/updateStats', {...userID, win: win, guessWon: guessWon})
            .then(res => {
                console.log(res.data.message)
            })
            .catch(err => console.log(err));
        }
    }, [win, answer])

    useEffect(() => {

        if (win) {
            setWinCompliment(true);
            setTimeout(() => {
                /* Code to run after 4 seconds */
                // alert('wow you have brain')
                setWinPage(true);
                // const allExceptDiv = document.querySelectorAll("body > *:not(#stats):not(#stats *)");
                // allExceptDiv.forEach(el => el.classList.add("unfocus"))

            }, 1000)
            
        }

    }, [win])

    if(winCompliment) {
        setTimeout(function() {
            document.getElementById('hidePls') && (document.getElementById('hidePls').id = 'waa');
            setWinCompliment(false);
            }, 5000);
    }

    if(notEnough) {
        setTimeout(function() {
            document.getElementById('hidePls') && (document.getElementById('hidePls').id = 'waa');
            setNotEnough(false);

            }, 5000);

    }

    if (wrongWord) {
        setTimeout(function() {
            document.getElementById('hidePls') && (document.getElementById('hidePls').id = 'waa');
            setWrongWord(false);

            }, 5000);
    }

    if (answer) {
        setTimeout(function() {
            setWinPage(true);
        }, 1000);
    }

    function whichCompliment() {
        const firstTrueIndex = Object.entries(doneHash).findIndex(([key, value]) => !value);
        console.log(doneHash);
        console.log(firstTrueIndex);
        if (firstTrueIndex != -1) {
            return firstTrueIndex;
        } else return 6;
    }

    const compliments = [
        "",               
        "Genius",        
        "Magnificent",   
        "Impressive",    
        "Splendid",     
        "Great",        
        "Phew"          
    ];


  return (
    <div className={`mx-auto w-[500px] opacity-100 mb-[110px] ${darkMode ? 'bg-[#121213] text-white' : 'bg-white text-black'}`}>

        {winCompliment && <div id='hidePls' className='absolute top-[120px] left-0 flex justify-center w-full'> <span className='bg-black rounded-md text-white p-3 font-bold tracking-[0.5px]'>{compliments[whichCompliment()] || ''}</span> </div>}

        {notEnough && <div id='hidePls' className='absolute top-[120px] left-0 flex justify-center w-full'> <span className='bg-black rounded-md text-white p-3 font-bold tracking-[0.5px]'>Not enough letters</span> </div>}

        {wrongWord && <div id='hidePls' className='absolute top-[120px] left-0 flex justify-center w-full'> <span className='bg-black rounded-md text-white p-3 font-bold tracking-[0.5px]'>Not in word list</span> </div>}

        {winPage && <Statistics /> }

        {answer && <div className='absolute top-[120px] left-0 flex justify-center w-full'> <span className='bg-black rounded-md text-white p-3 font-bold tracking-[0.5px]'>{correctWord}</span> </div>}

        <div className='grid grid-cols-5 w-[340px] mx-auto gap-2 '>

            { (doneHash.firstDone && firstRef.current) ? 
            <>
                {guessResults.first.map((res, ind) => (
                    <div className= { `border-2  ${res == 'green' ? 'bg-[#6aaa64]' :  res == 'yellow' ? 'bg-[#c9b458]' : 'bg-[#787c7e]'} flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold text-white` }>
                        {guesses['first'][ind] || ''}
                    </div>
                ))}
            </>
            :   
            <>
                {[0,1,2,3,4].map((res) => (
                    guesses['first'][res]
                    ? 
                    <div className='border-2 border-gray-500 flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold'>
                        {guesses['first'][res]}
                    </div>
                    : 
                    <div className='border-2 border-gray-300 flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold'>
                    </div>
                    
                    // <div className='border-2 border-gray-500 flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold'>
                    //     {guesses['first'][res] || ''}
                    // </div>
                ))}
            </>
            }

            { doneHash.secondDone ? 
            <>
                {guessResults.second.map((res, ind) => (
                    <div className= { `border-2  ${res == 'green' ? 'bg-[#6aaa64]' :  res == 'yellow' ? 'bg-[#c9b458]' : 'bg-[#787c7e]'} flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold text-white` }>
                        {guesses['second'][ind] || ''}
                    </div>
                ))}
            </>
            :   
            <>
                {[0,1,2,3,4].map((res) => (
                    guesses['second'][res]
                    ? 
                    <div className='border-2 border-gray-500 flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold'>
                        {guesses['second'][res]}
                    </div>
                    : 
                    <div className='border-2 border-gray-300 flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold'>
                    </div>
                ))}
            </>
            }

            { doneHash.thirdDone ? 
            <>
                {guessResults.third.map((res, ind) => (
                    <div className= { `border-2  ${res == 'green' ? 'bg-[#6aaa64]' :  res == 'yellow' ? 'bg-[#c9b458]' : 'bg-[#787c7e]'} flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold text-white` }>
                        {guesses.third[ind] || ''}
                    </div>
                ))}
            </>
            :   
            <>
                {[0,1,2,3,4].map((res) => (
                    guesses['third'][res]
                    ? 
                    <div className='border-2 border-gray-500 flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold'>
                        {guesses['third'][res]}
                    </div>
                    : 
                    <div className='border-2 border-gray-300 flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold'>
                    </div>
                ))}
            </>
            }
            { doneHash.fourthDone ? 
            <>
                {guessResults.fourth.map((res, ind) => (
                    <div className= { `border-2  ${res == 'green' ? 'bg-[#6aaa64]' :  res == 'yellow' ? 'bg-[#c9b458]' : 'bg-[#787c7e]'} flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold text-white` }>
                        {guesses.fourth[ind] || ''}
                    </div>
                ))}
            </>
            :   
            <>
                {[0,1,2,3,4].map((res) => (
                    guesses['fourth'][res]
                    ? 
                    <div className='border-2 border-gray-500 flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold'>
                        {guesses['fourth'][res]}
                    </div>
                    : 
                    <div className='border-2 border-gray-300 flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold'>
                    </div>
                ))}
            </>
            }
            { doneHash.fifthDone ? 
            <>
                {guessResults.fifth.map((res, ind) => (
                    <div className= { `border-2  ${res == 'green' ? 'bg-[#6aaa64]' :  res == 'yellow' ? 'bg-[#c9b458]' : 'bg-[#787c7e]'} flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold text-white` }>
                        {guesses.fifth[ind] || ''}
                    </div>
                ))}
            </>
            :   
            <>
                {[0,1,2,3,4].map((res) => (
                    guesses['fifth'][res]
                    ? 
                    <div className='border-2 border-gray-500 flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold'>
                        {guesses['fifth'][res]}
                    </div>
                    : 
                    <div className='border-2 border-gray-300 flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold'>
                    </div>
                ))}
            </>
            }
            { doneHash.sixthDone ? 
            <>
                {guessResults.sixth.map((res, ind) => (
                    <div className= { `border-2  ${res == 'green' ? 'bg-[#6aaa64]' :  res == 'yellow' ? 'bg-[#c9b458]' : 'bg-[#787c7e]'} flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold text-white` }>
                        {guesses.sixth[ind] || ''}
                    </div>
                ))}
            </>
            :   
            <>
                {[0,1,2,3,4].map((res) => (
                    guesses['sixth'][res]
                    ? 
                    <div className='border-2 border-gray-500 flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold'>
                        {guesses['sixth'][res]}
                    </div>
                    : 
                    <div className='border-2 border-gray-300 flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold'>
                    </div>
                ))}
            </>
            }
        </div>
         
        

        

        
    </div>
  )
}

export default Grid
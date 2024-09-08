import React, { useEffect, useState, useRef, useContext } from 'react'
import raw from '../assets/wordle-La.txt'
import { KeyboardContext } from '../Contexts/KeyboardContext';


const Grid = () => {

    
    // const [kbColor, setKbColor] = useState({});

    const {setKbColor} = useContext(KeyboardContext);

    const [wordleList, setWordleList] = useState([]);
    const [firstDone, setFirstDone] = useState(false);
    const [secondDone, setSecondDone] = useState(false);
    const [thirdDone, setThirdDone] = useState(false);
    const [fourthDone, setFourthDone] = useState(false);
    const [fifthDone, setFifthDone] = useState(false);
    const [sixthDone, setSixthDone] = useState(false);

    const [loading, setLoading] = useState(true);
    const [correctWord, setCorrectWord] = useState('');

    const[guesses, setGuesses] = useState({first: '', second: '', third: '', fourth: '', fifth: '', sixth: ''});
    const [dummyWords, setDummyWords] = useState({first: '', second: '', third: '', fourth: '', fifth: '', sixth: ''});

    useEffect(() => {

        const fetchWords = async () => { 
            const response = await fetch(raw);
            const text = await response.text();
            const lines = text.split('\n').slice(0, 2315);
            setWordleList(lines)
        };
        fetchWords();

    }, []);
    
    useEffect(() => {
        if (wordleList.length > 0) {
        setCorrectWord(wordleList[Math.floor(Math.random() * 2315)].toUpperCase());
        // setCorrectWord("ELBOW")
        setLoading(false);
        }
    }, [wordleList])

    useEffect(() => {
        setDummyWords({first: correctWord})
        console.log(correctWord)
    }, [correctWord])


    var guessLength = 0;

    useEffect(() => {
        const onPress = (event) => {
          if (event.key === 'Backspace') {
            if (!firstDone && guessLength > 0) {
                guessLength -= 1;
              setGuesses( prevGuess => ({ ...prevGuess, first: (prevGuess.first.slice(0, prevGuess.first.length - 1))}))
            } 
            else if (!secondDone && guessLength > 0) {
                guessLength -= 1;
                setGuesses( prevGuess => ({ ...prevGuess, second: (prevGuess.second.slice(0, prevGuess.second.length - 1))}))
            } 
            else if (!thirdDone && guessLength > 0) {
                guessLength -= 1;
                setGuesses( prevGuess => ({ ...prevGuess, third: (prevGuess.third.slice(0, prevGuess.third.length - 1))}))
            } 
            else if (!fourthDone && guessLength > 0) {
                guessLength -= 1;
                setGuesses( prevGuess => ({ ...prevGuess, fourth: (prevGuess.fourth.slice(0, prevGuess.fourth.length - 1))}))
            } 
            else if (!fifthDone && guessLength > 0) {
                guessLength -= 1;
                setGuesses( prevGuess => ({ ...prevGuess, fifth: (prevGuess.fifth.slice(0, prevGuess.fifth.length - 1))}))
            } 
            else if (!sixthDone && guessLength > 0) {
                guessLength -= 1;
                setGuesses( prevGuess => ({ ...prevGuess, sixth: (prevGuess.sixth.slice(0, prevGuess.sixth.length - 1))}))
            } 
          } else if (event.key.match(/[a-zA-Z]/) && event.key.length === 1) {
            if (!firstDone && guessLength < 5) {
                guessLength += 1;
                setGuesses( prevGuess => ({ ...prevGuess, first: (prevGuess.first + event.key.toUpperCase())}))
            }
            else if (!secondDone && guessLength < 5) {
                guessLength += 1;
                setGuesses( prevGuess => ({ ...prevGuess, second: (prevGuess.second + event.key.toUpperCase())}))
            } 
            else if (!thirdDone && guessLength < 5) {
                guessLength += 1;
                setGuesses( prevGuess => ({ ...prevGuess, third: (prevGuess.third + event.key.toUpperCase())}))
            } 
            else if (!fourthDone && guessLength < 5) {
                guessLength += 1;
                setGuesses( prevGuess => ({ ...prevGuess, fourth: (prevGuess.fourth + event.key.toUpperCase())}))
            } 
            else if (!fifthDone && guessLength < 5) {
                guessLength += 1;
                setGuesses( prevGuess => ({ ...prevGuess, fifth: (prevGuess.fifth + event.key.toUpperCase())}))
            } 
            else if (!sixthDone && guessLength < 5) {
                guessLength += 1;
                setGuesses( prevGuess => ({ ...prevGuess, sixth: (prevGuess.sixth + event.key.toUpperCase())}))
            }
          } 
        };
    
        // Attach event listener
        document.addEventListener('keydown', onPress);
    
        // Cleanup function to remove event listener
        return () => {
          document.removeEventListener('keydown', onPress);
        };
      }, [firstDone, secondDone, thirdDone, fourthDone, fifthDone, sixthDone]); // Depend only on the completion status

    const [firstCanEnter, setFirstCanEnter] = useState(false);
    const [secondCanEnter, setSecondCanEnter] = useState(false);
    const [thirdCanEnter, setThirdCanEnter] = useState(false);
    const [fourthCanEnter, setFourthCanEnter] = useState(false);
    const [fifthCanEnter, setFifthCanEnter] = useState(false);
    const [sixthCanEnter, setSixthCanEnter] = useState(false);

      useEffect(() => {
        const onPress = (event) => {
            if (event.key === 'Enter') {
                if (!firstDone) {
                    if (firstCanEnter) {
                        setFirstDone(true);
                    } else alert("NOt enough letters");
                }
                else if (!secondDone) {
                    if (secondCanEnter) {
                        setSecondDone(true);
                    } else alert("NOt enough letters");
                }
                else if (!thirdDone) {
                    if (thirdCanEnter) {
                        setThirdDone(true);
                    } else alert("NOt enough letters");
                }
                else if (!fourthDone) {
                    if (fourthCanEnter) {
                        setFourthDone(true);
                    } else alert("NOt enough letters");
                }
                else if (!fifthDone) {
                    if (fifthCanEnter) {
                        setFifthDone(true);
                    } else alert("NOt enough letters");
                }
                else if (!sixthDone) {
                    if (sixthCanEnter) {
                        setSixthDone(true);
                    } else alert("NOt enough letters");
                }
            }
        }
        document.addEventListener('keydown', onPress);
        return () => {
          document.removeEventListener('keydown', onPress);
        };
    },[firstDone, secondDone, thirdDone, fourthDone, fifthDone, sixthDone, firstCanEnter, secondCanEnter, thirdCanEnter, fourthCanEnter, fifthCanEnter, sixthCanEnter])
    

    const compareString = (str1, str2) => {
        var indexMatch = '';
        for (let i = 0; i < str1.length; i++) {
            if (str1[i] == str2[i]) {
                indexMatch += i;
            }
        } return indexMatch;
    }
    
    useEffect(() => {
        if (!firstDone) {
            if (guesses.first.length == 5) setFirstCanEnter(true);
            else setFirstCanEnter(false);
        }
        else if (!secondDone) {
            if (guesses.second.length == 5) setSecondCanEnter(true);
            else setSecondCanEnter(false);
        }
        else if (!thirdDone) {
            if (guesses.third.length == 5) setThirdCanEnter(true);
            else setThirdCanEnter(false);
        }
        else if (!fourthDone) {
            if (guesses.fourth.length == 5) setFourthCanEnter(true);
            else setFourthCanEnter(false);
        }
        else if (!fifthDone) {
            if (guesses.fifth.length == 5) setFifthCanEnter(true);
            else setFifthCanEnter(false);
        }
        else if (!sixthDone) {
            if (guesses.sixth.length == 5) setSixthCanEnter(true);
            else setSixthCanEnter(false);
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
    
    const [guessResults, setGuessResults] = useState({first: [], second: [], third: [], fourth: [], fifth: [], sixth: []})
    const firstRef = useRef(false);
    const secondRef = useRef(false);
    const thirdRef = useRef(false);
    const fourthRef = useRef(false);
    const fifthRef = useRef(false);
    const sixthRef = useRef(false);

    var cheatVar;

    const evaluteGuess = (res, ind) => {
        if (guessResults.first) {
            
            const newCheatVar = cheatVar;
            cheatVar = cheatVar.replace(res, '')
            return evalGuess(newCheatVar, res, ind) //check for green, yellow and gray
        }
    }

    

    var newKbColor;
    useEffect(() => {
        if (firstDone && !firstRef.current) { //player has made first guess

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
            
            firstRef.current = true;
        }
        if (secondDone && !secondRef.current) { //player has made first guess
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

            secondRef.current = true;
        }
        if (thirdDone && !thirdRef.current) { //player has made first guess
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

            thirdRef.current = true;
        }
        if (fourthDone && !fourthRef.current) { //player has made first guess
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

            fourthRef.current = true;
        }
        if (fifthDone && !fifthRef.current) { //player has made first guess
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

            fifthRef.current = true;
        }
        if (sixthDone && !sixthRef.current) { //player has made first guess
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

            sixthRef.current = true;
        }
        // Repeat this pattern for the remaining guesses (third, fourth, etc.)
    }, [firstDone, secondDone, thirdDone, fourthDone, fifthDone, sixthDone]);

    if (loading) {
        return <div>Loading...</div>; // Show a loading indicator while data is being fetched
    } 
  return (
    <div className='mx-auto w-[500px]'>
        <div className='grid grid-cols-5 w-[340px] mx-auto gap-2 mb-[90px]'>

            { (firstDone && firstRef.current) ? 
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

            { secondDone ? 
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

            { thirdDone ? 
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
            { fourthDone ? 
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
            { fifthDone ? 
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
            { sixthDone ? 
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
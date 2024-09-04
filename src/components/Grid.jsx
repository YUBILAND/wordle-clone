import React, { useEffect, useState } from 'react'
import raw from '../assets/wordle-La.txt'

const Grid = () => {

    const [wordleList, setWordleList] = useState([]);
    const [first, setFirst] = useState('');
    const [firstDone, setFirstDone] = useState(false);
    const [second, setSecond] = useState('');
    const [secondDone, setSecondDone] = useState(false);
    const [third, setThird] = useState('');
    const [thirdDone, setThirdDone] = useState(false);
    const [fourth, setFourth] = useState('');
    const [fourthDone, setFourthDone] = useState(false);
    const [fifth, setFifth] = useState('');
    const [fifthDone, setFifthDone] = useState(false);
    const [sixth, setSixth] = useState('');
    const [sixthDone, setSixthDone] = useState(false);
    const [loading, setLoading] = useState(true);
    const [correctWord, setCorrectWord] = useState('');

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
        // setCorrectWord(wordleList[Math.floor(Math.random() * 2315)].toUpperCase());
        setCorrectWord("ELBOW")
        setLoading(false);
        }

    }, [wordleList])
    // const correctWord = "FRAUD".toUpperCase();
    console.log(correctWord);

    var copyCorrectWord = correctWord
    var copyCorrectWord2 = correctWord
    var copyCorrectWord3 = correctWord
    var copyCorrectWord4 = correctWord
    var copyCorrectWord5 = correctWord
    var copyCorrectWord6 = correctWord

    
    
    const firstGreen = (guessedWord) => {
        const greenIndex = compareString(correctWord, guessedWord);
        var offset = 0;
        for (let i = 0; i < greenIndex.length; i++) {
            copyCorrectWord = copyCorrectWord.slice(0, [parseInt(greenIndex[i]) - offset]) + copyCorrectWord.slice(parseInt(greenIndex[i])+1 - offset);
            offset++;

        }

    }


    const evalGuess = (guessedWord, pos) => {
        console.log("Guessed Word is", guessedWord[pos])
        if (guessedWord[pos] == correctWord[pos]) {
            return 'green';
        } else if (copyCorrectWord.includes(guessedWord[pos])) {
            // console.log(copyCorrectWord)
            copyCorrectWord = copyCorrectWord.replace(guessedWord[pos], '')
            // copyCorrectWord = copyCorrectWord.slice(0, [parseInt(copyCorrectWord.indexOf(guessedWord[pos]))]) + copyCorrectWord.slice(copyCorrectWord.indexOf(guessedWord[pos])+1);
            console.log(copyCorrectWord)
            console.log('Guessed word', guessedWord[pos])
            
            return 'yellow';
        } else {
            
            console.log("HOW", guessedWord[pos])
            return 'gray';
        }
    }

    const secondGreen = (guessedWord) => {
        const greenIndex = compareString(correctWord, guessedWord);
        var offset = 0;
        for (let i = 0; i < greenIndex.length; i++) {
            copyCorrectWord2 = copyCorrectWord2.slice(0, [parseInt(greenIndex[i]) - offset]) + copyCorrectWord2.slice(parseInt(greenIndex[i])+1 - offset);
            offset++;

        }
    }

    const evalGuess2 = (guessedWord, pos) => {
        if (guessedWord[pos] == correctWord[pos]) {
            return 'green';
        } else if (copyCorrectWord2.includes(guessedWord[pos])) {
            return 'yellow';
        } else {
            return 'gray';
        }
    }

    const thirdGreen = (guessedWord) => {
        const greenIndex = compareString(correctWord, guessedWord);
        var offset = 0;
        for (let i = 0; i < greenIndex.length; i++) {
            copyCorrectWord3 = copyCorrectWord3.slice(0, [parseInt(greenIndex[i]) - offset]) + copyCorrectWord3.slice(parseInt(greenIndex[i])+1 - offset);
            offset++;
        }
    }

    const evalGuess3 = (guessedWord, pos) => {
        if (guessedWord[pos] == correctWord[pos]) {
            return 'green';
        } else if (copyCorrectWord3.includes(guessedWord[pos])) {
            return 'yellow';
        } else {
            return 'gray';
        }
    }

    const fourthGreen = (guessedWord) => {
        const greenIndex = compareString(correctWord, guessedWord);
        var offset = 0;
        for (let i = 0; i < greenIndex.length; i++) {
            copyCorrectWord4 = copyCorrectWord4.slice(0, [parseInt(greenIndex[i]) - offset]) + copyCorrectWord4.slice(parseInt(greenIndex[i])+1 - offset);
            offset++;
        }
    }

    const evalGuess4 = (guessedWord, pos) => {
        if (guessedWord[pos] == correctWord[pos]) {
            return 'green';
        } else if (copyCorrectWord4.includes(guessedWord[pos])) {
            return 'yellow';
        } else {
            return 'gray';
        }
    }

    const fifthGreen = (guessedWord) => {
        const greenIndex = compareString(correctWord, guessedWord);
        var offset = 0;
        for (let i = 0; i < greenIndex.length; i++) {
            copyCorrectWord5 = copyCorrectWord5.slice(0, [parseInt(greenIndex[i]) - offset]) + copyCorrectWord5.slice(parseInt(greenIndex[i])+1 - offset);
            offset++;
        }
    }

    const evalGuess5 = (guessedWord, pos) => {
        if (guessedWord[pos] == correctWord[pos]) {
            return 'green';
        } else if (copyCorrectWord5.includes(guessedWord[pos])) {
            return 'yellow';
        } else {
            return 'gray';
        }
    }

    const sixthGreen = (guessedWord) => {
        const greenIndex = compareString(correctWord, guessedWord);
        var offset = 0;
        for (let i = 0; i < greenIndex.length; i++) {
            copyCorrectWord6 = copyCorrectWord6.slice(0, [parseInt(greenIndex[i]) - offset]) + copyCorrectWord6.slice(parseInt(greenIndex[i])+1 - offset);
            offset++;
        }
    }

    const evalGuess6 = (guessedWord, pos) => {
        if (guessedWord[pos] == correctWord[pos]) {
            return 'green';
        } else if (copyCorrectWord6.includes(guessedWord[pos])) {
            return 'yellow';
        } else {
            return 'gray';
        }
    }

    const compareString = (str1, str2) => {
        var indexMatch = '';
        for (let i = 0; i < str1.length; i++) {
            if (str1[i] == str2[i]) {
                indexMatch += i;
            }
        } return indexMatch;
    }

    
        
    useEffect(() => {
        const onPress = (event) => {
          if (event.key === 'Backspace') {
            if (!firstDone) {
              setFirst((prevStr) => prevStr.slice(0, prevStr.length - 1));
            } else if (firstDone && !secondDone) {
              setSecond((prevStr) => prevStr.slice(0, prevStr.length - 1));
            } else if (firstDone && secondDone && !thirdDone) {
                setThird((prevStr) => prevStr.slice(0, prevStr.length - 1));
            } else if (firstDone && secondDone && thirdDone && !fourthDone) {
                setFourth((prevStr) => prevStr.slice(0, prevStr.length - 1));
            } else if (firstDone && secondDone && thirdDone && fourthDone && !fifthDone) {
                setFifth((prevStr) => prevStr.slice(0, prevStr.length - 1));
            } else if (firstDone && secondDone && thirdDone && fourthDone && fifthDone && !sixthDone) {
                setSixth((prevStr) => prevStr.slice(0, prevStr.length - 1));
            }
          } else if (event.key.match(/[a-zA-Z]/) && event.key.length === 1) {
            if (!firstDone) {
              setFirst((prevStr) => prevStr + event.key.toUpperCase());
            } else if (firstDone && !secondDone) {
              setSecond((prevStr) => prevStr + event.key.toUpperCase());
            } else if (firstDone && secondDone && !thirdDone) {
                setThird((prevStr) => prevStr + event.key.toUpperCase());
            } else if (firstDone && secondDone && thirdDone && !fourthDone) {
                setFourth((prevStr) => prevStr + event.key.toUpperCase());
            } else if (firstDone && secondDone && thirdDone && fourthDone && !fifthDone) {
                setFifth((prevStr) => prevStr + event.key.toUpperCase());
            } else if (firstDone && secondDone && thirdDone && fourthDone && fifthDone && !sixthDone) {
                setSixth((prevStr) => prevStr + event.key.toUpperCase());
            }
          }
        };
    
        // Attach event listener
        document.addEventListener('keydown', onPress);
    
        // Cleanup function to remove event listener
        return () => {
          document.removeEventListener('keydown', onPress);
        };
      }, [firstDone, secondDone, thirdDone, fourthDone, fifthDone]); // Depend only on the completion status

    useEffect(() => {
        if (first.length == 5) {
            setFirstDone(true);
        }
    }, [first])

    useEffect(() => {
        if (second.length == 5) {
            setSecondDone(true);
        }
    }, [second])

    useEffect(() => {
        if (third.length == 5) {
            setThirdDone(true);
        }
    }, [third])

    useEffect(() => {
        if (fourth.length == 5) {
            setFourthDone(true);
        }
    }, [fourth])

    useEffect(() => {
        if (fifth.length == 5) {
            setFifthDone(true);
        }
    }, [fifth])

    useEffect(() => {
        if (sixth.length == 5) {
            setSixthDone(true);
        }
    }, [sixth])


    
    // const isWord = () => {
    //     var fs = require("fs")

    //     fs.readFile('../assets/wordle-La.txt', function (err, data) {
    //     if (err) throw err;
    //     if(data.indexOf('first') >= 0){
    //     console.log(data)
    //     }
    //     });
    // }
    if (loading) {
        return <div>Loading...</div>; // Show a loading indicator while data is being fetched
    } 

  return (
    <div className='mx-auto w-[500px]'>
        <div className='grid grid-cols-5 w-[340px] mx-auto gap-2'>

            { firstDone ? 
            <>
                {firstGreen(first)}
                <div className= { `border-2  ${evalGuess(first, 0) == 'green' ? 'bg-green-200' :  evalGuess(first, 0) == 'yellow' ? 'bg-yellow-200' : 'bg-gray-400'} flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold` }>
                    {first[0] || ''}
                </div>
                <div className= { `border-2  ${evalGuess(first, 1) == 'green' ? 'bg-green-200' :  evalGuess(first, 1) == 'yellow' ? 'bg-yellow-200' : 'bg-gray-400'} flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold` }>
                    {first[1] || ''}
                </div>
                <div className= { `border-2  ${evalGuess(first, 2) == 'green' ? 'bg-green-200' :  evalGuess(first, 2) == 'yellow' ? 'bg-yellow-200' : 'bg-gray-400'} flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold` }>
                    {first[2] || ''}
                </div>   
                <div className= { `border-2  ${evalGuess(first, 3) == 'green' ? 'bg-green-200' :  evalGuess(first, 3) == 'yellow' ? 'bg-yellow-200' : 'bg-gray-400'} flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold` }>
                    {first[3] || ''}
                </div>
                <div className= { `border-2  ${evalGuess(first, 4) == 'green' ? 'bg-green-200' :  evalGuess(first, 4) == 'yellow' ? 'bg-yellow-200' : 'bg-gray-400'} flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold` }>
                    {first[4] || ''}
                </div>   
            </>
            :   
            <>
                <div className='border-2 border-gray-500 flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold'>
                    {first[0] || ''}
                </div>
                <div className='border-2 border-gray-500 flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold'>
                    {first[1] || ''}
                </div>
                <div className='border-2 border-gray-500 flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold'>
                    {first[2] || ''}
                </div>
                <div className='border-2 border-gray-500 flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold'>
                    {first[3] || ''}
                </div>
                <div className='border-2 border-gray-500 flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold'>
                    {first[4] || ''}
                </div>
                
            </>
            }

            
            { firstDone && secondDone ?  
            <>
                {secondGreen(second)}
                <div className= { `border-2  ${evalGuess2(second, 0) == 'green' ? 'bg-green-200' :  evalGuess2(second, 0) == 'yellow' ? 'bg-yellow-200' : 'bg-gray-400'} + ' flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold` }>
                    {second[0] || ''}
                </div>
                <div className= { `border-2  ${evalGuess2(second, 1) == 'green' ? 'bg-green-200' :  evalGuess2(second, 1) == 'yellow' ? 'bg-yellow-200' : 'bg-gray-400'} + ' flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold` }>
                    {second[1] || ''}
                </div>
                <div className= { `border-2  ${evalGuess2(second, 2) == 'green' ? 'bg-green-200' :  evalGuess2(second, 2) == 'yellow' ? 'bg-yellow-200' : 'bg-gray-400'} + ' flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold` }>
                    {second[2] || ''}
                </div>  
                <div className= { `border-2  ${evalGuess2(second, 3) == 'green' ? 'bg-green-200' :  evalGuess2(second, 3) == 'yellow' ? 'bg-yellow-200' : 'bg-gray-400'} + ' flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold` }>
                    {second[3] || ''}
                </div>
                <div className= { `border-2  ${evalGuess2(second, 4) == 'green' ? 'bg-green-200' :  evalGuess2(second, 4) == 'yellow' ? 'bg-yellow-200' : 'bg-gray-400'} + ' flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold` }>
                    {second[4] || ''}
                </div>   
            </>
            :   
            <>
                <div className='border-2 border-gray-500 flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold'>
                    {second[0] || ''}
                </div>
                <div className='border-2 border-gray-500 flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold'>
                    {second[1] || ''}
                    
                </div>
                <div className='border-2 border-gray-500 flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold'>
                    {second[2] || ''}
                </div>
                <div className='border-2 border-gray-500 flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold'>
                    {second[3] || ''}
                    
                </div>
                <div className='border-2 border-gray-500 flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold'>
                    {second[4] || ''}
                </div>
            </>
            }

            

            { firstDone && secondDone && thirdDone ?  
            <>
                {thirdGreen(third)}
                <div className= { `border-2  ${evalGuess3(third, 0) == 'green' ? 'bg-green-200' :  evalGuess3(third, 0) == 'yellow' ? 'bg-yellow-200' : 'bg-gray-400'} + ' flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold` }>
                    {third[0] || ''}
                </div>
                <div className= { `border-2  ${evalGuess3(third, 1) == 'green' ? 'bg-green-200' :  evalGuess3(third, 1) == 'yellow' ? 'bg-yellow-200' : 'bg-gray-400'} + ' flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold` }>
                    {third[1] || ''}
                </div>
                <div className= { `border-2  ${evalGuess3(third, 2) == 'green' ? 'bg-green-200' :  evalGuess3(third, 2) == 'yellow' ? 'bg-yellow-200' : 'bg-gray-400'} + ' flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold` }>
                    {third[2] || ''}
                </div>   
                <div className= { `border-2  ${evalGuess3(third, 3) == 'green' ? 'bg-green-200' :  evalGuess3(third, 3) == 'yellow' ? 'bg-yellow-200' : 'bg-gray-400'} + ' flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold` }>
                    {third[3] || ''}
                </div>
                <div className= { `border-2  ${evalGuess3(third, 4) == 'green' ? 'bg-green-200' :  evalGuess3(third, 4) == 'yellow' ? 'bg-yellow-200' : 'bg-gray-400'} + ' flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold` }>
                    {third[4] || ''}
                </div>  
            </>
            :   
            <>
                <div className='border-2 border-gray-500 flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold'>
                    {third[0] || ''}
                </div>
                <div className='border-2 border-gray-500 flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold'>
                    {third[1] || ''}
                    
                </div>
                <div className='border-2 border-gray-500 flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold'>
                    {third[2] || ''}
                </div>
                <div className='border-2 border-gray-500 flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold'>
                    {third[3] || ''}
                    
                </div>
                <div className='border-2 border-gray-500 flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold'>
                    {third[4] || ''}
                </div>
            </>
            }

            { firstDone && secondDone && thirdDone && fourthDone ?  
            <>
                {fourthGreen(fourth)}
                <div className= { `border-2  ${evalGuess4(fourth, 0) == 'green' ? 'bg-green-200' :  evalGuess4(fourth, 0) == 'yellow' ? 'bg-yellow-200' : 'bg-gray-400'} + ' flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold` }>
                    {fourth[0] || ''}
                </div>
                <div className= { `border-2  ${evalGuess4(fourth, 1) == 'green' ? 'bg-green-200' :  evalGuess4(fourth, 1) == 'yellow' ? 'bg-yellow-200' : 'bg-gray-400'} + ' flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold` }>
                    {fourth[1] || ''}
                </div>
                <div className= { `border-2  ${evalGuess4(fourth, 2) == 'green' ? 'bg-green-200' :  evalGuess4(fourth, 2) == 'yellow' ? 'bg-yellow-200' : 'bg-gray-400'} + ' flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold` }>
                    {fourth[2] || ''}
                </div>   
                <div className= { `border-2  ${evalGuess4(fourth, 3) == 'green' ? 'bg-green-200' :  evalGuess4(fourth, 3) == 'yellow' ? 'bg-yellow-200' : 'bg-gray-400'} + ' flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold` }>
                    {fourth[3] || ''}
                </div>
                <div className= { `border-2  ${evalGuess4(fourth, 4) == 'green' ? 'bg-green-200' :  evalGuess4(fourth, 4) == 'yellow' ? 'bg-yellow-200' : 'bg-gray-400'} + ' flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold` }>
                    {fourth[4] || ''}
                </div>  
            </>
            :   
            <>
                <div className='border-2 border-gray-500 flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold'>
                    {fourth[0] || ''}
                </div>
                <div className='border-2 border-gray-500 flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold'>
                    {fourth[1] || ''}
                    
                </div>
                <div className='border-2 border-gray-500 flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold'>
                    {fourth[2] || ''}
                </div>
                <div className='border-2 border-gray-500 flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold'>
                    {fourth[3] || ''}
                    
                </div>
                <div className='border-2 border-gray-500 flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold'>
                    {fourth[4] || ''}
                </div>
            </>
            }
            
            { firstDone && secondDone && thirdDone && fourthDone && fifthDone?  
            <>
                {fifthGreen(fifth)}
                <div className= { `border-2  ${evalGuess5(fifth, 0) == 'green' ? 'bg-green-200' :  evalGuess5(fifth, 0) == 'yellow' ? 'bg-yellow-200' : 'bg-gray-400'} + ' flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold` }>
                    {fifth[0] || ''}
                </div>
                <div className= { `border-2  ${evalGuess5(fifth, 1) == 'green' ? 'bg-green-200' :  evalGuess5(fifth, 1) == 'yellow' ? 'bg-yellow-200' : 'bg-gray-400'} + ' flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold` }>
                    {fifth[1] || ''}
                </div>
                <div className= { `border-2  ${evalGuess5(fifth, 2) == 'green' ? 'bg-green-200' :  evalGuess5(fifth, 2) == 'yellow' ? 'bg-yellow-200' : 'bg-gray-400'} + ' flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold` }>
                    {fifth[2] || ''}
                </div>   
                <div className= { `border-2  ${evalGuess5(fifth, 3) == 'green' ? 'bg-green-200' :  evalGuess5(fifth, 3) == 'yellow' ? 'bg-yellow-200' : 'bg-gray-400'} + ' flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold` }>
                    {fifth[3] || ''}
                </div>
                <div className= { `border-2  ${evalGuess5(fifth, 4) == 'green' ? 'bg-green-200' :  evalGuess5(fifth, 4) == 'yellow' ? 'bg-yellow-200' : 'bg-gray-400'} + ' flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold` }>
                    {fifth[4] || ''}
                </div>  
            </>
            :   
            <>
                <div className='border-2 border-gray-500 flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold'>
                    {fifth[0] || ''}
                </div>
                <div className='border-2 border-gray-500 flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold'>
                    {fifth[1] || ''}
                    
                </div>
                <div className='border-2 border-gray-500 flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold'>
                    {fifth[2] || ''}
                </div>
                <div className='border-2 border-gray-500 flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold'>
                    {fifth[3] || ''}
                    
                </div>
                <div className='border-2 border-gray-500 flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold'>
                    {fifth[4] || ''}
                </div>
            </>
            }

            { firstDone && secondDone && thirdDone && fourthDone && fifthDone && sixthDone ?  
            <>
                {sixthGreen(sixth)}
                <div className= { `border-2  ${evalGuess6(sixth, 0) == 'green' ? 'bg-green-200' :  evalGuess6(sixth, 0) == 'yellow' ? 'bg-yellow-200' : 'bg-gray-400'} + ' flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold` }>
                    {sixth[0] || ''}
                </div>
                <div className= { `border-2  ${evalGuess6(sixth, 1) == 'green' ? 'bg-green-200' :  evalGuess6(sixth, 1) == 'yellow' ? 'bg-yellow-200' : 'bg-gray-400'} + ' flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold` }>
                    {sixth[1] || ''}
                </div>
                <div className= { `border-2  ${evalGuess6(sixth, 2) == 'green' ? 'bg-green-200' :  evalGuess6(sixth, 2) == 'yellow' ? 'bg-yellow-200' : 'bg-gray-400'} + ' flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold` }>
                    {sixth[2] || ''}
                </div>   
                <div className= { `border-2  ${evalGuess6(sixth, 3) == 'green' ? 'bg-green-200' :  evalGuess6(sixth, 3) == 'yellow' ? 'bg-yellow-200' : 'bg-gray-400'} + ' flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold` }>
                    {sixth[3] || ''}
                </div>
                <div className= { `border-2  ${evalGuess6(sixth, 4) == 'green' ? 'bg-green-200' :  evalGuess6(sixth, 4) == 'yellow' ? 'bg-yellow-200' : 'bg-gray-400'} + ' flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold` }>
                    {sixth[4] || ''}
                </div>  
            </>
            :   
            <>
                <div className='border-2 border-gray-500 flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold'>
                    {sixth[0] || ''}
                </div>
                <div className='border-2 border-gray-500 flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold'>
                    {sixth[1] || ''}
                    
                </div>
                <div className='border-2 border-gray-500 flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold'>
                    {sixth[2] || ''}
                </div>
                <div className='border-2 border-gray-500 flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold'>
                    {sixth[3] || ''}
                    
                </div>
                <div className='border-2 border-gray-500 flex items-center justify-center w-[64px] h-[64px] uppercase text-4xl font-bold'>
                    {sixth[4] || ''}
                </div>
            </>
            }
        </div>
        
    </div>
  )
}

export default Grid
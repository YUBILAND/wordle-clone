import React, { useState } from 'react'
import Keyboard from 'react-simple-keyboard';
import "react-simple-keyboard/build/css/index.css";
import './Keys.css'
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';
import inputMask from "simple-keyboard-input-mask";
import { renderToString } from 'react-dom/server';

const Keys = ( {colorIn} ) => {

  const [word, setWord] = useState('');
  console.log(word)

  const change = (event) => {
    if (event.target.value.length <= 3 && word.length < 3) {
      setWord(event.target.value);
    }
  }

  const kbChange = (input) => {

  }
//   const backspaceIconString = renderToString(<BackspaceOutlinedIcon />);

  return (
    <div className='mx-auto w-[500px] mb-2'>
      <input 
      type="text"
      value={word}
      onChange={change}
      
      />
      
      <Keyboard 
      onChange={kbChange}
        // input => 
        
        // setWord( input.length > word.length ? input : word)}
      modules = {[inputMask]}
      inputMask ={{
        default: {
          mask: '123',
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
      buttonTheme={[
        {
          class: "buttons",
          buttons: 'q w e r t y u i o p a s d f g h j k l ENTER z x c v b n m DEL'
        }
      ]}
      theme="hg-theme-default board"
      
      />
    </div>
  )
}

export default Keys
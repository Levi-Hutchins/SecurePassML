import React from 'react';
import securepass from './securepass.png';
import InputBox from './components/InputBox'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={securepass} className="App-logo" alt="logo" />
        <p className='info'>
        
        </p>      
        <InputBox/>
      </header>
      <div className="AppCore">

      </div>
    </div>
  );
}

export default App;

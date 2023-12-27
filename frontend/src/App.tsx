import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home'
import PasswordResultPage from './Pages/PasswordResults';
import './Styles/App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/">
          
          <Route index element={<Home />} />
          <Route path="/results" element={<PasswordResultPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
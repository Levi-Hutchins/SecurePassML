import React from "react";
import securepass from "../securepass.png";
import InputBox from "../Components/InputBox";
import "../Styles/App.css";
const Home = () => {
  return (
    <div className="Home">
      <header className="App-header">
        <img src={securepass} className="App-logo" alt="logo" />
        <p className="info"></p>
        <InputBox />
      </header>
      <div className="AppCore"></div>
    </div>
  );
};

export default Home;

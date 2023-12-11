import React from "react";
import securepass from "../securepass.png";
import InputBox from "../components/InputBox";
import "../Styles/App.css";
const Home = () => {
  return (
    <div className="Home">
      <header className="App-header">
        <img src={securepass} className="App-logo" alt="logo" />
        <div className="frontpage-info">
          Welcome to SecurePassML ! Created by Levi Hutchins this machine
          learning based web application is intended to give insight into the
          safety of your passwords. Simply enter your password and view the
          metrics and information that is generated.
          This is an open-source project so please feel free to contribute{" "}
          <a href="https://github.com/Levi-Hutchins/SecurePassML" target="_blank" rel="noopener noreferrer">here</a>.
        </div>

        <InputBox />
      </header>
      <div className="AppCore"></div>
    </div>
  );
};

export default Home;

import React from "react";
import styled from "styled-components";
import Add from './Add';
import WordList from './WordList';
import Edit from "./Edit";
import "../App.css"

import {Route, Routes} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { loadWordFB } from "../redux/modules/words";
import { useDispatch } from "react-redux";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  React.useEffect( () => {
    dispatch(loadWordFB());
  }, []);
  function addWord () {
    navigate("/add")
  }
  function goHome () {
    navigate("/")
  }
  const hover = (e) => {
    e.target.style.cursor = "pointer";
    }
  return (
    <div className="App">
      <Title onMouseOver={hover} onClick={goHome}>나만의 단어장</Title>
          <Addword onClick={addWord}>추가</Addword>
          <Routes>
            <Route path="/" element={<WordList />} />
            <Route path="add/" element={<Add />} />
            <Route path="/edit/:index" element={<Edit />} />
          </Routes>
    </div>
  );
}



const Addword = styled.button `
width: 50px;
height: 50px;
border-radius: 25px;
position: fixed;
bottom: 0;
right: 0;
margin: 20px;
background-color:
`;

const Title = styled.h1 `
font-size: 40px;
margin: 0px;
background-color: #341A04;
color: #B0DDC2;
text-align: center;
`;


export default App;

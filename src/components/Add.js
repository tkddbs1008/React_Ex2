import React from "react";
import styled from "styled-components"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addWordFB } from "../redux/modules/words";

const Add = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const word = React.useRef(null);
    const def = React.useRef(null);
    const ex = React.useRef(null);
    function goBack() {
        dispatch(addWordFB({word: word.current.value, def: def.current.value, ex: ex.current.value, completed: false}))
        navigate("/")
    }

    return (
        <Container>
            <Title>단어 추가하기</Title>
            <div>
                <P>단어</P>
                <InputBox type="text" ref={word}></InputBox>
            </div>
            <div>
                <P>설명</P>
                <InputBox type="text" ref={def}></InputBox>
            </div>
            <div>
                <P>예시</P>
                <InputBox type="text" ref={ex}></InputBox>
            </div>
            <AddW onClick={goBack}>추가하기</AddW>
        </Container>
    );
}

const Title = styled.h1 `
font-size: 40px;
font-family: 'Gamja Flower', cursive;
margin: 0px;
text-align: center;
`;

const Container = styled.div `
height: 400px;
width: 400px;
margin: auto;
margin-top: 20px;
border: 1px solid #F7F7F8;
background-color: #F8C296;
text-align: center;
`;

const P = styled.p `
text-align: left;
margin-left: 20px;
margin-bottom: 0px;
`;

const InputBox = styled.input `
width: 90%;
height: 30px;
`;

const AddW = styled.button `
margin-top: 50px;
width: 90%;
height: 40px;
`;


export default Add;
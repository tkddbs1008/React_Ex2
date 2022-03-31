import React from "react";
import styled from "styled-components"
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate, useParams} from 'react-router-dom'
import { editWordFB } from "../redux/modules/words";


const Edit = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const params = useParams();
    const word_index = params.index;
    const word_list = useSelector((state) => state.word.list);
    const word = React.useRef(null);
    const def = React.useRef(null);
    const ex = React.useRef(null);
    async function edit () {
        dispatch(editWordFB({word: word.current.value, def: def.current.value, ex: ex.current.value, id: word_list[word_index].id}))
        navigate('/');
    }

    return (
        <Container>
        <h1>단어 수정하기</h1>
        <p>단어</p>
        <input type="text" placeholder={word_list[word_index].word} ref={word}></input>
        <p>뜻</p>
        <input type="text" placeholder={word_list[word_index].def} ref={def}></input>
        <p>예문</p>
        <input type="text" placeholder={word_list[word_index].ex} ref={ex}></input>
        <AddW onClick={edit}>수정하기</AddW>
        </Container>
    );
}

const Container = styled.div`
height: 400px;
width: 400px;
margin: auto;
margin-top: 20px;
border: 1px solid #F7F7F8;
background-color: #F8C296;
text-align: center;
`;

const AddW = styled.button `
margin-top: 50px;
width: 90%;
height: 40px;
`;

export default Edit;
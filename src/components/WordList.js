import React from "react";
import styled from "styled-components"
// import { TiTick, TiEdit, TiTimes } from "react-icons/ti";

import {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux"
import { deleteWordFB,  completeWordFB } from "../redux/modules/words";

const WordList = () => {
    const word_lists = useSelector((state) => state.word.list)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const reload = () => {
        window.location.reload();
    }
    return (
        <ListStyle>
            {
                word_lists.map((list, word_index) => {
                    return (
                        <ItemStyle
                            key={word_index}
                            style={{backgroundColor:
                                        list.completed
                                            ? "#35A0B1"
                                            : "#F8C296"
                                    }}
                        >
                            <Word>
                                {list.word}
                                <Edit style={{background: "red"}} onClick={()=> {dispatch(deleteWordFB(word_lists[word_index].id)); reload();}}/>
                                <Edit style={{background: "yellow"}} onClick={()=> navigate("/edit/" + word_index)}/>
                                <Edit style={{background: "green"}} onClick={()=> {dispatch(completeWordFB(word_lists[word_index]))}}/>
                            </Word>
                            <Def>
                                {list.def}
                            </Def>
                            <Ex>
                                "{list.ex}"
                            </Ex>
                        </ItemStyle>
                    );
                })
            }
        </ListStyle>
    );
};

// const Icons = css`
//   color: ${(props) =>
//     props.completed === "false"
//       ? props.theme.colors.mainColor
//       : props.theme.colors.white};
//   font-size: ${({ theme }) => theme.fontSizes.xl};
// `;

const ListStyle = styled.div `
display: flex;
width: 56%;
margin: auto;
margin-top: 10px;
height: 100%;
overflow-x: hidden;
overflow-y: auto;
flex-wrap: wrap;
`;

const Edit = styled.button`
float: right;
margin-top: 10px;
width: 20px;
height: 20px;
`;

// const Edit = styled(TiEdit)`
// ${Icons};
// float: right;
// margin-top: 10px;
// width: 20px;
// height: 20px;
// `;

// const Delete = styled(TiTimes)`
// ${Icons};
// float: right;
// margin-top: 10px;
// width: 20px;
// height: 20px;
// `;

// const Check = styled(TiTick)`
// color: ${({ theme }) => theme.colors.white};
// font-size: ${({ theme }) => theme.fontSizes.xl};
// float: right;
// margin-top: 10px;
// width: 20px;
// height: 20px;
// `;

const ItemStyle = styled.div `
flex-direction: column;
justify-content: flex-start;
min-width: 300px;
gap: 10px;
margin: 10px;
padding: 10px;
border: 2px solid #F7F7F8;
border-radius: 10px;
flex-wrap: wrap;
`;

const Word = styled.h1 `
margin: 0px;
color: #341A04;
`;

const Def = styled.p `
color: #341A04;
font-size: 20px;
`;

const Ex = styled.p `
color: #31724B;
font-size: 20px;
margin-bottom: 0px;
`;

export default WordList;
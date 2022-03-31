import { db } from "../../firebase";
import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";


const CREATE = "word/CREATE";
const EDIT = "word/EDIT";
const DELETE = "word/DELETE";
const COMPLETE = "word/COMPLETE";
const LOAD = "word/LOAD"

const initialState = {
    list: []
};

export function loadWord(word_list){
    return {type: LOAD, word_list};
}

export function addWord(word) {
    return {type: CREATE, word};
}

export function editWord(word) {
    return {type: EDIT, word};
}

export function completeWord(word) {
    return {type: COMPLETE, word};
}

export function deleteWord(word_index) {
    return {type: DELETE, word_index};
}

//middlewares
export const loadWordFB = () => {
    return async function (dispatch) {
        const word_data = await getDocs(collection(db, "word"));

        let word_list = [];

        word_data.forEach((word) => {
            word_list.push({id:word.id ,...word.data()});
        });


        dispatch(loadWord(word_list));
    }
}

export const addWordFB = (word) => {
    return async function (dispatch) {
        const docRef = await addDoc(collection(db, "word"), word);
        const _word = await getDoc(docRef);
        const word_data = {id: _word.id, ..._word.data()};

        console.log(word_data);

        dispatch(addWord(word_data));
    }
}

export const editWordFB = (word) => {
    return async function (dispatch, getState) {
        // console.log(word)
        const docRef = doc(db, "word", word.id);
        await updateDoc(docRef, {...word});

        const word_list = getState().word.list;
        const idx = word_list.findIndex((w) => {
            return w.id === word.id
        })
        const new_word = {...word, idx}
        dispatch(editWord(new_word))
    }
}

export const completeWordFB = (word) => {
    return async function (dispatch, getState) {
        const docRef = doc(db, "word", word.id);
        word.completed === true ?
             updateDoc(docRef, {completed: false}) :
             updateDoc(docRef, {completed: true})
        const word_list = getState().word.list;
        const idx = word_list.findIndex((w) => {
            return w.id === word.id
        })
        const new_word = {...word, idx}
        dispatch(completeWord(new_word))
    }
}

export const deleteWordFB = (word_id) => {
    return async function (dispatch, getState) {
        const docRef = doc(db, "word", word_id);
        await deleteDoc(docRef);

        const _word_list = getState().word.list;
        const word_index = _word_list.findIndex((w) => {
            return w.id === word_id;
        });
        dispatch(deleteWord(word_index));
    }
}

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case "word/LOAD" : {
            return {list: action.word_list}
        }
        case "word/CREATE":
            {
                const new_word_list = [
                    ...state.list,
                    action.word
                ];
                return {list: new_word_list};
            }

        case "word/COMPLETE":
            {
                const new_word_list = [...state.list];
                new_word_list[action.word.idx].completed === true ?
                    new_word_list[action.word.idx].completed = false :
                    new_word_list[action.word.idx].completed = true
                return {list: new_word_list}
            }
        case "word/EDIT":
            {
                const new_word_list = [ ...state.list];
                new_word_list[action.word.idx] = action.word
                return {list: new_word_list};
            }
        case "word/DELETE":
            {
                const new_word_list = state
                    .list
                    .filter((l, idx) => {
                        return parseInt(action.word_index) !== idx;
                    });

                return {list: new_word_list};
            }
        default:
            return state;
    }
}
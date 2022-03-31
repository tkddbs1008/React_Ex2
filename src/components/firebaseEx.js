import { addDoc, collection, deleteDoc, updateDoc } from "firebase/firestore";
import React from "react";


React.useEffect(async() => {

    const query = await getDocs(collection(db, "word"));
    query.forEach((doc) => {
        console.log(doc.id, doc.data());
    });
});

    addDoc(collection(db, "word"), {word: " ", def: " ", ex: " ", completed: false })


    const docRef = doc(db, "word", "id");
    updateDoc(docRef, {word:" ", def: " ", ex: " ", completed: true})

    
    const docRef = doc(db, "word", "id");
    deleteDoc(docRef)
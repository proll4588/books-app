import React from "react";
import { IBook } from "../../interfaces/book.interfase";
import {
    collection,
    onSnapshot,
    addDoc,
    doc,
    deleteDoc,
} from "firebase/firestore";
import db from "../../firebase";

interface IBookComp {
    className: string;
    book: IBook;
}

export const Book = ({ className, book }) => {
    const deleteBook = () => {
        const bookDoc = doc(db, "books", book.id);
        deleteDoc(bookDoc);
    };

    return (
        <div className={`Book ${className}`}>
            {book.title} <button onClick={deleteBook}>Delete</button>
        </div>
    );
};

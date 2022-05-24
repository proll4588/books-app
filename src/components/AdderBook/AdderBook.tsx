import { useState } from "react";
import { collection, onSnapshot, addDoc } from "firebase/firestore";
import db from "../../firebase";

export const AdderBook = ({ className }) => {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [rate, setRate] = useState("");
    const [author, setAuthor] = useState("");
    const [ISBN, setISBN] = useState("");

    const createBook = () => {
        if (title.length && author.length) {
            let newBook = { title, author };

            if (date.length) {
                //@ts-ignore
                newBook = { ...newBook, date: Number(date) };
            }

            if (rate.length) {
                //@ts-ignore
                newBook = { ...newBook, rate: Number(rate) };
            }

            if (ISBN.length) {
                //@ts-ignore
                newBook = { ...newBook, ISBN };
            }

            console.log(newBook);

            //@ts-ignore
            addDoc(collection(db, "books"), newBook);
        } else {
            alert("Заполните важные поля");
        }
    };

    return (
        <div className={`AdderBook ${className}`}>
            <div className="AdderBook__container">
                <input
                    className="AdderBook__title-input"
                    type="text"
                    placeholder="title"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                />
                <input
                    className="AdderBook__date-input"
                    type="text"
                    placeholder="date"
                    value={date}
                    onChange={(e) => {
                        setDate(e.target.value);
                    }}
                />
                <input
                    className="AdderBook__rate-input"
                    type="text"
                    placeholder="rate"
                    value={rate}
                    onChange={(e) => {
                        setRate(e.target.value);
                    }}
                />
                <input
                    className="AdderBook__author-input"
                    type="text"
                    placeholder="author"
                    value={author}
                    onChange={(e) => {
                        setAuthor(e.target.value);
                    }}
                />
                <input
                    className="AdderBook__ISBN-input"
                    type="text"
                    placeholder="ISBN"
                    value={ISBN}
                    onChange={(e) => {
                        setISBN(e.target.value);
                    }}
                />
                <button className="AdderBook__btn" onClick={createBook}>
                    Add
                </button>
            </div>
        </div>
    );
};

import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { AdderBook } from "./components/AdderBook/AdderBook";
import { Book } from "./components/Book/Book";
import { BooksList } from "./components/BooksList/BooksList";
import db from "./firebase";
import { IBook } from "./interfaces/book.interfase";

export const App = () => {
    const [books, setBooks] = useState<IBook[]>([]);
    const [sortedBooks, setSortedBooks] = useState([]);
    const [goodBook, setGoodBook] = useState(null);

    // Получение книг с сервера
    useEffect(() => {
        onSnapshot(collection(db, "books"), (data) => {
            const res = data.docs.map((el) => ({ ...el.data(), id: el.id }));

            //@ts-ignore
            setBooks(res);

            console.log(res);
        });
    }, []);

    // Сортировка по дате
    useEffect(() => {
        const comparByDate = (a: IBook, b: IBook) => {
            if (a.date > b.date) {
                return -1;
            }

            if (a.date < b.date) {
                return 1;
            }

            return 0;
        };

        const comparByName = (a: IBook, b: IBook) => {
            if (a.title.split("")[0] < b.title.split("")[0]) {
                return -1;
            }

            if (a.title.split("")[0] > b.title.split("")[0]) {
                return 1;
            }

            return 0;
        };

        let newBooks = books;
        newBooks.sort(comparByDate);

        let sorted = [{ date: 0, books: [] }];
        newBooks.forEach((book) => {
            if (book.date) {
                let isHave = false;
                sorted.map((el) => {
                    if (el.date === book.date) {
                        isHave = true;
                        el.books.push(book);
                    }
                });

                if (!isHave) {
                    sorted.push({ date: book.date, books: [book] });
                }
            } else {
                sorted[0].books.push(book);
            }
        });

        sorted.forEach((el) => {
            el.books.sort(comparByName);
        });

        setSortedBooks([
            ...sorted.filter((_, index) => index !== 0),
            sorted[0],
        ]);
    }, [books]);

    // НАхождение крутой книги
    useEffect(() => {
        const year = new Date().getFullYear();
        let goodBooks = books.filter((book) => year - book.date > 3);

        const compare = (a: IBook, b: IBook) => {
            if (a.rate > b.rate) {
                return -1;
            }

            if (a.rate < b.rate) {
                return 1;
            }

            return 0;
        };

        goodBooks = goodBooks.sort(compare);
        goodBooks = goodBooks.filter((book) => book.rate === goodBooks[0].rate);

        const randNum = Math.ceil(Math.random() * goodBooks.length);

        setGoodBook(goodBooks[randNum - 1]);
    }, [books]);

    return (
        <div className="App">
            <div className="GoodBook__container">
                <h3>Rec</h3>
                {goodBook ? <Book className="GoodBook" book={goodBook} /> : ""}
            </div>
            {!!books.length && <BooksList className="123" data={sortedBooks} />}
            <AdderBook className={`adder`} />
        </div>
    );
};

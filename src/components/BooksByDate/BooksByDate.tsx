import { Book } from "../Book/Book";

export const BooksByDate = ({ className, data }) => {
    return (
        <div className={`BooksByDate ${className}`}>
            <div className="BooksByDate__container">
                <h3 className="BooksByDate__date">
                    {data.date === 0 ? "other" : data.date}
                </h3>
                <div className="BooksByDate__books">
                    {data.books.map((book) => (
                        <Book key={book.id} className="book" book={book} />
                    ))}
                </div>
            </div>
        </div>
    );
};

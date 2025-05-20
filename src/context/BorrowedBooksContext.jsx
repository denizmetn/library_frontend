import React, { createContext, useState } from "react";
import dayjs from "dayjs";

export const BorrowedBooksContext = createContext();

export const BorrowedBooksProvider = ({ children }) => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [borrowHistory, setBorrowHistory] = useState([]);
  const [favoriteBooks, setFavoriteBooks] = useState([]);

  const addBorrowedBook = (book) => {
    setBorrowedBooks((prev) => [...prev, book]);
  };

  const removeBorrowedBook = (key) => {
    setBorrowedBooks((prev) => prev.filter((book) => book.key !== key));
  };

  const addToBorrowHistory = (book) => {
    setBorrowHistory((prevHistory) => [...prevHistory, book]);
  };

  const addFavoriteBook = (book) => {
    setFavoriteBooks((prev) => [...prev, book]);
  };

  const removeFavoriteBook = (key) => {
    setFavoriteBooks((prev) => prev.filter((book) => book.key !== key));
  };

  const calculateOverdueFines = () => {
    const today = dayjs();
    return borrowedBooks
      .filter((book) => dayjs(book.bitisTarihi).isBefore(today))
      .map((book) => {
        const overdueDays = today.diff(dayjs(book.bitisTarihi), "day");
        return {
          ...book,
          gecikenGun: overdueDays,
          borc: overdueDays * 10, // 10 TL per day
        };
      });
  };

  return (
    <BorrowedBooksContext.Provider
      value={{
        borrowedBooks,
        addBorrowedBook,
        removeBorrowedBook,
        borrowHistory,
        addToBorrowHistory,
        favoriteBooks,
        addFavoriteBook,
        removeFavoriteBook,
        calculateOverdueFines,
      }}
    >
      {children}
    </BorrowedBooksContext.Provider>
  );
};

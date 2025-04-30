import React, { createContext, useState } from "react";

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
      }}
    >
      {children}
    </BorrowedBooksContext.Provider>
  );
};

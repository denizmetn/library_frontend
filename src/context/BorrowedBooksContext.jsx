import React, { createContext, useState } from "react";

export const BorrowedBooksContext = createContext();

export const BorrowedBooksProvider = ({ children }) => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [borrowHistory, setBorrowHistory] = useState([]);

  const addBorrowedBook = (book) => {
    setBorrowedBooks((prev) => [...prev, book]);
  };

  const removeBorrowedBook = (key) => {
    setBorrowedBooks((prev) => prev.filter((book) => book.key !== key));
  };

  const addToBorrowHistory = (book) => {
    setBorrowHistory((prevHistory) => [...prevHistory, book]);
  };

  return (
    <BorrowedBooksContext.Provider
      value={{
        borrowedBooks,
        addBorrowedBook,
        removeBorrowedBook,
        borrowHistory,
        addToBorrowHistory,
      }}
    >
      {children}
    </BorrowedBooksContext.Provider>
  );
};

import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes";
import { BorrowedBooksProvider } from "./context/BorrowedBooksContext";

function App() {
  return (
    <div>
      <BrowserRouter>
        <div className="flex flex-col">
          <BorrowedBooksProvider>
            <AppRouter />
          </BorrowedBooksProvider>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

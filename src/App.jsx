import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes";

function App() {
  return (
    <div>
      <BrowserRouter>
        <div className="flex flex-col">
          <AppRouter />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

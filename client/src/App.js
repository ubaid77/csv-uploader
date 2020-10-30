import React from "react";
import FileUpload from "./components/FileUpload";

import "./App.css";

function App() {
  return (
    <div className="container mt-4">
      <h4 className="display-4 text-center mb-4">Invoice Upload</h4>
      <FileUpload />
    </div>
  );
}

export default App;

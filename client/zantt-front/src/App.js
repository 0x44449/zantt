import React from "react";
import {
  Routes,
  Route
} from "react-router-dom";

import TaskIndex from "./pages/task";

function App() {
  return (
    <>
      <Routes>
        <Route index component={<TaskIndex />} />
      </Routes>
    </>
  );
}

export default App;

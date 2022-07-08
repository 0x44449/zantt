import React from "react";
import {
  Routes,
  Route
} from "react-router-dom";

import TaskItem from "./components/task-item";

function Index() {
  return (
    <>
      <Routes>
        <Route path="test" element={<></>} />
      </Routes>
      <TaskItem title="title" description="description" />
    </>
  );
}

export default Index;
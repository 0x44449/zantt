import React from "react";
import {
  Routes,
  Route
} from "react-router-dom";
import MowIndexPage from "./pages/mow";
import ProjectIndex from "./pages/mow/project";
import WorkspaceIndex from "./pages/mow/workspace";
import TaskIndex from "./pages/mow/task";

function App() {
  return (
    <>
      <Routes>
        <Route path="mow" element={<MowIndexPage />}>
          <Route path="project" element={<ProjectIndex />}>
            <Route path="workspace" element={<WorkspaceIndex />}>
              <Route path="task" element={<TaskIndex />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;

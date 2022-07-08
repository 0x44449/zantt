import React from "react";
import {
  Outlet
} from "react-router-dom";
import ProjectItem from "./components/project-item";

function ProjectIndex() {
  return (
    <>
      <div className="w-full">
        <div className="flex flex-row">
          <div className="flex flex-col w-32">
            <div>Project</div>
            <ProjectItem title="project1" />
          </div>
          <div className="flex flex-col w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectIndex;
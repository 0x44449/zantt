import React from "react";
import {
  Outlet
} from "react-router-dom";

function WorkspaceIndex() {
  return (
    <>
      <div className="flex flex-row">
        <div className="flex flex-col w-64">
          <div>Workspace</div>
          <div>asdf</div>
        </div>
        <div className="flex flex-col w-full">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default WorkspaceIndex;
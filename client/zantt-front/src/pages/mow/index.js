import React from "react";
import {
  Outlet
} from "react-router-dom";

function MowIndex() {
  return (
    <>
      <React.Suspense fallback={<>...</>}>
        <div>Mow</div>
        <Outlet />
      </React.Suspense>
    </>
  );
}

export default MowIndex;
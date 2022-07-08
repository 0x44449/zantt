import React from "react";
import {
  Routes,
  Route
} from "react-router-dom";

function Index() {
  return (
    <>
      <Routes>
        <Route path="test" element={<></>} />
      </Routes>
    </>
  );
}

export default Index;
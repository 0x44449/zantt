import React from "react";
import { createBrowserRouter } from "react-router-dom";
import ClientAddPage from "@/pages/client/AddPage";
import ClientListPage from "@/pages/client/ListPage";

const router = createBrowserRouter([{
  path: "/clients",
  element: <ClientListPage />
}, {
  path: "/clients/add",
  element: <ClientAddPage />
}]);

export default router;
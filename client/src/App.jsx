/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import {
  HomeLayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Error,
  Stats,
  AllProperty,
  AddProperty,
  Profile,
  Admin,
  EditProperty,
} from "./pages";

import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { loader as dashboardLoader } from "./pages/DashboardLayout";
import { action as addPropertyAction } from "./pages/AddProperty";
import { loader as allPropertyLoader } from "./pages/AllProperty";
import { loader as editJobLoader } from "./pages/EditProperty";
import { action as editJobAction } from "./pages/EditProperty";
import { action as deletePropertyAction } from "./pages/DeleteProperty";
import { loader as adminLoader } from "./pages/Admin";
import { action as profileAction } from "./pages/Profile";
import { loader as statsLoader } from "./pages/Stats";

export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};

checkDefaultTheme();

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <AddProperty />,
            action: addPropertyAction,
          },
          { path: "stats", element: <Stats />, loader: statsLoader },
          {
            path: "all-property",
            element: <AllProperty />,
            loader: allPropertyLoader,
          },
          {
            path: "profile",
            element: <Profile />,
            action: profileAction,
          },
          {
            path: "admin",
            element: <Admin />,
            loader: adminLoader,
          },
          {
            path: "edit-property/:id",
            element: <EditProperty />,
            loader: editJobLoader,
            action: editJobAction,
          },
          { path: "delete-property/:id", action: deletePropertyAction },
        ],
      },
    ],
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};
export default App;

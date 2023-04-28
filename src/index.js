import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";
import UserList from "./routes/UserList";
import UserCreate from "./routes/UserCreate";
import UserUpdate from "./routes/UserUpdate";
import UserDelete from "./routes/UserDelete";
import UserDetail from "./routes/UserDetail";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/users",
        element: <UserList />,
      },
      {
        path: "/create",
        element: <UserCreate />,
      },
      {
        path: "/update",
        element: <UserUpdate />,
      },
      {
        path: "/delete",
        element: <UserDelete />,
      },
      {
        path: "/user/:email", // Dynamic URL parameter for individual user page
        element: <UserDetail />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

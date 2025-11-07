// Point d’entrée principal de l’application React (TaskForge)
// Monte le composant racine <App /> dans le DOM, 
// en enveloppant l’application avec le <TasksProvider> (state global des tâches)
// et en activant <React.StrictMode> pour détecter les erreurs potentielles.


import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { TasksProvider } from "./context/TasksContext";
import App from "./App";
import TasksPage from "./pages/TasksPage";
import "./styles/global.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <TasksPage filter="all" /> },
      { path: "todo", element: <TasksPage filter="todo" /> },
      { path: "done", element: <TasksPage filter="done" /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TasksProvider>
      <RouterProvider router={router} />
    </TasksProvider>
  </React.StrictMode>
);

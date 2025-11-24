// Composant racine de l’application TaskForge
// Contient la structure principale : titre, formulaire d’ajout (<TaskForm />)
// et affichage de la liste des tâches (<TaskList />).
// Sert de point central reliant les composants de l’interface utilisateur.

import { NavLink, Outlet } from "react-router-dom";
import TasksCounter from "./components/TasksCounter";

export default function App() {
  const link = ({ isActive }: { isActive: boolean }) => ({
    padding: "6px 10px",
    borderRadius: 8,
    textDecoration: "none",
    background: isActive ? "#e5ffe5" : "transparent",
    border: isActive ? "1px solid #8bd28b" : "1px solid transparent"
  });

  return (
    <main style={{ maxWidth: 720, margin: "2rem auto", padding: 16 }}>
      <h1>TaskForge</h1>

      <nav style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        <NavLink to="/" style={link}>Toutes</NavLink>
        <NavLink to="/todo" style={link}>À faire</NavLink>
        <NavLink to="/done" style={link}>Terminées</NavLink>
      </nav>

      <TasksCounter />
      <Outlet />
    </main>
  );
}



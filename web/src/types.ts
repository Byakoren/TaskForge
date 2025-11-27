// Définition des types principaux du projet TaskForge
// ID : alias pour les identifiants (string ou number, selon le stockage ou la BDD)
// Task : structure standard d’une tâche (utilisée dans tout le front React)


export type ID = string | number;

export type Task = {
  id: ID;
  title: string;
  done: boolean;
  createdAt: string;
  updatedAt?: string;
};

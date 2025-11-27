// Code temporaire pour la démo sans BDD, à modif pour ajouter les requêtes SQL quand il y aura ajout de BDD
export type User = {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
};

// fake user pour démo sans BDD
const DEMO_USER = {
  id: "1",
  email: "demo@taskforge.dev",
  name: "Demo User",
  password: "demo123",
};

export async function verifyCredentials(
  email: string,
  password: string,
): Promise<User | null> {
  const normalizedEmail = email.trim().toLowerCase();

  if (normalizedEmail !== DEMO_USER.email || password !== DEMO_USER.password) {
    return null;
  }

  return {
    id: DEMO_USER.id,
    email: DEMO_USER.email,
    name: DEMO_USER.name,
    passwordHash: "",
  };
}

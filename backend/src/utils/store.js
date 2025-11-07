// backend/src/utils/store.js
const fs = require("fs/promises");
const path = require("path");

// Chemin robuste basé sur ce fichier (pas sur cwd)
const DB_FILE = path.join(__dirname, "../data/tasks.json");
const DB_DIR  = path.dirname(DB_FILE);

let db = { tasks: [] };
let writing = false;
let dirty = false;

async function ensureDir() {
  await fs.mkdir(DB_DIR, { recursive: true });
}

async function flush() {
  if (writing) { dirty = true; return; }
  writing = true;
  try {
    await ensureDir();
    await fs.writeFile(DB_FILE, JSON.stringify(db, null, 2), "utf8");
  } catch (err) {
    console.error("Erreur d’écriture JSON:", err);
  } finally {
    writing = false;
    if (dirty) { dirty = false; flush(); }
  }
}

function getDb() {
  return db;
}

function setDb(nextDb) {
  // On garde toujours la forme { tasks: [...] }
  if (Array.isArray(nextDb)) db = { tasks: nextDb };
  else if (nextDb && Array.isArray(nextDb.tasks)) db = nextDb;
  else db = { tasks: [] };

  void flush();
}

async function loadDb() {
  try {
    await ensureDir();
    const data = await fs.readFile(DB_FILE, "utf8");
    const parsed = JSON.parse(data);
    // 🔧 Normalisation : accepte ancien format `[]`
    db = Array.isArray(parsed) ? { tasks: parsed } :
         (parsed && Array.isArray(parsed.tasks)) ? parsed :
         { tasks: [] };
  } catch {
    console.warn("Aucune base JSON trouvée, création d’une nouvelle…");
    db = { tasks: [] };
    await ensureDir();
    await fs.writeFile(DB_FILE, JSON.stringify(db, null, 2), "utf8");
  }
}

module.exports = { getDb, setDb, loadDb };

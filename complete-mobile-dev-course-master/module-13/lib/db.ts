import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseSync("auth.db");

export function initDB() {
  db.execSync(
    `
    CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT
    );
        `,
  );
}

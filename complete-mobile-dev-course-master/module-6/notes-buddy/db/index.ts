import * as SQLite from "expo-sqlite";

let db:SQLite.SQLiteDatabase | null = null;

const getDatabase = async()=>{
    if(!db){
        db = await SQLite.openDatabaseAsync("notes.db");
        await db.execAsync(
            `
            CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT , title TEXT , content TEXY , createdAt TEXT)
            `
        )
    }

    return db;
}

export const initDatabase = async()=>{
    await getDatabase();
}

export const getNotes = async (): Promise<any[]> => {
  const database = await getDatabase();
  return await database.getAllAsync('SELECT * FROM notes ORDER BY createdAt DESC;');
};

export const addNote = async (title: string, content: string) => {
  const database = await getDatabase();
  const createdAt = new Date().toISOString();
  await database.runAsync('INSERT INTO notes (title, content, createdAt) VALUES (?, ?, ?);', [title, content, createdAt]);
};

export const updateNote = async (id: number, title: string, content: string) => {
  const database = await getDatabase();
  await database.runAsync('UPDATE notes SET title = ?, content = ? WHERE id = ?;', [title, content, id]);
};

export const deleteNote = async (id: number) => {
  const database = await getDatabase();
  await database.runAsync('DELETE FROM notes WHERE id = ?;', [id]);
};

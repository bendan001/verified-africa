import { db } from "./db";
import { createToken } from "./jwt";
import { deleteToken, saveToken } from "./token";

export async function signup(email: string, password: string) {
  try {
    await db.runAsync("INSERT INTO users (email, password) VALUES (?, ?)", [
      email,
      password,
    ]);

    const token = createToken({ email });
    await saveToken(token);
  } catch (error) {
    throw error;
  }
}

export async function login(email: string, password: string) {
  const rows = await db.getAllAsync<{
    id: number;
    email: string;
    password: string;
  }>("SELECT * FROM users WHERE email = ? AND password = ?", [email, password]);

  if (!rows || rows.length === 0) {
    throw new Error("Invalid credentials");
  }

  const token = createToken({ email });
  await saveToken(token);
}

export async function logout() {
  await deleteToken();
}

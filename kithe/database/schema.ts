import * as SQLite from 'expo-sqlite';

export type Friend = {
  id: number;
  name: string;
  nickname: string;
  tier: 1 | 2 | 3 | 4;
  birthday: string;
  currentChapter: string;
  interests: string[]; // Stored as JSON string in DB
  handleWithCare: string;
  lastNote: string;
  lastContactDate: string;
  friendsSince: string;
  timezone: string;
  communicationStyle: string;
};

export const initDatabase = async () => {
  const db = await SQLite.openDatabaseAsync('kithe.db');

  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS friends (
      id INTEGER PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      nickname TEXT,
      tier INTEGER CHECK(tier IN (1, 2, 3, 4)),
      birthday TEXT,
      currentChapter TEXT,
      interests TEXT,
      handleWithCare TEXT,
      lastNote TEXT,
      lastContactDate TEXT,
      friendsSince TEXT,
      timezone TEXT,
      communicationStyle TEXT
    );
  `);
  
  return db;
};

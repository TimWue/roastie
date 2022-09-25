import { exportDB } from "dexie-export-import";
import { db } from "./db";

interface FileSystemAccess {
  exportDatabase: () => Promise<Blob>;
}

export const fileSystemAccess: FileSystemAccess = {
  exportDatabase: async () => {
    return await exportDB(db);
  },
};

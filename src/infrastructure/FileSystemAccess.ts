import { exportDB } from "dexie-export-import";
import { roastDatabase } from "./roastDatabase";

interface FileSystemAccess {
  exportDatabase: () => Promise<Blob>;
}

export const fileSystemAccess: FileSystemAccess = {
  exportDatabase: async () => {
    return await exportDB(roastDatabase);
  },
};

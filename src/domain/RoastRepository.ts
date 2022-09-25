import { Roast } from "./Roast";
import { db } from "../infrastructure/db";

interface RoastRepository {
  addRoast: (roast: Roast) => Promise<any>;
  getAllRoasts: () => Promise<Roast[]>;
  deleteRoast: (id: string) => Promise<void>;
}

export const roastRepository: RoastRepository = {
  addRoast: (newRoast: Roast) => {
    return db.roasts.add(newRoast);
  },
  getAllRoasts: () => {
    return db.roasts.toArray();
  },
  deleteRoast: (id: string) => {
    return db.roasts.delete(id);
  },
};

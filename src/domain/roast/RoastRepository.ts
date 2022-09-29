import { Roast } from "./Roast";
import { roastDatabase } from "../../infrastructure/RoastDatabase";

interface RoastRepository {
  addRoast: (roast: Roast) => Promise<any>;
  getAllRoasts: () => Promise<Roast[]>;
  deleteRoast: (id: string) => Promise<void>;
}

export const roastRepository: RoastRepository = {
  addRoast: (newRoast: Roast) => {
    return roastDatabase.roasts.add(newRoast);
  },
  getAllRoasts: () => {
    return roastDatabase.roasts.toArray();
  },
  deleteRoast: (id: string) => {
    return roastDatabase.roasts.delete(id);
  },
};

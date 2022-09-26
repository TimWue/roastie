import Dexie, { Table } from "dexie";
import { Roast } from "../domain/roast/Roast";

export class RoastDexie extends Dexie {
  roasts!: Table<Roast>;

  constructor() {
    super("RoastieDatabase");
    this.version(1).stores({
      roasts: "++id, name",
    });
  }
}

export const roastDatabase = new RoastDexie();

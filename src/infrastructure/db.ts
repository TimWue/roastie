import Dexie, { Table } from "dexie";
import { Roast } from "../domain/Roast";

export class MySubClassedDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  roasts!: Table<Roast>;

  constructor() {
    super("RoastieDatabase");
    this.version(1).stores({
      roasts: "++id, name", // Primary key and indexed props
    });
  }
}

export const db = new MySubClassedDexie();

import Dexie, { Table } from "dexie";
import { Roast } from "../domain/Roast";

export class MySubClassedDexie extends Dexie {
  roasts!: Table<Roast>;

  constructor() {
    super("RoastieDatabase");
    this.version(1).stores({
      roasts: "++id, name", // Primary key and indexed props
    });
  }
}

export const db = new MySubClassedDexie();

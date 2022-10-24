import Dexie, { Table } from "dexie";
import { Measurement } from "../domain/roast/Roast";

type TimeSeries = {
  name: string;
  values: Measurement[];
};

export type RoastDataDto = TimeSeries[];

export type RoastDto = {
  id?: string;
  name: string;
  rating: number;
  data: RoastDataDto;
  comment?: string;
  bean: string;
  createdAt: number;
};

export class RoastDexie extends Dexie {
  roasts!: Table<RoastDto>;

  constructor() {
    super("RoastieDatabase");
    this.version(1).stores({
      roasts: "++id, name",
    });
  }
}

export const roastDatabase = new RoastDexie();

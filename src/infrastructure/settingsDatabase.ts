import Dexie, { Table } from "dexie";
import { Settings } from "../domain/settings/Settings";

export class SettingsDexie extends Dexie {
  settings!: Table<Settings>;

  constructor() {
    super("RoastieSettingsDatabase");
    this.version(1).stores({
      settings: "++id", // Primary key and indexed props
    });
  }
}

export const settingsDatabase = new SettingsDexie();

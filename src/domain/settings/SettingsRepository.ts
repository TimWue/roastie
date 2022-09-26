import { Settings } from "./Settings";
import { settingsDatabase } from "../../infrastructure/settingsDatabase";

interface SettingsRepository {
  updateSettings: (mqttSettings: Settings) => Promise<void>;
  getSettings: () => Promise<Settings>;
}

export const settingsRepository: SettingsRepository = {
  async getSettings(): Promise<Settings> {
    const settings = await settingsDatabase.settings.toArray();
    const n = settings.length;

    if (n > 1) {
      throw new Error("Too many settings found (" + n + ")");
    }

    return settings[0];
  },
  async updateSettings(settings: Settings): Promise<void> {
    await settingsDatabase.settings.put(settings);
  },
};

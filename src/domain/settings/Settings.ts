export type MqttSettings = {
  host: string;
  topics: string[];
};

export type DetailSettings = {
  selectedTopic: string;
};

export type Settings = {
  id: number;
  mqtt: MqttSettings;
  details: DetailSettings;
};

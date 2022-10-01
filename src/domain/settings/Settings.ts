export type Topic = {
  name: string;
  color: string;
};

export type MqttSettings = {
  host: string;
  topics: Topic[];
};

export type DetailSettings = {
  selectedTopic: string;
};

export type Settings = {
  id: number;
  mqtt: MqttSettings;
  details: DetailSettings;
};

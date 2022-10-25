export type TopicName = string;

export type Topic = {
  name: TopicName;
  color: string;
};

export type MqttSettings = {
  host: string;
  topics: Topic[];
};

export type DetailSettings = {
  selectedTopic: TopicName;
};

export type Settings = {
  id: number;
  mqtt: MqttSettings;
  details: DetailSettings;
};

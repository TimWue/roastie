export type TopicName = string;

export type DataInformation = {
  displayName: string;
  topicName: TopicName;
  color: string;
};

export type DisplaySettings = {
  dataInformation: DataInformation[];
};

export type MqttSettings = {
  host: string;
  topicNames: TopicName[];
};

export type DetailSettings = {
  selectedTopic: TopicName;
};

export type Settings = {
  id: number;
  mqtt: MqttSettings;
  details: DetailSettings;
  display: DisplaySettings;
};

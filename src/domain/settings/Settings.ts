export type TopicName = string;

export type DataInformation = {
  displayName: string;
  topicName: TopicName;
  color: string;
  show: boolean;
};

export type DisplaySettings = {
  dataInformation: DataInformation[];
};

export type MqttSettings = {
  host: string;
  topicNames: TopicName[];
};

export type Settings = {
  id: number;
  mqtt: MqttSettings;
  display: DisplaySettings;
};

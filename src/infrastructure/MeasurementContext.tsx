import { createContext, FunctionComponent, ReactNode, useState } from "react";
import { Measurement } from "../domain/roast/Roast";
import { MqttClientConnection } from "./MqttClient";

interface TopicsData {
  [index: string]: Measurement[];
}

interface ContextProps {
  topicsData: TopicsData;
  startMeasurement: (host: string, topicNames: string[]) => void;
  stopMeasurement: (topicNames: string[]) => void;
}

export const MeasurementContext = createContext<ContextProps>(
  {} as ContextProps
);

interface ProviderProps {
  children: ReactNode;
}

export const MeasurementContextProvider: FunctionComponent<ProviderProps> = ({
  children,
}) => {
  const [topicsData, setTopicsData] = useState<TopicsData>({});
  const [client, setClient] = useState<MqttClientConnection>(
    {} as MqttClientConnection
  );

  const handler = (topic: string, measurement: Measurement) => {
    const currentData = topicsData[topic];
    const topicData = currentData
      ? [...currentData, measurement]
      : [measurement];
    const newData = topicsData;
    newData[topic] = topicData;
    console.log(newData);
    setTopicsData(newData);
  };

  const startMeasurement = (host: string, topicNames: string[]) => {
    const mqttClient = new MqttClientConnection(host);
    topicNames.forEach((topicName) => mqttClient.subscribe(topicName, handler));
    setClient(mqttClient);
  };

  const stopMeasurement = (topicNames: string[]) => {
    client.unsubscribe(topicNames);
  };

  return (
    <MeasurementContext.Provider
      value={{ startMeasurement, stopMeasurement, topicsData }}
    >
      {children}
    </MeasurementContext.Provider>
  );
};

import { createContext, FunctionComponent, ReactNode, useState } from "react";
import { Measurement } from "../domain/roast/Roast";
import { MqttClientConnection } from "./MqttClient";

interface TopicsData {
  [index: string]: Measurement[];
}

interface ContextProps {
  topicsData: Map<string, Measurement[]>;
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
  const [topicsData, setTopicsData] = useState<Map<string, Measurement[]>>(
    new Map()
  );
  const [client, setClient] = useState<MqttClientConnection>(
    {} as MqttClientConnection
  );

  const updateData = (topicName: string, measurements: Measurement[]) => {
    setTopicsData(new Map(topicsData.set(topicName, measurements)));
  };

  const handler = (topic: string, measurement: Measurement) => {
    const currentData = topicsData.get(topic);
    const newData = currentData ? [...currentData, measurement] : [measurement];
    updateData(topic, newData);
  };

  const startMeasurement = (host: string, topicNames: string[]) => {
    const mqttClient = new MqttClientConnection(host);
    mqttClient.subscribe(topicNames, handler);
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

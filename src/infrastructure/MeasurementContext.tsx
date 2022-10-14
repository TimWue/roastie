import {
  createContext,
  FunctionComponent,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { Measurement } from "../domain/roast/Roast";
import { MqttClientConnection } from "./MqttClient";

export type TopicsData = Map<string, Measurement[]>;
interface TopicMeasurement {
  topicName: string;
  measurement: Measurement;
}
interface ContextProps {
  topicsData: TopicsData;
  lastMeasurement: TopicMeasurement | undefined;
  startMeasurement: () => void;
  stopMeasurement: () => void;
  subscribeToMeasurements: (host: string, topicNames: string[]) => void;
  unsubscribeFromMeasurements: () => void;
  measurementStarted: boolean;
  startTime: number | undefined;
  maxTime: number | undefined;
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
  const [topicNames, setTopicNames] = useState<string[]>([]);
  const [lastMeasurement, setLastMeasurement] = useState<TopicMeasurement>();
  const [topicsData, setTopicsData] = useState<TopicsData>(new Map());
  const [measurementStarted, setMeasurementStarted] = useState(false);
  const [client, setClient] = useState<MqttClientConnection>();
  const [startTime, setStartTime] = useState<number>();
  const [maxTime, setMaxTime] = useState<number>();

  const updateData = (topicName: string, measurements: Measurement[]) => {
    setTopicsData(new Map(topicsData.set(topicName, measurements)));
  };

  const handleMeasurements = (topic: string, measurement: Measurement) => {
    setMaxTime(Date.now());
    const currentData = topicsData.get(topic);
    const newData = currentData ? [...currentData, measurement] : [measurement];
    updateData(topic, newData);
  };

  const handleNewMeasurement = (
    topicName: string,
    measurement: Measurement
  ) => {
    setLastMeasurement({ topicName, measurement });
  };

  const startMeasurement = () => {
    setMeasurementStarted(true);
    if (!startTime) {
      setStartTime(Date.now());
    }
  };

  const stopMeasurement = () => {
    setMeasurementStarted(false);
  };

  const subscribeToMeasurements = (host: string, topicNames: string[]) => {
    console.log("Subscribe to measurements. Topics: " + topicNames.join(", "));

    setTopicNames(topicNames);
    const mqttClient = new MqttClientConnection(host);
    mqttClient.subscribe(topicNames, handleNewMeasurement);
    setClient(mqttClient);
  };

  const unsubscribeFromMeasurements = () => {
    console.log("Unsubscribe from measurements");
    client && client.unsubscribe(topicNames);
  };

  useEffect(() => {
    if (lastMeasurement && measurementStarted) {
      handleMeasurements(
        lastMeasurement.topicName,
        lastMeasurement.measurement
      );
    }
  }, [lastMeasurement]);

  return (
    <MeasurementContext.Provider
      value={{
        startMeasurement,
        stopMeasurement,
        topicsData,
        subscribeToMeasurements,
        unsubscribeFromMeasurements,
        lastMeasurement,
        measurementStarted,
        startTime,
        maxTime,
      }}
    >
      {children}
    </MeasurementContext.Provider>
  );
};

import {
  createContext,
  FunctionComponent,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { Measurement, RoastData } from "../domain/roast/Roast";
import { MqttClientConnection } from "./MqttClient";
import { TopicName } from "../domain/settings/Settings";

interface TopicMeasurement {
  topicName: TopicName;
  measurement: Measurement;
}

interface ContextProps {
  roastData: RoastData;
  lastMeasurement: TopicMeasurement | undefined;
  startMeasurement: () => void;
  stopMeasurement: () => void;
  resetMeasurement: () => void;
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
  const [roastData, setRoastData] = useState<RoastData>(new Map());
  const [measurementStarted, setMeasurementStarted] = useState(false);
  const [client, setClient] = useState<MqttClientConnection>();
  const [startTime, setStartTime] = useState<number>();
  const [maxTime, setMaxTime] = useState<number>();

  const updateData = (topicName: string, measurements: Measurement[]) => {
    setRoastData(new Map(roastData.set(topicName, measurements)));
  };

  const handleMeasurements = (topic: string, measurement: Measurement) => {
    if (roastData.size === 0 && !startTime) {
      setStartTime(measurement.x);
    }
    setMaxTime(measurement.x);
    const currentData = roastData.get(topic);
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

  const resetMeasurement = () => {
    setStartTime(undefined);
    setMaxTime(undefined);
    setLastMeasurement(undefined);
    setRoastData(new Map());
    setMeasurementStarted(false);
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
        resetMeasurement,
        roastData,
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

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

export enum Status {
  RUNNING = "RUNNING",
  PAUSED = "PAUSED",
  IDLE = "IDLE",
}

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
  measurementStatus: Status;
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
  const [measurementStatus, setMeasurementStatus] = useState(Status.IDLE);
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
    resetState();
    setMeasurementStatus(Status.RUNNING);
  };

  const stopMeasurement = () => {
    setMeasurementStatus(Status.PAUSED);
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
    resetState();
    setMeasurementStatus(Status.IDLE);
  };

  const resetState = () => {
    setStartTime(undefined);
    setMaxTime(undefined);
    setLastMeasurement(undefined);
    setRoastData(new Map());
  };

  useEffect(() => {
    if (lastMeasurement && measurementStatus == Status.RUNNING) {
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
        measurementStatus,
        startTime,
        maxTime,
      }}
    >
      {children}
    </MeasurementContext.Provider>
  );
};

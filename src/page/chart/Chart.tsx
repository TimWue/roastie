import * as React from "react";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import Title from "../shared/Title";
import { MeasurementContext } from "../../infrastructure/MeasurementContext";
import { Topic } from "../../domain/settings/Settings";
import { settingsRepository } from "../../domain/settings/SettingsRepository";
import { Controls } from "../controls/Controls";
import { Grid } from "@mui/material";
import { Measurement } from "../../domain/roast/Roast";
import { ReferenceMeasurementContext } from "../../infrastructure/ReferenceMeasurementContext";

const FIVE_MINUTES = 300000; // 5 minutes in milliseconds
const DEFAULT_MEASUREMENT_LENGTH = 4 * FIVE_MINUTES; // 20 minutes

export const Chart: FunctionComponent = () => {
  const { roastData, startTime, maxTime } = useContext(MeasurementContext);
  const { referenceTopicName, referenceMeasurements } = useContext(
    ReferenceMeasurementContext
  );
  const [topics, setTopics] = useState<Topic[]>([]);
  const [maxDomain, setMaxDomain] = useState(DEFAULT_MEASUREMENT_LENGTH);

  useEffect(() => {
    settingsRepository
      .getSettings()
      .then((settings) => {
        setTopics(settings.mqtt.topics);
      })
      .catch((e) => console.warn(e));
  }, []);

  const updateMaxDomain = (startTime: number, maxTime: number) => {
    const timeExceeded = maxTime - startTime >= DEFAULT_MEASUREMENT_LENGTH;
    setMaxDomain(
      timeExceeded
        ? DEFAULT_MEASUREMENT_LENGTH + FIVE_MINUTES
        : DEFAULT_MEASUREMENT_LENGTH
    );
  };

  useEffect(() => {
    startTime && maxTime && updateMaxDomain(startTime, maxTime);
  }, [startTime, maxTime]);

  return (
    <>
      <Grid
        container
        direction={"row"}
        justifyContent={"space-between"}
        flexWrap={"nowrap"}
      >
        <Title>Aktuelle Röstung</Title>
        <Controls />
      </Grid>

      <ResponsiveContainer>
        <LineChart
          width={730}
          height={250}
          margin={{ top: 20, right: 0, bottom: 10, left: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <YAxis
            dataKey="y"
            name="temperature"
            unit="°C"
            tickCount={5}
            domain={[0, 200]}
            hide={false}
          />
          <Legend />
          <XAxis
            dataKey="x"
            xAxisId={0}
            domain={[0, maxDomain]}
            type={"number"}
            tickCount={9}
            tickFormatter={xTickFormatter}
          />
          {topics?.map((topic, index) => {
            const measurements = roastData.get(topic.name);
            return putData(maxDomain, topic, measurements, startTime, false);
          })}
          {referenceMeasurements &&
            referenceTopicName &&
            putData(
              maxDomain,
              { color: "blue", name: referenceTopicName + "(Ref.)" }, // probably better to use dashed lines
              referenceMeasurements,
              referenceMeasurements[0].x,
              true
            )}
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

function msToMS(ms: number): string {
  let secondsRemaining = Math.floor(ms / 1000);
  secondsRemaining = secondsRemaining % 3600;
  const minutes = ("0" + Math.floor(secondsRemaining / 60)).slice(-2);
  const seconds = ("0" + (secondsRemaining % 60)).slice(-2);
  return minutes + ":" + seconds;
}

const xTickFormatter = (value: number, index: number): string => {
  return msToMS(value);
};

const putData = (
  maxDomain: number,
  topic: Topic,
  measurements: Measurement[] | undefined,
  startTime: number | undefined,
  isReference: boolean
) => {
  return (
    <>
      {measurements && (
        <Line
          isAnimationActive={false}
          animateNewValues={false}
          data={measurements.map((measurement) => {
            return {
              x: measurement.x - (startTime ?? 0),
              y: measurement.y,
            };
          })}
          dataKey={"y"}
          xAxisId={0}
          type="monotone"
          stroke={isReference ? "#555" : topic.color}
          name={topic.name}
          dot={false}
          strokeDasharray={isReference ? 4 : undefined}
          strokeWidth={5}
        />
      )}
    </>
  );
};

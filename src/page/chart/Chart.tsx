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

const DEFAULT_MEASUREMENT_LENGTH = 60 * 60 * 20 * 10;
export const Chart: FunctionComponent = () => {
  const { roastData, startTime, maxTime } = useContext(MeasurementContext);
  const { referenceTopicName, referenceMeasurements } = useContext(
    ReferenceMeasurementContext
  );
  const [topics, setTopics] = useState<Topic[]>();
  const [maxDomain, setMaxDomain] = useState(DEFAULT_MEASUREMENT_LENGTH);

  useEffect(() => {
    settingsRepository.getSettings().then((settings) => {
      setTopics(settings.mqtt.topics);
    });
  }, []);

  const updateMaxDomain = (startTime: number, maxTime: number) => {
    setMaxDomain(Math.max(DEFAULT_MEASUREMENT_LENGTH, maxTime - startTime));
  };

  useEffect(() => {
    startTime && maxTime && updateMaxDomain(startTime, maxTime);
  }, [startTime, maxTime]);

  return (
    <>
      <Grid container direction={"row"} justifyContent={"space-between"}>
        <Title>Aktuelle Röstung</Title>
        <Controls />
      </Grid>

      <ResponsiveContainer>
        <LineChart
          width={730}
          height={250}
          margin={{ top: 20, right: 20, bottom: 10, left: 10 }}
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
          {topics?.map((topic, index) => {
            const measurements = roastData.get(topic.name);
            return putData(
              index,
              maxDomain,
              topic,
              index == 0,
              measurements,
              startTime
            );
          })}
          {referenceMeasurements &&
            referenceTopicName &&
            putData(
              100,
              maxDomain,
              { color: "blue", name: referenceTopicName + "(Ref.)" }, // probably better to use dashed lines
              false,
              referenceMeasurements,
              referenceMeasurements[0].x
            )}
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

const putData = (
  axisIndex: number,
  maxDomain: number,
  topic: Topic,
  showX: boolean,
  measurements: Measurement[] | undefined,
  startTime: number | undefined
) => {
  return (
    <>
      <XAxis
        dataKey="x"
        xAxisId={axisIndex}
        domain={[0, maxDomain]}
        type={"number"}
        hide={!showX}
        tickCount={9}
      />

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
          xAxisId={axisIndex}
          type="monotone"
          stroke={topic.color}
          name={topic.name}
        />
      )}
    </>
  );
};

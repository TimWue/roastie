import * as React from "react";
import { useContext, useEffect, useState } from "react";
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
import { ChartItem } from "./ChartItem";

const DEFAULT_MEASUREMENT_LENGTH = 60 * 60 * 20;
export default function Chart() {
  const { topicsData, startTime, maxTime, referenceMeasurement } =
    useContext(MeasurementContext);
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
            const measurements = topicsData.get(topic.name);
            return (
              <ChartItem
                topicInformation={topic}
                measurements={measurements}
                index={index}
                maxDomain={maxDomain}
                showX={index === 0}
                startTime={startTime}
              />
            );
          })}
          {referenceMeasurement &&
            topics &&
            putData(
              100,
              maxDomain,
              "blue", // probably better to use dashed lines
              false,
              referenceMeasurement.get(topics[1].name), // set topic in dialog
              referenceMeasurement.get(topics[1].name)![0].x // set topic in dialog
            )}
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}

const putData = (
  axisIndex: number,
  maxDomain: number,
  color: string,
  showX: boolean,
  topicData: Measurement[] | undefined,
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

      {topicData && (
        <Line
          isAnimationActive={false}
          animateNewValues={false}
          data={topicData.map((measurement) => {
            return {
              x: measurement.x - (startTime ?? 0),
              y: measurement.y,
            };
          })}
          dataKey={"y"}
          xAxisId={axisIndex}
          type="monotone"
          stroke={color}
        />
      )}
    </>
  );
};

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

const DEFAULT_MEASUREMENT_LENGTH = 60 * 60 * 20;
export default function Chart() {
  const { topicsData, startTime, maxTime } = useContext(MeasurementContext);
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
            const topicData = topicsData.get(topic.name);
            if (!topicData) {
              return (
                <XAxis
                  dataKey="x"
                  domain={[0, maxDomain]}
                  type={"number"}
                  interval={"preserveStartEnd"}
                  tickCount={9}
                />
              );
            }
            return (
              <>
                <XAxis
                  dataKey="x"
                  name="stature"
                  xAxisId={index}
                  domain={[0, maxDomain]}
                  type={"number"}
                  hide={index !== 0}
                  tickCount={9}
                />
                <Line
                  isAnimationActive={false}
                  animateNewValues={false}
                  name={topic.name}
                  data={topicData.map((measurement) => {
                    return {
                      x: measurement.x - (startTime ?? 0),
                      y: measurement.y,
                    };
                  })}
                  dataKey={"y"}
                  xAxisId={index}
                  type="monotone"
                  stroke={topic.color}
                />
              </>
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}

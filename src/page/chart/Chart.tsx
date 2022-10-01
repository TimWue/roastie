import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Title from "../shared/Title";
import { MeasurementContext } from "../../infrastructure/MeasurementContext";
import { Topic } from "../../domain/settings/Settings";
import { settingsRepository } from "../../domain/settings/SettingsRepository";

export default function Chart() {
  const theme = useTheme();
  const { topicsData } = useContext(MeasurementContext);
  const [topics, setTopics] = useState<Topic[]>();

  useEffect(() => {
    settingsRepository.getSettings().then((settings) => {
      setTopics(settings.mqtt.topics);
    });
  }, []);

  useEffect(() => {
    console.log(JSON.stringify(topicsData));
  }, [topicsData]);

  const domain = [1664654816744, 1664660820744];

  return (
    <>
      <Title>Aktuelle Röstung</Title>
      <ResponsiveContainer>
        <LineChart
          width={730}
          height={250}
          margin={{ top: 20, right: 20, bottom: 10, left: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <YAxis dataKey="y" name="weight" unit="kg" />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Legend />
          {topics?.map((topic, index) => {
            return (
              <>
                <XAxis
                  dataKey="x"
                  name="stature"
                  xAxisId={index}
                  domain={domain}
                  type={"number"}
                  hide={index !== 1}
                />
                <Line
                  name={topic.name}
                  data={topicsData[topic.name]}
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

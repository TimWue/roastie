import * as React from "react";
import { useContext, useEffect, useState } from "react";
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
  const { topicsData } = useContext(MeasurementContext);
  const [topics, setTopics] = useState<Topic[]>();

  useEffect(() => {
    settingsRepository.getSettings().then((settings) => {
      setTopics(settings.mqtt.topics);
    });
  }, []);

  const domain = [0, 60 * 60 * 20];

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
            const topicData = topicsData.get(topic.name);
            if (!topicData) {
              return <></>;
            }
            return (
              <>
                <XAxis
                  dataKey="x"
                  name="stature"
                  xAxisId={index}
                  domain={domain}
                  type={"number"}
                  hide={index !== 0}
                />
                <Line
                  name={topic.name}
                  data={topicData.map((measurement) => {
                    return {
                      x: measurement.x - topicData[0].x,
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

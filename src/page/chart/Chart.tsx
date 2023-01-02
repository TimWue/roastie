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
import { MeasurementContext } from "../../infrastructure/MeasurementContext";
import { DataInformation } from "../../domain/settings/Settings";
import { settingsRepository } from "../../domain/settings/SettingsRepository";
import { Measurement } from "../../domain/roast/Roast";
import { ReferenceMeasurementContext } from "../../infrastructure/ReferenceMeasurementContext";
import { msToMS } from "../shared/Utils";

const FIVE_MINUTES = 300000; // 5 minutes in milliseconds
const DEFAULT_MEASUREMENT_LENGTH = 4 * FIVE_MINUTES; // 20 minutes

export const Chart: FunctionComponent = () => {
  const { roastData, startTime, maxTime } = useContext(MeasurementContext);
  const { referenceTopicName, referenceMeasurements } = useContext(
    ReferenceMeasurementContext
  );
  const [dataInformation, setDataInformation] = useState<DataInformation[]>([]);
  const [maxDomain, setMaxDomain] = useState(DEFAULT_MEASUREMENT_LENGTH);

  useEffect(() => {
    settingsRepository
      .getSettings()
      .then((settings) => {
        setDataInformation(settings.display.dataInformation);
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
    <ResponsiveContainer>
      <LineChart>
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
        {dataInformation?.map((dataInformation) => {
          const measurements = roastData.get(dataInformation.topicName);
          return createLine(
            maxDomain,
            dataInformation,
            measurements,
            startTime,
            false
          );
        })}
        {referenceMeasurements &&
          referenceTopicName &&
          createLine(
            maxDomain,
            {
              color: "blue",
              topicName: referenceTopicName,
              displayName: referenceTopicName + "(Ref.)",
              show: false,
            }, // probably better to use dashed lines
            referenceMeasurements,
            referenceMeasurements[0].x,
            true
          )}
      </LineChart>
    </ResponsiveContainer>
  );
};

const xTickFormatter = (value: number, index: number): string => {
  return msToMS(value);
};

const createLine = (
  maxDomain: number,
  dataInformation: DataInformation,
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
          stroke={isReference ? "#555" : dataInformation.color}
          name={dataInformation.displayName}
          dot={false}
          strokeDasharray={isReference ? 4 : undefined}
          strokeWidth={5}
        />
      )}
    </>
  );
};

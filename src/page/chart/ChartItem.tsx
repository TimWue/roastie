import * as React from "react";
import { FunctionComponent } from "react";
import { Line, XAxis } from "recharts";
import { Topic } from "../../domain/settings/Settings";
import { Measurement } from "../../domain/roast/Roast";

interface Props {
  topicInformation: Topic;
  measurements: Measurement[] | undefined;
  index: number;
  maxDomain: number;
  showX: boolean;
  startTime: number | undefined;
}

export const ChartItem: FunctionComponent<Props> = ({
  topicInformation,
  measurements,
  index,
  maxDomain,
  showX,
  startTime,
}) => {
  return (
    <>
      <XAxis
        dataKey="x"
        xAxisId={index}
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
          xAxisId={index}
          type="monotone"
          stroke={topicInformation.color}
          name={topicInformation.name}
        />
      )}
    </>
  );
};

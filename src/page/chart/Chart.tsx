import * as React from "react";
import {useTheme} from "@mui/material/styles";
import {CartesianGrid, Legend, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis,} from "recharts";
import Title from "../shared/Title";

// Generate Sales Data
function createData(time: string, amount?: number) {
  return { time, amount };
}

/*
const data = [
  createData("00:00", 0),
  createData("03:00", 300),
  createData("06:00", 600),
  createData("09:00", 800),
  createData("12:00", 1500),
  createData("15:00", 2000),
  createData("18:00", 2400),
  createData("21:00", 2400),
  createData("24:00", undefined),
];*/

export default function Chart() {
  const theme = useTheme();

  const data01 = [
    { x: 10, y: 30 },
    { x: 30, y: 200 },
    { x: 45, y: 100 },
    { x: 50, y: 400 },
    { x: 70, y: 150 },
    { x: 100, y: 250 },
  ];
  const data02 = [
    { x: 25, y: 20 },
    { x: 50, y: 180 },
    { x: 75, y: 240 },
    { x: 100, y: 100 },
    { x: 120, y: 190 },
  ];
  return (
    <>
      <Title>Aktuelle Röstung</Title>
      <ResponsiveContainer>
        <ScatterChart
          width={730}
          height={250}
          margin={{ top: 20, right: 20, bottom: 10, left: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="x"
            name="stature"
            xAxisId={"1"}
            domain={[0, 150]}
            type={"number"}
          />
          <XAxis
            dataKey="x"
            name="stature"
            xAxisId={"2"}
            domain={[0, 150]}
            type={"number"}
          />
          <YAxis dataKey="y" name="weight" unit="kg" />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Legend />
          <Scatter
            name="Sensor1"
            data={data01}
            fill="#8884d8"
            xAxisId={"1"}
            line
          />

          <Scatter
            name="Sensor2"
            data={data02}
            fill="#82ca9d"
            xAxisId={"2"}
            line
          />
        </ScatterChart>
      </ResponsiveContainer>
    </>
  );
}

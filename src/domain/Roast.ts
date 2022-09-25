export type Roast = {
  id?: string;
  name: string;
  rating: number;
  data: TimeSeries[];
  comment?: string;
  bean: string;
  createdAt: number;
};

export type DataPoint = {
  x: number;
  y: number;
};

export type TimeSeries = {
  values: DataPoint[];
  type: string;
};

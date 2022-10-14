export type Roast = {
  id?: string;
  name: string;
  rating: number;
  data: TimeSeries[];
  comment?: string;
  bean: string;
  createdAt: number;
};

export type Measurement = {
  x: number;
  y: number;
};

export type TimeSeries = {
  name: string;
  values: Measurement[];
};

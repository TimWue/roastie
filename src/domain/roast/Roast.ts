export type Roast = {
  id?: string;
  name: string;
  rating: number;
  data: RoastData;
  comment?: string;
  bean: string;
  createdAt: number;
  startWeight?: number;
  endWeight?: number;
  firstCrack?: number;
};

export type Measurement = {
  x: number;
  y: number;
};

export type RoastData = Map<string, Measurement[]>;

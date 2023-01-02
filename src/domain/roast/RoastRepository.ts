import { Roast } from "./Roast";
import {
  roastDatabase,
  RoastDataDto,
  RoastDto,
} from "../../infrastructure/RoastDatabase";

interface RoastRepository {
  addRoast: (roast: Roast) => Promise<any>;
  getAllRoasts: () => Promise<Roast[]>;
  deleteRoast: (id: string) => Promise<void>;
}

export const roastRepository: RoastRepository = {
  addRoast: (newRoast: Roast) => {
    return roastDatabase.roasts.add(roastToRoastDto(newRoast));
  },
  getAllRoasts: async () => {
    const roastDtos = await roastDatabase.roasts.toArray();
    return roastDtos.map(roastDto2Roast);
  },
  deleteRoast: (id: string) => {
    return roastDatabase.roasts.delete(id);
  },
};

const roastToRoastDto = (roast: Roast): RoastDto => {
  const roastDataDto: RoastDataDto = [];

  roast.data.forEach((measurements, topic) => {
    roastDataDto.push({ name: topic, values: measurements });
  });

  return {
    bean: roast.bean,
    comment: roast.comment,
    createdAt: roast.createdAt,
    data: roastDataDto,
    id: roast.id,
    name: roast.name,
    rating: roast.rating,
    startWeight: roast.startWeight,
    endWeight: roast.endWeight,
  };
};

const roastDto2Roast = (roastDto: RoastDto): Roast => {
  const roastData = new Map();
  roastDto.data.forEach((series) => {
    roastData.set(series.name, series.values);
  });

  return {
    bean: roastDto.bean,
    comment: roastDto.comment,
    createdAt: roastDto.createdAt,
    data: roastData,
    id: roastDto.id,
    name: roastDto.name,
    rating: roastDto.rating,
    startWeight: roastDto.startWeight,
    endWeight: roastDto.endWeight,
  };
};

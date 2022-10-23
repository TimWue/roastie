import { createContext, FunctionComponent, ReactNode, useState } from "react";
import { Roast, TimeSeries } from "../domain/roast/Roast";

interface ContextProps {
  referenceTimeSeries: TimeSeries | undefined;
  update: (roast: Roast, topicIndex?: number) => void;
  remove: () => void;
  changeTopic: (topicIndex: number) => void;
}

export const MeasurementContext = createContext<ContextProps>(
  {} as ContextProps
);

interface ProviderProps {
  children: ReactNode;
}

export const ReferenceMeasurementContextProvider: FunctionComponent<
  ProviderProps
> = ({ children }) => {
  const [referenceRoast, setReferenceRoast] = useState<Roast>();
  const [referenceTimeSeries, setReferenceTimeSeries] = useState<TimeSeries>();

  const update = (roast: Roast, topicIndex?: number) => {
    const initialIndex = topicIndex ?? 0;
    setReferenceTimeSeries(roast.data[initialIndex]);
    setReferenceRoast(roast);
  };

  const remove = () => {
    setReferenceTimeSeries(undefined);
    setReferenceRoast(undefined);
  };

  const changeTopic = (topicIndex: number) => {
    if (referenceRoast) {
      setReferenceTimeSeries(referenceRoast.data[topicIndex]);
    } else {
      throw new Error("No reference roast defined. Cannot change topic!");
    }
  };

  return (
    <MeasurementContext.Provider
      value={{
        referenceTimeSeries,
        remove,
        update,
        changeTopic,
      }}
    >
      {children}
    </MeasurementContext.Provider>
  );
};

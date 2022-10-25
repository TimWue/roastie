import { createContext, FunctionComponent, ReactNode, useState } from "react";
import { Measurement, Roast } from "../domain/roast/Roast";
import { TopicName } from "../domain/settings/Settings";

interface ContextProps {
  referenceTopicName: TopicName | undefined;
  referenceMeasurements: Measurement[] | undefined;
  update: (roast: Roast, topicName?: TopicName) => void;
  remove: () => void;
  changeTopicName: (topicName: TopicName) => void;
}

export const ReferenceMeasurementContext = createContext<ContextProps>(
  {} as ContextProps
);

interface ProviderProps {
  children: ReactNode;
}

export const ReferenceMeasurementContextProvider: FunctionComponent<
  ProviderProps
> = ({ children }) => {
  const [referenceRoast, setReferenceRoast] = useState<Roast>();
  const [referenceMeasurements, setReferenceMeasurements] =
    useState<Measurement[]>();
  const [referenceTopicName, setReferenceTopicName] = useState<TopicName>();

  const update = (roast: Roast, topicName?: TopicName) => {
    const initialTopicName = topicName ?? Array.from(roast.data.keys()).at(0);

    if (!initialTopicName) {
      throw new Error("Roast has no topic, which can be selected.");
    }

    setReferenceMeasurements(roast.data.get(initialTopicName));
    setReferenceTopicName(initialTopicName);
    setReferenceRoast(roast);
  };

  const remove = () => {
    setReferenceMeasurements(undefined);
    setReferenceTopicName(undefined);
    setReferenceRoast(undefined);
  };

  const changeTopic = (topicName: TopicName) => {
    if (referenceRoast) {
      setReferenceMeasurements(referenceRoast.data.get(topicName));
      setReferenceTopicName(topicName);
    } else {
      throw new Error("No reference roast defined. Cannot change topic!");
    }
  };

  return (
    <ReferenceMeasurementContext.Provider
      value={{
        referenceTopicName,
        referenceMeasurements,
        remove,
        update,
        changeTopicName: changeTopic,
      }}
    >
      {children}
    </ReferenceMeasurementContext.Provider>
  );
};

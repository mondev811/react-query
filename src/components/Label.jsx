import { useEffect, useState } from "react";
import { useLabelsData } from "../helpers/queryhooks";

export const Label = ({ label }) => {
  const { data, isLoading, isSuccess } = useLabelsData();
  const [currentLabel, setCurrentLabel] = useState({
    name: undefined,
    id: undefined,
    color: undefined,
  });

  useEffect(() => {
    if (isLoading) return;
    if (isSuccess) {
      const labelObject = data.find((l) => l.id === label);
      labelObject && setCurrentLabel(labelObject);
    }
  }, [label, data]);

  return (
    <span className={`label ${currentLabel.color}`}>{currentLabel.name}</span>
  );
};

import { useQuery } from "@tanstack/react-query";

export const useLabels = () => {
  const labelsQuery = useQuery(["labels"], () =>
    fetch("/api/labels").then((res) => res.json())
  );
  const { data, isLoading, isSuccess } = labelsQuery;
  return { data, isLoading, isSuccess };
};

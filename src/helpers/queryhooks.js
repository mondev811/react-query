import { useQuery } from "@tanstack/react-query";

export const useLabelsData = () => {
  const labelsQuery = useQuery(["labels"], () =>
    fetch("/api/labels").then((res) => res.json())
  );
  const { data, isLoading, isSuccess } = labelsQuery;
  return { data, isLoading, isSuccess };
};

export const useUserData = (userId) => {
  const usersData = useQuery(
    ["users", userId],
    () => {
      return fetch(`api/users/${userId}`).then((res) => res.json());
    },
    {
      staleTime: 5000,
    }
  );

  return usersData;
};

export const useIssuesData = () => {
  const issuesQuery = useQuery(["issues"], () =>
    fetch("/api/issues").then((res) => res.json())
  );

  return issuesQuery;
};

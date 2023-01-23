import { useQuery } from "@tanstack/react-query";

export const useLabelsData = () => {
  const labelsQuery = useQuery(["labels"], () =>
    fetch("/api/labels").then((res) => res.json())
  );

  return labelsQuery;
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

export const useIssuesData = (filters) => {
  const labelsString =
    filters[0] === "*"
      ? ""
      : filters.map((label) => `labels[]=${label}`).join("&");
  const issuesQuery = useQuery({
    queryKey: ["issues", filters],
    queryFn: () => {
      return fetch(`/api/issues?${labelsString}`).then((res) => res.json());
    },
    keepPreviousData: true,
  });

  return issuesQuery;
};

import { useQuery } from "@tanstack/react-query";
import { fetchWithError } from "./fetchWithError";

export const useLabelsData = () => {
  const labelsQuery = useQuery(
    ["labels"],
    () => fetch("/api/labels").then((res) => res.json()),
    {
      staleTime: 1000 * 60 * 60, //one hour
    }
  );

  return labelsQuery;
};

export const useUserData = (userId) => {
  const usersData = useQuery(
    ["users", userId],
    () => {
      return fetch(`/api/users/${userId}`).then((res) => res.json());
    },
    {
      staleTime: 1000 * 60 * 5, //five minutes
    }
  );

  return usersData;
};

export const useIssuesData = (labels, status) => {
  const labelsString =
    labels[0] === "*"
      ? ""
      : labels.map((label) => `labels[]=${label}`).join("&");
  const statusString = status ? `&status=${status}` : "";
  const issuesQuery = useQuery(
    ["issues", { labels, status }],
    () => {
      return fetchWithError(`/api/issues?${labelsString}${statusString}`);
    },
    {
      keepPreviousData: true,
      staleTime: 1000 * 60,
    }
  );

  return issuesQuery;
};

export const useIssueData = (issueNumber) => {
  return useQuery(["issues", issueNumber], () => {
    return fetch(`/api/issues/${issueNumber}`).then((res) => res.json());
  });
};

export const useIssueComments = (issueNumber) => {
  return useQuery(["issues", issueNumber, "comments"], () => {
    return fetch(`/api/issues/${issueNumber}/comments`).then((res) =>
      res.json()
    );
  });
};

export const useSearchData = (searchValue) => {
  return useQuery(
    ["issues", "search", searchValue],
    () => fetch(`api/search/issues?q=${searchValue}`).then((res) => res.json()),
    {
      enabled: !!searchValue.length,
    }
  );
};

import { useQuery } from "@tanstack/react-query";

export const useLabelsData = () => {
  const labelsQuery = useQuery(["labels"], () =>
    fetch("/api/labels").then((res) => res.json())
  );

  return labelsQuery;
};

export const useUserData = (userId) => {
  const usersData = useQuery(["users", userId], () => {
    return fetch(`/api/users/${userId}`).then((res) => res.json());
  });

  return usersData;
};

export const useIssuesData = (labels, status) => {
  const labelsString =
    labels[0] === "*"
      ? ""
      : labels.map((label) => `labels[]=${label}`).join("&");
  const statusString = status ? `&status=${status}` : "";
  const issuesQuery = useQuery({
    queryKey: ["issues", { labels, status }],
    queryFn: () => {
      return fetch(`/api/issues?${labelsString}${statusString}`).then((res) =>
        res.json()
      );
    },
    keepPreviousData: true,
  });

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

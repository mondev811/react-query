import React from "react";
import { useQuery } from "@tanstack/react-query";
import { IssueItem } from "./IssueItem";

export default function IssuesList({ filterByLabel }) {
  const [issuesList, setIssuesList] = React.useState([]);
  const issuesQuery = useQuery(["issues"], () =>
    fetch("/api/issues").then((res) => res.json())
  );
  React.useEffect(() => {
    if (issuesQuery.isLoading) return;
    if (issuesQuery.isSuccess) {
      const filteredList =
        filterByLabel === ""
          ? issuesQuery.data
          : issuesQuery.data.filter((item) => item.labels[0] === filterByLabel);
      setIssuesList(filteredList);
    }
  }, [filterByLabel, issuesQuery.data, issuesQuery.isLoading]);

  return (
    <div>
      <h2>Issues List</h2>
      {issuesQuery.isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="issues-list">
          {issuesList.map((item) => {
            return (
              <IssueItem
                key={item.id}
                title={item.title}
                number={item.number}
                assignee={item.assignee}
                commentCount={item.comments.length}
                createdBy={item.createdBy}
                createdDate={item.createdDate}
                labels={item.labels}
                status={item.status}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
}

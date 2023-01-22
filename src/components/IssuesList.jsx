import React from "react";
import { useIssuesData } from "../helpers/queryhooks";
import { IssueItem } from "./IssueItem";

export default function IssuesList({ filterByLabel }) {
  const { isLoading, isSuccess, data } = useIssuesData();
  const [issuesList, setIssuesList] = React.useState([]);

  React.useEffect(() => {
    if (isLoading) return;
    if (isSuccess) {
      const filteredList =
        filterByLabel === ""
          ? data
          : data.filter((item) => item.labels[0] === filterByLabel);
      setIssuesList(filteredList);
    }
  }, [filterByLabel, data, isLoading]);

  return (
    <div>
      <h2>Issues List</h2>
      {isLoading ? (
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

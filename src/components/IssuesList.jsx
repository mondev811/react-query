import React from "react";
import { useIssuesData } from "../helpers/queryhooks";
import { IssueItem } from "./IssueItem";

export default function IssuesList({ filters, status }) {
  const { isLoading, isSuccess, data } = useIssuesData(filters, status);
  return (
    <div>
      <h2>Issues List</h2>
      {isLoading && <p>Loading issues...</p>}
      {isSuccess && (
        <ul className="issues-list">
          {data.map((item) => {
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

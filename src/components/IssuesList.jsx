import { useQuery } from "@tanstack/react-query";
import { IssueItem } from "./IssueItem";

export default function IssuesList() {
  const issuesQuery = useQuery(["issues"], () =>
    fetch("/api/issues").then((res) => res.json())
  );
  return (
    <div>
      <h2>Issues List</h2>
      {issuesQuery.isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="issues-list">
          {issuesQuery.data.map((item) => {
            console.log("item: ", item);
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

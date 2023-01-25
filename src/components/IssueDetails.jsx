import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useUserData } from "../helpers/queryhooks";
import { relativeDate } from "../helpers/relativeDate";

const useIssueData = (issueNumber) => {
  return useQuery(["issues", issueNumber], () => {
    return fetch(`/api/issues/${issueNumber}`).then((res) => res.json());
  });
};

const Comment = ({ comment }) => {
  const userId = comment.createdBy;
  const creator = useUserData(userId);
  if (creator.isSuccess) {
    return (
      <div className="comment">
        <img src="" alt="Commenter avatar" />
        <div>
          <div className="comment-header">
            {`${creator.data.name} commented ${relativeDate(
              comment.createdDate
            )}`}
          </div>
          <div className="comment-body">{comment.comment}</div>
        </div>
      </div>
    );
  }
};

export default function IssueDetails() {
  const { number } = useParams();
  const { data, isLoading, isSuccess } = useIssueData(number);

  const commentsQuery = useQuery(["issues", number, "comments"], () => {
    return fetch(`/api/issues/${number}/comments`).then((res) => res.json());
  });

  if (isLoading) return <p>Loading...</p>;
  if (isSuccess)
    return (
      <div className="issue-details">
        <header>
          <h2>
            {data.title}
            <span>{` # ${data.number}`}</span>
          </h2>
          <div>
            <span className="open">{data.status}</span>
            <span className="created-by">{data.createdBy}</span>
            {"opened this issue "}
            {relativeDate(data.createdDate)}
            {" . "}
            {data.comments.length}
            {" comments"}
          </div>
        </header>
        <main>
          <section>
            {commentsQuery.isSuccess &&
              commentsQuery.data.map((c) => {
                return <p>{c.comment}</p>;
              })}
          </section>
        </main>
      </div>
    );
}

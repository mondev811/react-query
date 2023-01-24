import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { relativeDate } from "../helpers/relativeDate";

const useIssueData = (issueNumber) => {
  return useQuery(["issues", issueNumber], () => {
    return fetch(`/api/issues/${issueNumber}`).then((res) => res.json());
  });
};

const Comment = ({ issueNumber, commentId }) => {
  console.log(commentId);
  const commentsQuery = useQuery(["issues", issueNumber, "comments"], () => {
    return fetch(`/api/issues/${issueNumber}/comments`).then((res) =>
      res.json()
    );
  });

  if (commentsQuery.isLoading) return <p>Loading comments...</p>;
  if (commentsQuery.isSuccess) {
    const comment = commentsQuery.data.find((c) => c.id === commentId);
    console.log(commentsQuery.data);
    return (
      <div className="comment">
        <img src="" alt="Commenter avatar" />
        <div>
          <div className="comment-header"></div>
          <div className="comment-body">{comment && comment.comment}</div>
        </div>
      </div>
    );
  }
};
export default function IssueDetails() {
  const { number } = useParams();
  const { data, isLoading, isSuccess } = useIssueData(number);

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
            {/* {data.comments.map((commentId) => ( */}
            <Comment
              issueNumber={number}
              commentId={data.comments[0]}
              key={data.comments[0]}
            />
            {/* ))} */}
          </section>
        </main>
      </div>
      // }
    );
}

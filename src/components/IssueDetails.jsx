import { useParams } from "react-router-dom";
import { useIssueComments, useIssueData } from "../helpers/queryhooks";
import { Comment } from "./Comment";
import { IssueHeader } from "./IssueHeader";

export default function IssueDetails() {
  const { number } = useParams();
  const { data, isLoading, isSuccess } = useIssueData(number);
  const commentsQuery = useIssueComments(number);

  if (isLoading) return <p>Loading...</p>;
  if (isSuccess)
    return (
      <div className="issue-details">
        <IssueHeader {...data} />
        <main>
          <section>
            {commentsQuery.isSuccess &&
              commentsQuery.data.map((comment) => {
                return <Comment key={comment.id} {...comment} />;
              })}
          </section>
        </main>
      </div>
    );
}

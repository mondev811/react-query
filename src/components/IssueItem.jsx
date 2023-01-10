import { GoComment, GoIssueOpened } from "react-icons/go";
import { relativeDate } from "../helpers/relativeDate";

export const IssueItem = ({
  title,
  number,
  assignee,
  commentCount,
  createdBy,
  createdDate,
  labels,
  status,
}) => {
  return (
    <li>
      <div>
        <GoIssueOpened style={{ color: "green" }} />
      </div>
      <div className="issue-content">
        <span>
          <a href="">{title}</a>
          <span className="label">{labels}</span>
        </span>
        <small>
          #{number} opened {relativeDate(createdDate)} by {createdBy}
        </small>
      </div>
      <span className="comment-count">
        <GoComment />
        {commentCount}
      </span>
    </li>
  );
};

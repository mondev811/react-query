import { GoComment, GoIssueOpened } from "react-icons/go";
import { relativeDate } from "../helpers/relativeDate";
import { useUserData } from "../helpers/useUserData";

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
  const assigneeUser = useUserData(assignee);
  const createdByUser = useUserData(createdBy);
  return (
    <li>
      <div>
        {status === "done" || status === "cancelled" ? (
          <GoIssueClosed style={{ color: "red" }} />
        ) : (
          <GoIssueOpened style={{ color: "green" }} />
        )}
      </div>
      <div className="issue-content">
        <span>
          <a href={`/issue/${number}`}>{title}</a>
          {labels.map((label) => (
            <span key={label} className={`label red`}>
              {label}
            </span>
          ))}
        </span>
        <small>{`#${number} opened ${relativeDate(createdDate)} by 
       ${createdByUser.isSuccess ? createdByUser.data.name : ""}`}</small>
      </div>
      {assignee &&
        assigneeUser.isSuccess &&
        assigneeUser.data.profilePictureUrl && (
          <img
            className="assigned-to"
            src={assigneeUser.data.profilePictureUrl}
            alt="Assigned to avatar"
          />
        )}
      <span className="comment-count">
        <GoComment />
        {commentCount}
      </span>
    </li>
  );
};

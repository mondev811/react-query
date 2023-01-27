import { Link } from "react-router-dom";
import { GoComment, GoIssueOpened, GoIssueClosed } from "react-icons/go";
import { relativeDate } from "../helpers/relativeDate";
import { useUserData, useLabelsData } from "../helpers/queryhooks";
import { Label } from "../components/Label";
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
  const labelObjects = useLabelsData();
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
          <Link to={`/issue/${number}`}>{title}</Link>
          {labelObjects.isSuccess &&
            labels.map((label) => {
              const labelObj = labelObjects.data.find((l) => l.id === label);
              return <Label label={labelObj} key={labelObj.id} />;
            })}
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

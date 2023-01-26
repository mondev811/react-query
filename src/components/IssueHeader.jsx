import { GoIssueOpened, GoIssueClosed } from "react-icons/go";
import { possibleStatus } from "../helpers/defaultData";
import { useUserData } from "../helpers/queryhooks";
import { relativeDate } from "../helpers/relativeDate";

export const IssueHeader = ({
  title,
  number,
  status = "todo",
  createdBy,
  createdDate,
  comments,
}) => {
  const createdByUser = useUserData(createdBy);
  return (
    <header>
      <h2>
        {title}
        <span>{` # ${number}`}</span>
      </h2>
      <div>
        <span
          className={
            status === "done" || status === "cancelled" ? "closed" : "open"
          }
        >
          {status === "done" || status === "cancelled" ? (
            <GoIssueClosed />
          ) : (
            <GoIssueOpened />
          )}
          {possibleStatus.find((s) => s.id === status)?.label}
        </span>
        <span className="created-by">
          {createdByUser.isLoading ? "..." : createdByUser.data.name}
        </span>
        {"opened this issue "}
        {relativeDate(createdDate)}
        {" · "}
        {comments.length}
        {" comments"}
      </div>
    </header>
  );
};

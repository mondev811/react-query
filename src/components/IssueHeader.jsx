import { relativeDate } from "../helpers/relativeDate";

export const IssueHeader = ({
  title,
  number,
  status,
  createdBy,
  createdDate,
  comments,
}) => {
  return (
    <header>
      <h2>
        {title}
        <span>{` # ${number}`}</span>
      </h2>
      <div>
        <span className="open">{status}</span>
        <span className="created-by">{createdBy}</span>
        {"opened this issue "}
        {relativeDate(createdDate)}
        {" . "}
        {comments.length}
        {" comments"}
      </div>
    </header>
  );
};

import { useUserData } from "../helpers/queryhooks";
import { relativeDate } from "../helpers/relativeDate";

export const Comment = ({ createdDate, createdBy, comment }) => {
  const creator = useUserData(createdBy);

  if (creator.isLoading) return null;
  if (creator.isSuccess)
    return (
      <div className="comment">
        <img
          src={creator.data.profilePictureUrl}
          alt={`Commenter ${creator.data.name} avatar`}
        />
        <div>
          <div className="comment-header">
            <span>{creator.data.name}</span>
            {` commented `}
            <span>{relativeDate(createdDate)}</span>
          </div>
          <div className="comment-body">{comment}</div>
        </div>
      </div>
    );
};

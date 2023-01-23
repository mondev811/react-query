export const Label = ({ label }) => {
  return <span className={`label ${label.color}`}>{label.name}</span>;
};

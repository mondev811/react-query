import React from "react";

const possibleStatus = [
  { id: "backlog", label: "Backlog" },
  { id: "todo", label: "Todo" },
  { id: "inProgress", label: "In progress" },
  { id: "done", label: "Done" },
  { id: "cancelled", label: "Cancelled" },
];
export const StatusSelect = ({ value, onChange }) => {
  return (
    <>
      <select value={value} onChange={onChange} className="status-select">
        <option value="">Select a status to filter</option>
        {possibleStatus.map((s) => (
          <option value={s.id}>{s.label}</option>
        ))}
      </select>
    </>
  );
};

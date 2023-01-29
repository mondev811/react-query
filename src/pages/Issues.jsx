import React from "react";
import IssuesList from "../components/IssuesList";
import LabelList from "../components/LabelList";
import { Link } from "react-router-dom";

export default function Issues() {
  const [labelsSelected, setLabelsSelected] = React.useState(["*"]);
  const [status, setStatus] = React.useState("");
  return (
    <div>
      <main>
        <section>
          <h1>Issues</h1>
          <IssuesList filters={labelsSelected} />
        </section>
        <aside>
          <LabelList
            labelsSelected={labelsSelected}
            setLabelsSelected={setLabelsSelected}
          />
          <h3>Status</h3>
          <StatusSelect
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          />
          <hr />
          <Link
            to="/add"
            className={"button"}
            onClick={() => console.log("clicked")}
          >
            Add Issue
          </Link>
        </aside>
      </main>
    </div>
  );
}

const StatusSelect = ({ value, onChange }) => {
  return (
    <>
      <select value={value} onChange={onChange} className="status-select">
        <option value>Select a status to filter</option>
        <option value="backlog">Backlog</option>
        <option value="todo">Todo</option>
        <option value="inProgress">In progress</option>
        <option value="done">Done</option>
        <option value="cancelled">Cancelled</option>
      </select>
    </>
  );
};

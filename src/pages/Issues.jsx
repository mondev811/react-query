import React from "react";
import IssuesList from "../components/IssuesList";
import LabelList from "../components/LabelList";
import { Link } from "react-router-dom";
import { StatusSelect } from "./StatusSelect";

export default function Issues() {
  const [labelsSelected, setLabelsSelected] = React.useState(["*"]);
  const [status, setStatus] = React.useState("");
  return (
    <div>
      <main>
        <section>
          <h1>Issues</h1>
          <IssuesList filters={labelsSelected} status={status} />
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

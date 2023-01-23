import React from "react";
import IssuesList from "../components/IssuesList";
import LabelList from "../components/LabelList";
export default function Issues() {
  const [labelsSelected, setLabelsSelected] = React.useState(["*"]);

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
        </aside>
      </main>
    </div>
  );
}

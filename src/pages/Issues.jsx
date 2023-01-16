import React from "react";
import IssuesList from "../components/IssuesList";
import LabelList from "../components/LabelList";

export default function Issues() {
  const [labelSelected, setLabelSelected] = React.useState("");

  return (
    <div>
      <main>
        <section>
          <h1>Issues</h1>
          <IssuesList filterByLabel={labelSelected} />
        </section>
        <aside>
          <LabelList setLabelSelected={setLabelSelected} />
        </aside>
      </main>
    </div>
  );
}

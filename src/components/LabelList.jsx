import { useQuery } from "@tanstack/react-query";

export default function LabelList({ setLabelSelected }) {
  const labelsQuery = useQuery(["labels"], () =>
    fetch("/api/labels").then((res) => res.json())
  );

  return (
    <>
      {labelsQuery.isLoading && <p>Loading labels...</p>}
      {labelsQuery.isSuccess && (
        <div className="labels">
          <h3>Labels</h3>
          <ul>
            {labelsQuery.data.map((label) => {
              return (
                <li key={label.id}>
                  <button
                    className={label.color}
                    onClick={() => setLabelSelected(label.id)}
                  >
                    {label.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}

import { useLabels } from "../helpers/useLabels";

export default function LabelList({ setLabelSelected }) {
  const { data, isLoading, isSuccess } = useLabels();

  return (
    <>
      {isLoading && <p>Loading labels...</p>}
      {isSuccess && (
        <div className="labels">
          <h3>Labels</h3>
          <ul>
            {data.map((label) => {
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

import { useLabelsData } from "../helpers/queryhooks";

export default function LabelList({ labelsSelected, setLabelsSelected }) {
  const { data, isLoading, isSuccess } = useLabelsData();

  const updateLabelsSelected = (labelId) => {
    if (labelsSelected.includes(labelId)) {
      const updated =
        labelsSelected.length === 1
          ? ["*"]
          : labelsSelected.filter((l) => l !== labelId);
      setLabelsSelected(updated);
    } else {
      const updated = labelsSelected.filter((l) => l !== "*");
      setLabelsSelected([...updated, labelId]);
    }
  };

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
                    className={
                      labelsSelected.includes(label.id)
                        ? `selected ${label.color}`
                        : `${label.color}`
                    }
                    onClick={() => updateLabelsSelected(label.id)}
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

import { pr_ICR17 } from "../pr_ICR17";

function Sidebar({ id }) {
  const prData = pr_ICR17.pr_data;
  const dates = Object.keys(prData);

  if (!id) {
    return (
      <aside className="w-full md:w-80 bg-white p-4 border-l h-full">
        <p className="text-gray-500 text-center mt-10">
          No asset selected
        </p>
      </aside>
    );
  }

  return (
    <aside className="w-full md:w-80 bg-white p-4 border-l h-full overflow-y-auto pt-20">
      <h2 className="font-semibold mb-4 text-center md:text-left">
        PR Time Series for <span className="font-bold">{id}</span>
      </h2>

      {/* Table Header */}
      <div className="flex border-y font-semibold text-sm">
        <div className="w-1/2 border-r p-1">Date</div>
        <div className="w-1/2 p-1 text-right">PR Value</div>
      </div>

      {/* Table Rows */}
      {dates.map((date) => {
        const value = prData[date][id];

        return (
          <div
            key={date}
            className="flex border-b text-sm hover:bg-gray-50"
          >
            <div className="w-1/2 border-r p-1">{date}</div>
            <div className="w-1/2 p-1 text-right">
              {isNaN(value) ? "N/A" : value.toFixed(6)}
            </div>
          </div>
        );
      })}
    </aside>
  );
}

export default Sidebar;

import { useState } from "react";
import { pr_ICR17 } from "../pr_ICR17";

function Slider({ setDate }) {
  const dates = Object.keys(pr_ICR17.pr_data);
  const [index, setIndex] = useState(0);

  const handleChange = (e) => {
    const newIndex = Number(e.target.value);
    setIndex(newIndex);
    setDate(dates[newIndex]);
  };

  return (
    <section className="fixed top-14 left-0 w-full bg-white border-b z-10 px-4 py-2">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-3">
        
        <label className="font-medium whitespace-nowrap">
          Date:
        </label>

        <input
          type="range"
          min={0}
          max={dates.length - 1}
          value={index}
          onChange={handleChange}
          className="w-full md:flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />

        <span className="font-semibold text-sm md:text-base min-w-[120px] text-center">
          {dates[index]}
        </span>
      </div>
    </section>
  );
}

export default Slider;

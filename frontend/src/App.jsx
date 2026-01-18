import { useState } from "react";
import Heading from "./Components/Heading.jsx";
import Slider from "./Components/Slider.jsx";
import AssetsMap from "./Components/AssetsMap.jsx";
import Sidebar from "./Components/Sidebar.jsx";
import Scale from "./Components/Scale.jsx";

function App() {
  const [date, setDate] = useState("2024-08-01");
  const [id, setId] = useState("");

  return (
    <div className="h-screen w-screen overflow-hidden">
      <Heading /> <Slider setDate={setDate} /> {/* MAIN CONTENT */} <div className="flex h-[84vh] pt-[6vh]"> {/* MAP AREA */} <div className="flex-1 relative pt-20"> <AssetsMap date={date} setId={setId} /> <Scale /> </div> {/* SIDEBAR — hidden on mobile */} <div className="hidden md:block w-[320px] border-l bg-white"> <Sidebar id={id} /> </div> </div>
    </div>
  );
}


export default App;
import { useState } from "react";
import { ImCross } from "react-icons/im";
import { GoogleGenAI } from "@google/genai";

import { pr_ICR17 } from "../pr_ICR17";
import img from "../assets/img.png";

function Heading() {
  const [analysisText, setAnalysisText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generateAnalysisPrompt = () => {
    const data = pr_ICR17.pr_data;
    const dates = Object.keys(data).sort().slice(-5);

    let formattedData = "";

    dates.forEach((date, index) => {
      formattedData += `Day ${index + 1}`;
      Object.entries(data[date]).forEach(([key, value]) => {
        formattedData += `, ${key}: ${
          isNaN(value) ? "N/A" : Number(value.toFixed(6))
        }`;
      });
      formattedData += "\n";
    });

    return `
You are an AI observability assistant for a solar power plant.

I am providing performance ratio (PR) values over the last 5 days.
Higher PR means better performance.

Your task:
1. Group PR values by asset ID.
2. Analyze the 5-day trend.
3. Detect anomalies such as sudden drops, sustained degradation, or unusual recovery.
4. Explain anomalies and suggest possible causes.
5. If no anomaly exists, state performance is normal.

Instructions:
- Do not use stars
- Start each sentence on a new line
- Use concise operational language
- Do not repeat raw data

Data:
${formattedData}
`;
  };

  const handleAIAnalysis = async () => {
    try {
      setIsLoading(true);
      setAnalysisText("Analyzing performance...");

      const ai = new GoogleGenAI({
        apiKey: "AIzaSyBJ_W6UD0Xnsxp3Y9zU2zUd-OXIR6gxYrM",
      });

      const prompt = generateAnalysisPrompt();

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      setAnalysisText(response.text);
    } catch (error) {
      console.error(error);
      setAnalysisText("Failed to generate analysis. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full h-14 bg-gray-200 flex items-center justify-between px-4 md:px-6 z-20">
        <h1 className="text-lg md:text-2xl font-semibold">
          Solar PV Performance (ICR 17)
        </h1>

        <button
          onClick={handleAIAnalysis}
          className="flex items-center gap-2 hover:opacity-80 transition"
        >
          <img
            src={img}
            alt="AI Assistant"
            className="h-9 w-9 rounded-full"
          />
          <span className="hidden md:block font-medium">
            AI Support
          </span>
        </button>
      </header>

      {/* AI PANEL */}
      {analysisText && (
        <div className="fixed top-16 right-2 md:right-6 w-[90%] md:w-96 max-h-[60vh] bg-white border rounded-lg shadow-lg p-4 overflow-y-auto z-30">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold">AI Analysis</h2>
            <ImCross
              className="cursor-pointer"
              onClick={() => setAnalysisText("")}
            />
          </div>

          <p className="text-sm whitespace-pre-line">
            {isLoading ? "Loading..." : analysisText}
          </p>
        </div>
      )}
    </>
  );
}

export default Heading;

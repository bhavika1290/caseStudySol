# How to Run the Project

## Prerequisites

Make sure you have the following installed:

* Node.js (v18 or above recommended)
* npm or yarn

## Steps to Run Locally

```bash
# Clone the repository
git clone caseStudy

# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev

# Navigate to backend
cd backend

# Install dependencies
npm install

# Start the development server
node server.js

```

After running the above commands, open your browser and visit:

```http://localhost:5173
```

## **Assumptions**

* The system assumes that the imported data files are well-structured JSON objects with consistent keys for dates and PR values.
* Assets will have unique IDs that do not change over time.
* The environment has a modern browser capable of rendering SVGs and running JavaScript efficiently.
* The user has a stable internet connection for any AI integration that might require API access.
* Slider and AI Insights Agent behavior assumes that at least 5 days of data are available for meaningful insights.

## How the System Works

### 1. Asset Map Rendering

* Asset regions are rendered as SVG polygons.
* Coordinates are dynamically scaled to fit the SVG container using calculated bounds.
* Each asset is color-coded based on its PR value.

### 2. Color Mapping

* PR values are normalized between global minimum and maximum.
* A red → green gradient represents low to high performance.
* Missing data is visually distinguished by grey color.

### 3. Time Slider

* A range slider allows users to switch between dates.
* **Dynamic Dates Handling**: The slider input is dynamically generated based on the imported dates file. All dates are extracted into a list using the keys attribute of the object, and the length of this array sets the maximum value of the slider. This ensures that the slider range is never hard-coded and automatically adapts when new dates (e.g., `pr_ICR17_2025.js`) are added.
* Changing the date updates asset colors in real time.

### 4. Interaction

* Hovering over an asset shows a tooltip with asset ID and PR value.
* Clicking an asset (on larger screens) updates the time-series view.

### 5. Responsiveness

* Desktop/Tablet: Map + time-series panel.
* Mobile: Only the SVG map is visible to ensure clarity and usability.

### 6. Backend

* It has only one take of calling to llm to get the ai suggestions
  
## Design Choices & Rationale

### Responsive Layout

* Tailwind CSS breakpoints (md, lg) are used instead of JavaScript-based media detection.
* Sidebar panels are hidden on smaller screens to avoid clutter.

### SVG-Based Visualization

* SVG provides scalability, performance, and precise control over interactions.
* ResizeObserver ensures the SVG always fits its container.

### Separation of Concerns

* Utility functions (scaling, bounds calculation) are kept outside components.
* Visualization logic is decoupled from layout logic.
* Backend and frontend logics are seperated .The frontend is displaying the ui while the backend is calling the llm for ai suggestions

### Performance Optimization

* useMemo is used for expensive calculations like bounds and min/max PR.
* Re-renders are minimized by observing container size changes only.

### UX Considerations

* Tooltips follow cursor position for better readability.
* Smooth transitions and hover states improve interaction feedback.
* Mobile users are shown only essential visual data.

## **C1. Data Scalability & Ingestion**

* The system can handle external injection of new data by dynamically generating the slider range from the imported dates file.
* When new dates (e.g., `pr_ICR17_2025.js`) are added, all dates are extracted into a list using the keys of the object.
* The length of this array automatically sets the maximum value of the input slider, ensuring the system adapts without any hard-coded date ranges.

## **C2. AI-Driven Insights Agent**

* We have integrated a chatbot in the header section to serve as the AI Insights Agent.
* The system provides the last 5 days of data to the LLM, which predicts anomalies or significant changes in asset performance and also tells the reason for the change happended.
* Example: If ID X drops 15% in performance over the last 3 days, the agent highlights this in an insight panel and tells the reason for it.
* This approach demonstrates how an AI assistant can be woven into a standard dashboard UI by calling the backend.

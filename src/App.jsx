import React, { useState } from "react";
import { addDays, format, isWithinInterval, nextDay } from "date-fns";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const App = () => {
  const [startDate, setStartDate] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState("Monday");
  const [count, setCount] = useState(1);
  const [viewStart, setViewStart] = useState("");
  const [viewEnd, setViewEnd] = useState("");
  const [instances, setInstances] = useState([]);

  const generateInstances = () => {
    const instances = [];
    let currentDate = new Date(startDate);

    // Get first occurrence
    currentDate = nextDay(currentDate, daysOfWeek.indexOf(dayOfWeek));

    for (let i = 0; i < count; i++) {
      instances.push(currentDate);
      currentDate = addDays(currentDate, 7);
    }

    const viewWindow = {
      start: new Date(viewStart),
      end: new Date(viewEnd),
    };

    const filtered = instances.filter((d) => isWithinInterval(d, viewWindow));

    setInstances(filtered);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Recurring Event Generator</h1>

      <div className="grid grid-cols-1 gap-4 mb-4">
        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border p-2 w-full"
          />
        </label>

        <label>
          Day of Week:
          <select
            value={dayOfWeek}
            onChange={(e) => setDayOfWeek(e.target.value)}
            className="border p-2 w-full"
          >
            {daysOfWeek.map((day) => (
              <option key={day}>{day}</option>
            ))}
          </select>
        </label>

        <label>
          Number of Occurrences:
          <input
            type="number"
            min="1"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="border p-2 w-full"
          />
        </label>

        <label>
          View Start:
          <input
            type="date"
            value={viewStart}
            onChange={(e) => setViewStart(e.target.value)}
            className="border p-2 w-full"
          />
        </label>

        <label>
          View End:
          <input
            type="date"
            value={viewEnd}
            onChange={(e) => setViewEnd(e.target.value)}
            className="border p-2 w-full"
          />
        </label>

        <button
          onClick={generateInstances}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Generate Events
        </button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Event Instances:</h2>
        <ul className="list-disc pl-5">
          {instances.map((d, idx) => (
            <li key={idx}>{format(d, "yyyy-MM-dd")}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;

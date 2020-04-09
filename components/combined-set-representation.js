const React = require('react');
const d3 = Object.assign(
  {},
  require("../node_modules/d3/dist/d3.js"),
  require("../node_modules/d3-scale/build/d3-scale.js"),
  );


const CombinedSetRepresentation = ({timeA, timeB, eventsA, eventsB, updateProps}) => {

  const filteredEvents = [];
  for (const e of eventsA) {
    if (timeA >= e["t"]) {
      filteredEvents.push(e);
    }
  }

  for (const e of eventsB) {
    if (timeB >= e["t"]) {
      filteredEvents.push(e);
    }
  }

  const results = new Set();
  const removeSet = new Set();

  for (const e of filteredEvents) {
    if (e["o"] == "added") {
      results.add(e["id"]);
    }
    if (e["o"] == "removed") {
      removeSet.add(e["id"]);
    }
  }

  for (const r of Array.from(removeSet)) {
    results.delete(r);
  }

  return (
    <div className="mt-6">
      <div className="pl-2">timeA@{timeA} timeB@{timeB}</div>
      <div className="flex flex-row">
      <div className="w-1/2 m-2 border border-gray-400 rounded p-2">
        {Array.from(results).sort().map((x) => {
          return (
            <span key={x}
              className="text-3xl"
              onClick={() => remove(x)}
            >{ x }</span>
          )
        })}
      </div>
      <div className="w-1/2 m-2 border border-red-400 rounded p-2">
        {Array.from(removeSet).sort().map((x) => {
          return (
            <span key={x}
              className="text-3xl"
              onClick={() => remove(x)}
            >{ x }</span>
          )
        })}
      </div>
      </div>
    </div>
  );
}

module.exports = CombinedSetRepresentation;

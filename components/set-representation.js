const React = require('react');
const d3 = Object.assign(
  {},
  require("../node_modules/d3/dist/d3.js"),
  require("../node_modules/d3-scale/build/d3-scale.js"),
  );


const SetRepresentation = ({time, events, updateProps}) => {
  const filteredEvents = [];
  for (const e of events) {
    if (time >= e["t"]) {
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
    <div className="w-64">
      <div className="pl-2">time@{time}</div>
      <div className="m-2 border border-gray-400 rounded p-2 h-16">
        {Array.from(results).sort().map((x) => {
          return (
            <span key={x}
              className="text-3xl"
              onClick={() => remove(x)}
            >{ x }</span>
          )
        })}
      </div>
    </div>
  );
}

module.exports = SetRepresentation;

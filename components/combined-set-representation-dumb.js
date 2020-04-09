const React = require('react');
const d3 = Object.assign(
  {},
  require("../node_modules/d3/dist/d3.js"),
  require("../node_modules/d3-scale/build/d3-scale.js"),
  );


const CombinedSetRepresentationDumb = ({timeA, timeB, eventsA, eventsB, updateProps}) => {

  let allEvents = eventsA.concat(eventsB).sort((a,b) => a["t"] - b["t"]);

  const results = new Set();

  for (const e of allEvents) {
    if (e["o"] == "added") {
      results.add(e["id"]);
    }
    if (e["o"] == "removed") {
      results.delete(e["id"]);
    }
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
      </div>
    </div>
  );
}

module.exports = CombinedSetRepresentationDumb;

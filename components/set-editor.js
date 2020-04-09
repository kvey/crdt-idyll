const React = require('react');
const d3 = Object.assign(
  {},
  require("../node_modules/d3/dist/d3.js"),
  require("../node_modules/d3-scale/build/d3-scale.js"),
);


var emoji = ["🍇", "🍈", "🍉", "🍌", "🍎", "🥑", "🥦"];

const SetEditor = ({events, time, updateProps}) => {
  const [maxTime, setMaxTime] = React.useState(d3.max(events.map((e) => e["t"])));

  React.useEffect(() => {
    setMaxTime(d3.max(events.map((e) => e["t"])))
  }, [events]);

  const [inc, setInc] = React.useState(maxTime + 1, [maxTime]);

  const add = (e) => {
    updateProps({events: events.concat([{o: "added", t: inc, id: e}])})
    setInc(inc + 1);
  }

  const remove = (e) => {
    updateProps({events: events.concat([{o: "removed", t: inc, id: e}])})
    setInc(inc + 1);
  }

  // Derive representation of set
  const results = new Set();
  const removeSet = new Set();

  for (const e of events) {
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
      {emoji.map((e) => (
        <span className="border rounded p-1 m-1" onClick={() => add(e)}>
          +{e}
        </span>
      ))}
      time@{maxTime}
      <div className="m-2 border border-gray-400 rounded p-2">
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

module.exports = SetEditor;

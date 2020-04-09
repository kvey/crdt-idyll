const React = require('react');
const d3 = Object.assign(
  {},
  require("../node_modules/d3/dist/d3.js"),
  require("../node_modules/d3-scale/build/d3-scale.js"),
  );

// https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const SetEventEditor = ({time, events, showShuffle, updateProps}) => {
  const [inc, setInc] = React.useState(d3.max(events.map((e) => e["t"])) + 1);
  const [, updateState] = React.useState();

  const toggleAddRemove = (events, i) => {
    if (events[i]["o"] == "added") {
      events[i]["o"] = "removed"
    } else {
      events[i]["o"] = "added"
    }
    updateProps({events: events.slice() })
    updateState({})
  }

  const shuffleEvents = () => {
    let newEvents = [...events];
    while (JSON.stringify(events) == JSON.stringify(newEvents)) {
      newEvents = shuffle(newEvents);
    }
    for (const [i, e] of newEvents.entries()) {
      e["t"] = i + 1;
    }
    updateProps({events: newEvents.slice() })
  }

  return (
    <div className="mt-2">
      {showShuffle &&
       <button className="border p-1 ml-2 rounded border-gray-400" onClick={() => shuffleEvents()}> Shuffle </button>
      }
      <div className="flex flex-row flex-wrap">
        {events.map((x, i) => {
          return (
            <div className={"m-2 border-2 border-gray-400 rounded p-2 flex justify-between content-end " + (time >= x["t"] ? "border-blue-400 bg-blue-200" : "")}
              onClick={() => toggleAddRemove(events, i) }
            >
              <span className="text-xl">{x["o"]}</span>
              <span className="text-xl" >{ x["id"] }</span>
            </div>
          )
        })}
      </div>
    </div>
  );
}

module.exports = SetEventEditor;

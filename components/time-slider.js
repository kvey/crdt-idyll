const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = Object.assign({},
                         require("../node_modules/d3/dist/d3.js"),
                         require("../node_modules/d3-selection/dist/d3-selection.js"),
                         require("../node_modules/d3-simple-slider/dist/d3-simple-slider.js"));

class TimeSlider extends D3Component {
  initialize(node, {size, value, events, timestampedEvents, updateProps}) {

    let data = [0,1,2,3,4,5]
    if (size) {
      data = []
      for (let i = 1; i <= size; i++) {
        data.push(i)
      }
    }
    this.timestampedEvents = timestampedEvents;

    var sliderStep = d3
      .sliderBottom()
      .min(d3.min(data))
      .max(d3.max(data))
      .width(400)
      .ticks(data.length)
      .step(1)
      .default(5)
      .displayValue(true)
      .on('onchange', val => {
        this.value = val
        // Annotate events with a timestamp for execution order
        const updatedEvents = []
        for (const [i, event] of events.entries()) {
          let updatedEvent = {...event};
          if (this.timestampedEvents[i] !== undefined) {
            updatedEvent = {...this.timestampedEvents[i]};
          }
          if (event["t"] == val) {
            updatedEvent["timestamp"] = new Date();
          } else if (event["t"] > val) {
            updatedEvent["timestamp"] = undefined;
          }
          this.timestampedEvents[i] = updatedEvent;
          updatedEvents.push(updatedEvent);
        }
        updateProps({value: this.value, timestampedEvents: updatedEvents})
      });

    this.sliderStep = sliderStep;
    this.value = value;

    const setValue = (v) => {
      this.value = v;
      sliderStep.value(this.value);
      updateProps({value: v})
    }

    const progress = () => {
      setValue(this.value);
      if (this.value < d3.max(data)) {
        this.value++;
      }
    }

    let interval = undefined;

    const play = () => {
      if (this.value == d3.max(data)) {
        reset();
      }
      clearInterval(interval)
      interval = setInterval(progress, 1000);
    }

    const pause = () => {
      clearInterval(interval)
    }

    const reset = () => {
      setValue(0);
    }

    const playButton = d3
      .select(node)
      .append('button')
      .text("Play")
      .attr('class', 'p-2 text-blue-500')
      .on('click', () => {
        if (playButton.text() == "Play") {
          playButton.text("Pause");
          progress();
          play()
        } else {
          playButton.text("Play");
          pause();
        }
      })

    const resetButton = d3
      .select(node)
      .append('button')
      .text("Reset")
      .attr('class', 'p-2 text-blue-500')
      .on('click', () => {
        playButton.text("Play");
        pause();
        reset();
      })

    d3.select(node).attr("class", "flex flex-row mt-2");

    const svg = (this.svg = d3.select(node).append('svg'));
    var gStep = svg
      .attr('width', 500)
      .attr('height', 100)
      .append('g')
      .attr('transform', 'translate(30,30)');

    gStep.call(sliderStep);

  }

  update(props, oldProps) {
    this.sliderStep.value(props.value)
  }
}

module.exports = TimeSlider;

import Stopwatch from "./components/utility/Stopwatch";
import "./stylesheets/style.scss";

const element = document.getElementById("action");
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const laps = document.getElementById("laps");

const watch = new Stopwatch(element);

start.addEventListener("click", () => {
    watch.start();
});

stop.addEventListener("click", () => {
    watch.stop();
});

laps.addEventListener("click", () => {
    watch.laps();
});
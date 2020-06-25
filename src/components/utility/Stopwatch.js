import stopwatchStore, { stopwatch_action } from './../app/index';
import UpdateDOM from "./updateDom";
let id = 0;

export default class Stopwatch extends UpdateDOM {
    constructor(element) {
        super(element);
        this.time = ["00", "00", "00"];
        this.lap = { time: null };
        this.id = null;
        this.lapsId = 1;
        this.currentLaps = [];
    };

    getTime(time) {
        this.time = time;
    }

    getId() {
        const ids = ++id;
        this.id = ids;
    }

    setLaps(val) {
        this.lap.time = val;
    }

    start() {
        if (stopwatchStore.getState().stopwatch.active) {
            throw new Error("Stopwatch is already started!");
        } else {
            const startTime = new Date();
            this.getId();
            stopwatchStore.dispatch(stopwatch_action.activeStopwatch());
            let updateTime = UpdateDOM.updateTime;
            let UpdatesDom = this.updateDOM;
            let element = this.element;
            let setTime = this.getTime.bind(this);
            let currentLap = this.setLaps.bind(this);
            setup();

            function c() {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        const c = new Date();
                        let currentDate = Math.ceil((c - startTime - 1000) / 1000);
                        resolve({ currentDate });
                    }, 1000);
                });
            }

            async function setup() {
                await c().then(date => {
                    if (stopwatchStore.getState().stopwatch.active) {
                        let changeTime = updateTime(date.currentDate);
                        UpdatesDom(element, changeTime);
                        setTime(changeTime);
                        currentLap(changeTime);
                        setup();
                    }
                })
            }
        }
    }

    saveToDatabase(data, currentLaps) {
        stopwatchStore.dispatch(stopwatch_action.addSaved({
            id: this.id,
            totalTime: data.stopwatch.time,
            laps: currentLaps
        }));
    }


    stop() {
        if (stopwatchStore.getState().stopwatch.active) {
            stopwatchStore.dispatch(stopwatch_action.stopStopwatch());
            this.updateDOM(this.element, ["00", "00", "00"]);
            stopwatchStore.dispatch(stopwatch_action.addTime({
                time: this.time
            }));
            this.saveToDatabase(stopwatchStore.getState(), this.currentLaps);
            this.currentLaps = [];
        } else {
            throw new Error("Stopwatch isn't started!");
        }
    }

    laps() {
        let id = 0;
        if (stopwatchStore.getState().stopwatch.active) {
            const result = this.lap.time;
            const obj = { id: this.lapsId, lapTimes: result, title: null, savedId: this.id }
            this.lapsId = this.lapsId + 1;
            this.currentLaps.push(obj);
            // stopwatchStore.dispatch(stopwatch_action.addLaps({ laps: obj }));
        } else {
            throw new Error("Stopwatch hasn't started!");
        }
    }
}
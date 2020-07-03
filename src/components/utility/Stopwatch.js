import totalReducer, { stopwatch_action } from './../app/index';
import UpdateDOM from "./updateDom";
import sidebar from './../../anime';
import bug from './../app/bugs';
let id = 0;

class Stopwatch extends UpdateDOM {
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
        if (totalReducer.getState().stopwatch.active) {
            bug.bugAdded("Stopwatch is already started!");
        } else {
            const startTime = new Date();
            this.getId();
            totalReducer.dispatch(stopwatch_action.cleanSavedLaps());
            totalReducer.dispatch(stopwatch_action.activeStopwatch());
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
                    if (totalReducer.getState().stopwatch.active) {
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
        totalReducer.dispatch(stopwatch_action.addSaved({
            id: this.id,
            totalTime: data.stopwatch.time,
            laps: currentLaps
        }));
    }


    stop() {
        if (totalReducer.getState().stopwatch.active) {
            totalReducer.dispatch(stopwatch_action.stopStopwatch());
            this.updateDOM(this.element, ["00", "00", "00"]);
            totalReducer.dispatch(stopwatch_action.addTime({
                time: this.time
            }));
            this.saveToDatabase(totalReducer.getState(), totalReducer.getState().stopwatch.savedCurrentLaps);
            totalReducer.dispatch(stopwatch_action.totalLapsChanges({
                lapsObj: []
            }));
            sidebar.updateSidebarDOM();
        } else {
            bug.bugAdded("Stopwatch isn't started!");
        }
    }

    changes(Totalarray) {
        totalReducer.dispatch(stopwatch_action.totalLapsChanges({
            lapsObj: Totalarray
        }));
    }

    laps() {
        if (totalReducer.getState().stopwatch.active) {
            const result = this.lap.time;
            const obj = { id: this.lapsId, lapTimes: result, title: undefined, savedId: this.id }
            this.lapsId = this.lapsId + 1;
            sidebar.updateLaps(obj);
            totalReducer.dispatch(stopwatch_action.savedCurrentLaps({
                laps: obj
            }));

            sidebar.updateState(totalReducer.getState().stopwatch.savedCurrentLaps);
        } else {
            bug.bugAdded("Stopwatch hasn't started!");
        }
    }
}

const element = document.getElementById("action");
const watch = new Stopwatch(element);
export default watch;
import watch from "./components/utility/Stopwatch";
import sidebar from './anime';
import "./stylesheets/style.scss";
import totalReducer, { uiAction } from './components/app/index';
import { stopwatch_action } from "./components/app/index";

let root = document.documentElement;

document.getElementsByClassName("header-sidebar-link")[0].addEventListener("click", () => {
    totalReducer.dispatch(uiAction.sidebarOpens({
        status: true
    }));

    sidebar.openCloseSidebar(document.getElementsByTagName("aside")[0]);

    window.onclick = function (e) {
        sidebar.checkPosition(sidebar, e);

        if (sidebar.clickPointers && (sidebar.clickPointers.canClose && sidebar.clickPointers.sidebar)) {
            totalReducer.dispatch(uiAction.sidebarOpens({
                status: false
            }));
            sidebar.openCloseSidebar(document.getElementsByTagName("aside")[0]);
        }
    }

});

sidebar.updateSidebarDOM();


(function () {
    root.style.setProperty("--contentHeight", `${(document.getElementsByTagName("header")[0].offsetHeight + 80 + document.getElementsByClassName("views")[0].offsetHeight + 35 + document.getElementsByClassName("buttons-columns")[0].offsetHeight + 60)}px`);
})();


const start = document.getElementById("start");
const stop = document.getElementById("stop");
const laps = document.getElementById("laps");
const cleanSaved = document.getElementsByClassName("clean-saved")[0];

start.addEventListener("click", () => {
    watch.start();
    sidebar.clearLaps();
});

stop.addEventListener("click", () => {
    watch.stop();
    sidebar.saves();
});

laps.addEventListener("click", () => {
    watch.laps();
});

sidebar.normalUpdateLaps(document.getElementsByClassName("bottoms-laps")[0], sidebar.updateLapsItems, sidebar.updateLapsNone);

cleanSaved.addEventListener("click", () => {
    totalReducer.dispatch(stopwatch_action.removedSaved());
    sidebar.updateSidebarDOM();
});

sidebar.adding_animation();
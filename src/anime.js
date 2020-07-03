import anime from 'animejs/lib/anime.es.js';
import totalReducer, { stopwatch_action } from './components/app/index';
import { uiAction } from './components/app/index';
import watch from './components/utility/Stopwatch';
import bug from './components/app/bugs';

class Sidebar {
    constructor() {
        this.clickPointers = {};
        this.lapsArray = [];
    }

    open(element) {
        anime({
            targets: element,
            right: "-2%",
            easing: 'easeInOutQuad',
            duration: 500
        });
    }

    close(element) {
        anime({
            targets: element,
            right: "-30%",
            easing: 'easeInOutQuad',
            duration: 500
        });

        totalReducer.dispatch(uiAction.sidebarOpens({
            status: false
        }));
    }

    openCloseSidebar(element) {
        if (totalReducer.getState().ui.sidebarOpen) {
            this.open(element);
        } else {
            this.close(element);
        }
    }

    canClose(e) {
        let element = document.getElementsByClassName("close")[0];
        if (totalReducer.getState().ui.sidebarOpen) {
            const width = window.innerWidth - document.getElementsByTagName("aside")[0].offsetWidth;
            const height = window.innerHeight;

            if ((e.pageY < height && e.pageX < width) || e.target === element) {
                return { canClose: true, sidebar: true };
            } else {
                return { canClose: false, sidebar: true };
            }
        } else {
            return { canClose: false, sidebar: false };
        }
    }

    checkPosition(s, e) {
        this.clickPointers = s.canClose(e);
    }

    getSidebarRecords() {
        return new Promise((resolve, reject) => {
            const saved = totalReducer.getState().stopwatch.saved;
            if (saved) {
                resolve(saved);
            } else {
                reject("Fail to get stopwatch value");
            }
        });
    }

    updateSidebarNoElement() {
        const element = document.createElement('ul');
        element.setAttribute("class", "updated-ul");
        const anotherElement = document.createElement("li");
        const text = document.createTextNode("No Saved Data");
        anotherElement.appendChild(text);
        anotherElement.setAttribute("class", "no-data");
        element.appendChild(anotherElement);

        return element;
    }

    updateSidebarElement(array) {
        let element, element_top,
            element_top_title,
            element_top_title_text,
            element_bottom,
            element_bottom_title,
            element_bottom_title_text,
            element_bottom_laps_title,
            element_bottom_laps_title_text,
            wapperElement,
            laps_items;

        if (document.getElementsByClassName("saved-wapper").length) {
            wapperElement = document.getElementsByClassName("saved-wapper")[0];
            wapperElement.remove();
        }

        wapperElement = document.createElement("div");
        wapperElement.setAttribute("class", "saved-wapper");

        for (let i = 0; i < array.length; i++) {
            element = document.createElement("div");
            element_top = document.createElement("div");
            element_bottom = document.createElement("div");
            element_top_title = document.createElement("h2");
            element_top_title_text = document.createTextNode(`${array[i].totalTime[0]}: ${array[i].totalTime[1]}: ${array[i].totalTime[2]}`);
            element_bottom_title = document.createElement("h2");
            element_bottom_title_text = document.createTextNode(`Total Time: ${array[i].totalTime[0]}: ${array[i].totalTime[1]}: ${array[i].totalTime[2]}`);
            element_bottom_laps_title = document.createElement("h2");
            element_bottom_laps_title_text = document.createTextNode(`Laps: `);


            element.setAttribute("class", "saved-items");
            element_top.setAttribute("class", "items-top");
            element_bottom.setAttribute("class", "items-bottom");
            element_top_title.setAttribute("class", "items-headding_title");
            element_bottom_title.setAttribute("class", "bottom-click");
            element_bottom_laps_title.setAttribute("class", "laps_title");


            element_top_title.appendChild(element_top_title_text);
            element_top.appendChild(element_top_title);
            element_bottom_title.appendChild(element_bottom_title_text);
            element_bottom.appendChild(element_bottom_title);
            element_bottom_laps_title.appendChild(element_bottom_laps_title_text);
            element_bottom.appendChild(element_bottom_laps_title);

            if (array[i].laps.length > 0) {
                for (let z = 0; z < array[i].laps.length; z++) {
                    laps_items = document.createElement("p");
                    laps_items.setAttribute("class", "laps_items");
                    laps_items.appendChild(document.createTextNode(`Laps item ${array[i].laps[z].lapTimes[0]}: ${array[i].laps[z].lapTimes[1]}: ${array[i].laps[z].lapTimes[2]}`));
                    element_bottom.appendChild(laps_items);
                }
            } else {
                let laps_items = document.createElement("p");
                laps_items.setAttribute("class", "laps_items");
                laps_items.appendChild(document.createTextNode(`No Laps Found!`));
                element_bottom.appendChild(laps_items);
            }

            element.appendChild(element_top);
            element.appendChild(element_bottom);

            wapperElement.appendChild(element);
        }

        return wapperElement;
    }

    change(savedArray) {
        const element = document.querySelector("aside > div.bottom");
        const custom = document.getElementsByClassName("updated-ul")[0];
        const newCustom = document.getElementsByClassName("saved-wapper")[0];

        if (savedArray.length === 0) {
            if (custom) {
                custom.remove();
                if (newCustom) {
                    newCustom.remove();
                }
                element.appendChild(this.updateSidebarNoElement());
            } else {
                if (newCustom) {
                    newCustom.remove();
                }
                element.appendChild(this.updateSidebarNoElement());
            }
        } else {
            if (newCustom) {
                newCustom.remove();
                if (custom) {
                    remove.custom();
                }
                element.appendChild(this.updateSidebarElement(savedArray));
            } else {
                if (custom) {
                    custom.remove();
                }
                element.appendChild(this.updateSidebarElement(savedArray));
            }
        }
    }

    updateSidebarDOM() {
        const saved = async () => {
            await this.getSidebarRecords().then(savedArray => {
                this.change(savedArray);
            }).catch(err => {
                bug.bugAdded(err.message);
            });
        }

        saved();
        return true;
    }

    updateLapsNone(element) {
        const s = document.getElementsByClassName("no-laps")[0];
        if (s) {
            s.remove();
        }
        let main = document.createElement("p");
        main.setAttribute("class", "no-laps");
        let text = document.createTextNode("No Laps Yet");
        main.appendChild(text);
        element.appendChild(main);
    }

    updateLapsItems(array = [], element) {
        let elements;
        for (let i = 0; i < array.length; i++) {
            elements = document.createElement("div");
            elements.setAttribute("class", "laps-items");
            elements.innerHTML = `
            <div class="top">
                <div class="laps-left">
                    <ul>
                        <li>${array[i].lapTimes[0]}: ${array[i].lapTimes[1]}: ${array[i].lapTimes[2]}</li>
                    </ul>
                </div>
                <div class="laps-middle">
                    <p class="text">${ (array[i].title) ? array[i].title : ""}</p>
                </div>
                <div class="laps-right">
                    <img src="https://www.pngmart.com/files/8/Plus-PNG-Transparent-Image.png" value="${array[i].id},${array[i].savedId}" class="laps-plus" alt="plus">
				    <img src="https://toppng.com/uploads/preview/it-is-worthless-discarded-material-or-objects-trash-bin-icon-11563266799e4omadmqae.png" value="${array[i].id},${array[i].savedId}" class="laps-delete" alt="delete">
                </div>
            </div>
            <div class="bottom">
                <hr color="#dedede" width="80%">
            </div>
            `;
            element.appendChild(elements);
        }

    }

    customForLoop(slice) {
        let variable;
        for (let i = 0; i < slice.length; i++) {
            if (variable) {
                variable = variable + slice[i];
            } else {
                variable = slice[i];
            }
        }
        return variable;
    }

    splitsArray(str, customForLoop) {
        let arr = str.split("");
        let index = arr.indexOf(",");
        let firstNumber;
        let lastNumber;
        let last = arr.slice((index + 1),);
        let first = arr.slice(0, index);
        firstNumber = customForLoop(first);
        lastNumber = customForLoop(last);
        return [firstNumber, lastNumber];
    }

    askQuestion() {
        const main = document.getElementsByTagName("body")[0];
        const element = document.createElement("div");
        element.setAttribute("class", "ask-question");
        const paragraph = document.createElement("p");
        paragraph.setAttribute("class", "question-title");
        paragraph.appendChild(document.createTextNode("Enter your title"));
        element.appendChild(paragraph);
        const input = document.createElement("input");
        input.setAttribute("class", "question-input");
        input.setAttribute("id", "question-input");
        input.setAttribute("placeholder", "Enter Your Title");
        input.setAttribute("type", "text");
        element.appendChild(input);
        const wapperButton = document.createElement("div");
        wapperButton.setAttribute("class", "button-wapper");
        const button = document.createElement("button");
        button.setAttribute("class", "question-submit");
        button.setAttribute("value", "submit");
        button.appendChild(document.createTextNode("SUBMIT"));
        wapperButton.appendChild(button);
        const nextButton = document.createElement("button");
        nextButton.setAttribute("class", "question-reject");
        nextButton.setAttribute("value", "reject");
        nextButton.appendChild(document.createTextNode("REJECT"));
        wapperButton.appendChild(nextButton);
        element.appendChild(wapperButton);
        main.appendChild(element);
    }

    removeAskQuestion() {
        const element = document.getElementsByClassName("ask-question")[0];
        if (element) {
            element.remove();
        }
    }

    questionsError() {
        const main = document.getElementsByClassName("ask-question")[0];
        const element = document.createElement("small");
        element.setAttribute("class", "question-error");
        element.appendChild(document.createTextNode("Title can't be empty"));
        main.appendChild(element);
    }

    clearLaps() {
        let splitsArray = this.splitsArray;
        let customForLoop = this.customForLoop;
        let thisIs = this;
        let normalUpdateLaps = this.normalUpdateLaps;
        let updateLapsItems = this.updateLapsItems;
        let updateLapsNone = this.updateLapsNone;
        let askQuestion = this.askQuestion;
        let questionError = this.questionsError;
        let removeAskQuestion = this.removeAskQuestion;

        function remove() {
            const element = document.getElementsByClassName("bottoms-laps")[0];
            element.remove();
            const e = document.createElement("div");
            e.setAttribute("class", "bottoms-laps");
            e.onclick = function (e) {
                if (e.target.className === "laps-plus") {

                    if (totalReducer.getState().stopwatch.active) {
                        function show() {
                            return new Promise((resolves, rejects) => {
                                askQuestion();
                                const elements = document.getElementsByTagName("input").namedItem("question-input");
                                const submit = document.getElementsByClassName("question-submit")[0];
                                const reject = document.getElementsByClassName("question-reject")[0];

                                submit.onclick = function (z) {
                                    if (elements.value.trim() === "") {
                                        questionError();
                                        z.preventDefault();
                                    } else {
                                        resolves(elements.value);
                                    }
                                }

                                reject.onclick = function () {
                                    rejects({ name: "closed" });
                                }
                            });
                        }

                        async function main() {
                            await show().then(val => {
                                removeAskQuestion();


                                if (totalReducer.getState().stopwatch.active) {
                                    const str = e.target.attributes[1].value;
                                    const arr = splitsArray(str, customForLoop);
                                    // I Have to write code from here...

                                    let first = Number(arr[0]);
                                    let last = Number(arr[1]);

                                    totalReducer.dispatch(stopwatch_action.titleChanged({
                                        first,
                                        last,
                                        title: val
                                    }));

                                    remove();
                                    normalUpdateLaps(totalReducer.getState().stopwatch.savedCurrentLaps, updateLapsItems, updateLapsNone);
                                } else {
                                    bug.bugAdded("title can be update when stopwatch is started!");
                                }
                            }).catch(error => { removeAskQuestion(); });
                        }
                        main();

                    } else {
                        bug.bugAdded("title can be update when stopwatch is started!");
                    }
                } else if (e.target.className === "laps-delete") {
                    if (totalReducer.getState().stopwatch.active) {
                        const strValue = e.target.attributes[1].value;
                        const arr = splitsArray(strValue, customForLoop);

                        let first = Number(arr[0]);
                        let last = Number(arr[1]);

                        const newArray = totalReducer.getState().stopwatch.savedCurrentLaps.filter(obj => !(obj.id === first && obj.savedId === last));

                        totalReducer.dispatch(stopwatch_action.totalLapsChanges({
                            lapsObj: newArray
                        }));

                        remove();
                        normalUpdateLaps(newArray, updateLapsItems, updateLapsNone);
                        watch.changes(newArray);

                    } else {
                        bug.bugAdded("only delete when stopwatch is started!");
                    }
                }
            }
            const ne = document.createElement("p");
            ne.setAttribute("class", "no-laps");
            ne.appendChild(document.createTextNode("No Laps Yet"));
            e.appendChild(ne);
            document.getElementsByTagName("content")[0].appendChild(e);
        }
        remove();

    }

    saves() {
        watch.changes(this.newLapsArray);
    }

    normalUpdateLaps(array = [], updateLapsItems, updateLapsNone) {
        const element = document.getElementsByClassName("bottoms-laps")[0];
        const remove_one = document.getElementsByClassName("no-laps")[0];
        // in here i have to call 2 function and according to the length of laps, it set one of those element.
        if (array.length > 0) {
            if (remove_one) {
                remove_one.remove();
            }
            updateLapsItems(array, element);
        } else {
            updateLapsNone(element);
        }
    }

    updateLaps(laps) {
        let array = [];
        array.push(laps);
        this.normalUpdateLaps(array, this.updateLapsItems, this.updateLapsNone);
    }

    updateState(arr) {
        this.lapsArray = arr;
    }
}



const sidebar = new Sidebar();
export default sidebar;
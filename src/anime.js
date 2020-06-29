import anime from 'animejs/lib/anime.es.js';
import totalReducer from './components/app/index';
import { uiAction } from './components/app/index';
import { remove } from 'animejs';

class Sidebar {
    constructor() {
        this.clickPointers = {}
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
            resolve(saved);
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
        // updateSidebarNoElement
        // updateSidebarElement

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
                throw new Error(err);
            });
        }

        saved();
    }
}
const sidebar = new Sidebar();
export default sidebar;
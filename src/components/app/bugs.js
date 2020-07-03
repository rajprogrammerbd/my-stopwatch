import anime from 'animejs/lib/anime.es.js';


class Bugs {
    constructor() {
        this.bug = true;
    }

    deleteBug() {
        const e = document.getElementsByClassName("bug-wapper")[0];

        if (e) {
            e.remove()
        }
    }

    uiAdded(message) {
        const deleteBug = this.deleteBug;
        const body = document.getElementsByTagName("body")[0];
        const element = document.createElement("div");
        element.setAttribute("class", "bug-wapper");
        const top = document.createElement("div");
        top.setAttribute("class", "bug-top");
        const top_text = document.createElement("p");
        top_text.appendChild(document.createTextNode(message));
        top.appendChild(top_text);
        const bottom = document.createElement("div");
        bottom.setAttribute("class", "bug-bottom");
        const process = document.createElement("div");
        process.setAttribute("class", "bug-process");
        bottom.appendChild(process);
        element.appendChild(top);
        element.appendChild(bottom);
        body.appendChild(element);

        const count = {
            counts: "0%"
        }


        element.onclick = function () {
            deleteBug();
        }

        anime({
            targets: count,
            counts: "100%",
            round: 1,
            easing: 'linear',
            duration: 5000,
            update: function () {
                process.style.width = count.counts;
            },
            complete: function () {
                deleteBug(element);
            }
        });
    }

    main(message) {
        this.uiAdded(message);

    }

    bugAdded(message) {
        this.main(message);
    }
}

const bug = new Bugs();
export default bug;
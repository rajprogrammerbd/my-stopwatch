export default class UpdateDOM {
    constructor(element) {
        this.element = element;
    }

    updateDOM(element, timeArray) {
        element.innerHTML = `${timeArray[0]}: ${timeArray[1]}: ${timeArray[2]}`;
    }

    static isCount(val) {
        const str = val.toString();
        if (str.length === 1) {
            return `0${val}`;
        } else {
            return `${val}`;
        }
    }

    static checkSeconds(num) {
        if (num <= 59) {
            return num;
        } else {
            let ans = (num % 60);
            return ans;
        }
    }

    static checkMinutes(num) {
        if ((num / 60) < 1) {
            return "0";
        } else {
            return UpdateDOM.checkSeconds(Math.floor(num / 60));
        }
    }

    static cHours(num) {
        if (num > 3600 || Number.isInteger(num / 3600)) {
            return `${Math.floor(num / 3600)}`;
        } else {
            return "0";
        }
    }

    static timeCheck(seconds) {
        let time = ["00", "00", "00"];

        time[2] = UpdateDOM.isCount(UpdateDOM.checkSeconds(Number(seconds)));
        time[1] = UpdateDOM.isCount(UpdateDOM.checkMinutes(Number(seconds)));
        time[0] = UpdateDOM.isCount(UpdateDOM.cHours(Number(seconds)));

        return time;
    }

    static updateTime(totalMiliseconds) {
        if (Number.isInteger(totalMiliseconds)) {
            // Abstraction in action.
            const timeArray = UpdateDOM.timeCheck(totalMiliseconds);
            return timeArray;
        } else {
            throw new Error("totalMiliseconds is not a integer");
        }
    }
}
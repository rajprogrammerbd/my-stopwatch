import "./stylesheets/style.scss";

class Stopwatch {
    start() {
        const start = new Date();
        console.log("stopwatch is started!");
        return start;
    }
    stop(start) {
        const stop = new Date();
        console.log(`Stopwatch is Stopped ${Math.ceil(stop - start)}`);
    }
}


const s = new Stopwatch();

function myFunction() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const start = s.start();
            resolve(start);
        }, 1000);
    });
};


async function a(obj) {
    await myFunction().then(start => {
        setTimeout(() => {
            s.stop(start);
        }, 2000);
    });
}

a();
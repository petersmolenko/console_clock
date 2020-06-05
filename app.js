const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;
const { TIME = 5000, INTERVAL = 1000 } = process.env;
let isActivatedClock = false;

const server = http.createServer((req, res) => {
    if (req.url === "/time") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");

        if (!isActivatedClock) {
            const printTime = setInterval(() => {
                console.clear();
                console.log(new Date(Date.now()).toUTCString());
            }, INTERVAL);
            setTimeout(() => {
                clearInterval(printTime);
                res.end(new Date(Date.now()).toUTCString());
                console.clear();
                console.log(`Time's up.`);
                isActivatedClock = true;
            }, TIME);
        } else {
            res.end(new Date(Date.now()).toUTCString());
        }
    } else {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html; charset=utf-8;");
        res.write('<a href="/time">get time</a>');
        res.end();
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

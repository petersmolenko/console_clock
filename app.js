const http = require("http");

const hostname = "127.0.0.1";
const port = 8080;
const { TIME = 5000, INTERVAL = 1000 } = process.env;
let clientCount = 0;

const server = http.createServer((req, res) => {
    if (req.url === "/time") {
        let printTime = null;
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");

        if (clientCount === 0) {
            printTime = setInterval(() => {
                // console.clear();
                console.log(new Date(Date.now()).toUTCString());
            }, INTERVAL);
        }

        clientCount++;

        setTimeout(() => {
            if (printTime) clearInterval(printTime);
            res.end(new Date(Date.now()).toUTCString());
            // console.clear();
            console.log(`Time's up.`);
            clientCount--;
        }, TIME);
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

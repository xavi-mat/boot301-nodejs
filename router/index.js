const http = require("http");
const url = require("url");
const fs = require("fs");
const PAGES = ['/home', '/about', '/what', '/where'];


http.createServer((req, res) => {
    const { pathname:path } = url.parse(req.url, true);
    let file = '404';
    let contentType;
    if (PAGES.includes(path)) {
        file = `./pages/${path}.html`;
        contentType = { "Content-Type": "text/html" };
    } else if(path === '/css') {
        file = './css/bootstrap.min.css';
        contentType = { "Content-Type": "text/css" };
    }
    console.log(file);
    fs.readFile(file, (err, data) => {
        try {
            res.writeHead(200, contentType);
            res.write(data);
            return res.end();
        } catch (error) {
            res.writeHead(404, { "Content-Type": "text/html" });
            console.error(error);
            return res.end("404 Not Found");
        }
    })
}).listen(8080);
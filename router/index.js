const http = require("http");
const url = require("url");
const fs = require("fs");
const PAGES = ['/', '/home', '/about', '/what', '/where'];

let header;
fs.readFile('./pages/header.html', (err, data) => {header = data;});

http.createServer((req, res) => {
    const myCookies = req.headers.cookie?.toString();
    let { pathname:path } = url.parse(req.url, true);
    let file = '404';
    let status = 200;
    let contentType;
    if (PAGES.includes(path)) {
        path = path === '/' ? '/home' : path;
        file = `./pages/${path}.html`;
        contentType = { "Content-Type": "text/html" };
    } else if(path === '/css') {
        file = './css/bootstrap.min.css';
        contentType = { "Content-Type": "text/css" };
    } else {
        file = `./pages/404.html`;
        contentType = { "Content-Type": "text/html" };
        status = 404;
    }
    console.log('Path',file);
    fs.readFile(file, (err, data) => {
        try {
            res.writeHead(status, contentType);
            let content;
            content = contentType["Content-Type"] === "text/html" ?
                header + data + `Cookies: ${myCookies}.` :
                data;
            res.write(content);
            return res.end();
        } catch (err) {
            res.writeHead(500, { "Content-Type": "text/html" });
            console.error(err);
            return res.end("Something went wrong");
        }
    })
}).listen(8080);
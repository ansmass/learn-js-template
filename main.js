"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const http_1 = require("http");
const port = 3000;
const hostname = 'localhost';
const mimeTypeList = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm'
};
(0, http_1.createServer)((request, response) => {
    console.log('[REQUEST URL] : ', request.url);
    var filePath = `.${request.url}`;
    if (filePath === './') {
        filePath = (0, path_1.join)(__dirname, 'views', 'index.html');
    }
    const extensionName = String((0, path_1.extname)(filePath)).toLowerCase();
    const contentType = mimeTypeList[extensionName] || 'application/octet-stream';
    (0, fs_1.readFile)(filePath, (error, content) => {
        if (error) {
            console.error('[ERROR] : ', error);
            if (error.code === 'ENOENT') {
                (0, fs_1.readFile)((0, path_1.join)(__dirname, 'views', '404.html'), (error, content) => {
                    response.writeHead(404, { 'Content-Type': 'text/html' });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end(`Sorry, check with the site admin for error: ${error.code} \n`);
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });
}).listen(port);
console.info(`Server running at http://${hostname}:${port}/`);

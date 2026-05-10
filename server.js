const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const root = process.cwd();
const port = 3000;

const mime = {
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.pdf': 'application/pdf',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
};

function send(res, status, body, type = 'text/plain; charset=utf-8', headers = {}) {
  res.writeHead(status, { 'Content-Type': type, ...headers });
  res.end(body);
}

function isCompressible(type) {
  return /text\/|javascript|json|svg/.test(type);
}

http
  .createServer((req, res) => {
    let reqPath = decodeURIComponent((req.url || '/').split('?')[0]);
    if (reqPath === '/') {
      reqPath = '/index.html';
    }

    const filePath = path.normalize(path.join(root, reqPath));
    if (!filePath.startsWith(root)) {
      send(res, 403, 'Forbidden');
      return;
    }

    fs.stat(filePath, (statErr, stat) => {
      if (statErr) {
        send(res, 404, 'Not found');
        return;
      }

      const target = stat.isDirectory() ? path.join(filePath, 'index.html') : filePath;
      fs.readFile(target, (readErr, data) => {
        if (readErr) {
          send(res, 404, 'Not found');
          return;
        }

        const ext = path.extname(target).toLowerCase();
        const type = mime[ext] || 'application/octet-stream';
        const headers = {};

        if (['.css', '.js', '.jpg', '.jpeg', '.png', '.webp', '.svg', '.ico'].includes(ext)) {
          headers['Cache-Control'] = 'public, max-age=31536000, immutable';
        }

        if (isCompressible(type) && /\bgzip\b/.test(req.headers['accept-encoding'] || '')) {
          zlib.gzip(data, (gzipErr, compressed) => {
            if (gzipErr) {
              send(res, 200, data, type, headers);
              return;
            }

            send(res, 200, compressed, type, { ...headers, 'Content-Encoding': 'gzip' });
          });
          return;
        }

        send(res, 200, data, type, headers);
      });
    });
  })
  .listen(port, '127.0.0.1', () => {
    console.log(`Server running at http://127.0.0.1:${port}`);
  });

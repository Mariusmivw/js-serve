const { parse } = require("url");
const { readFileSync } = require("fs");

function serve({ path, file, headers }, server) {
  const evs = server.listeners("request").slice(0);
  server.removeAllListeners("request");
  server.on("request", (req, res) => {
    if (parse(req.url).pathname === path) {
      for (const header in headers) {
        res.setHeader(header, headers[header]);
        res.write(readFileSync(file));
        res.end();
      }
    } else {
      for (const ev of evs) {
        ev.call(server, req, res);
      }
    }
  });
}

module.exports = serve;
module.exports = { serve };

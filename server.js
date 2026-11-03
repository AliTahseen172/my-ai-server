const http = require("http");

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  if (req.url === "/") {
    return res.end(JSON.stringify({
      message: "My AI Server is running!"
    }));
  }

  if (req.url === "/chat" && req.method === "POST") {
    let body = "";

    req.on("data", chunk => body += chunk);

    req.on("end", () => {
      const data = JSON.parse(body);

      res.end(JSON.stringify({
        reply: "Hello! Your AI server received: " + data.message
      }));
    });

    return;
  }

  res.writeHead(404);
  res.end(JSON.stringify({ error: "Not found" }));
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("AI Server running on port " + PORT);
});

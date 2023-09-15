// Import the 'node-fetch' package as an ES module
import fetch from "node-fetch";
import http from "http";

// Import the 'esm' package to enable ES module support
import esm from "esm";
const esmRequire = esm(module);

const PORT = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Code");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.url === "/getData") {
    const accessCode = "GT8V4DO2MYCO8AX3MAKW8QA06";
    const endpoint = "https://forms.maakeetoo.com/formapi/414";

    const headers = new fetch.Headers();
    headers.append("Code", accessCode);

    const request = new fetch.Request(endpoint, {
      method: "GET",
      headers: headers,
    });

    try {
      const response = await fetch(request);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(data));
    } catch (error) {
      console.error("Fetch Error:", error);
      res.writeHead(500);
      res.end("Internal Server Error");
    }
  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const server = require("./server")

server.listen( process.env.PORT || 8000, () => {
  console.log(">> [port 8000] I'm listening...");
})
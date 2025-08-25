const http = require("http")

const httpServer = http.createServer((req, res) => {
  // this is for cors error
  res.writeHead(200, {
    "access-control-allow-origin": "*",
  })
  res.end("i don't want your http rubbish")
})

const port = 8080
httpServer.listen(port, () => {
  console.log(`The http server is  listening on port ${port}`)
})

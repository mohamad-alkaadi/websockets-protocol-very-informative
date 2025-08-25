const http = require("http")
const WebSocketServer = require("websocket").server
// create http server
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

// you need to mount the websocket to web server
let websocket = new WebSocketServer({
  // which web server to mount it self into
  httpServer: httpServer,
  autoAcceptConnections: false,
})
// not required you can always put it true
function isOriginAllowed(origin) {
  //logic here to determine if a specified origin in allowed
  // im returning true because i do nt want to put authentication now
  return true
}

// the websocket server object will fire a request event every time a websocket request is made an you can accept or reject it

websocket.on("request", (req) => {
  if (!isOriginAllowed(req.origin)) {
    req.reject(403, "Sorry you are not allowed here")
    console.log(`Client's request rejected from origin ${req.origin}`)
  }
  // establish our websocket connection
  // to do this we want to insert this connection into an object
  let connection = req.accept()
  connection.send(`Connection established ;)`)
  //  this is for the server
  console.log(`Connection established and accepted`)
  //listen for a message &&&& echo it back to the client
  connection.on("message", (message) => {
    // we send the message and encode it in utf8
    connection.send(
      `Ping. Message received from the client ${message.utf8Data}`
    )
  })
  // listen for the close event
  connection.on("close", (code, description) => {
    console.log(
      `Peer connection ${connection.remoteAddress} disconnected. Thee reason is: ${description} and the closure code is: ${code}`
    )
  })
})

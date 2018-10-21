import * as deepcopy from "deepcopy";
const net = electronRequire("net");

export class TCPServer {
  tcpServer: any;
  tcpSockets: any[];
  listenAddress: string;
  listenPort: number;
  turnOn: boolean;

  constructor(
    listenAddress: string,
    listenPort: number,
    callbackFunc: (turnOn: boolean) => void
  ) {
    this.tcpServer = null;
    this.tcpSockets = [];
    this.listenAddress = listenAddress;
    this.listenPort = listenPort;
    this.turnOn = false;
  }

  setupTCPServer = () => {
    // Close server if already exists:
    if (this.tcpServer !== null) {
      this.tcpServer.close();
    }

    // Close all existing sockets:
    let tcpSockets = deepcopy(this.tcpSockets);
    for (let i = 0; i < tcpSockets.length; i++) {
      tcpSockets[i].destroy();
    }
    this.tcpSockets = [];

    // Create a TCP socket listener
    let tcpServer = net.createServer(
      function(socket: any) {
        // Add the new client socket connection to the array of sockets
        this.tcpSockets.push(socket);

        // 'data' is an event that means that a message was just sent by the client application
        socket.on(
          "data",
          function(msg_sent: any) {
            // console.log("Data from socket: " + msg_sent);
            let jsonData: any = JSON.parse(msg_sent);

            console.log(jsonData);
            this.callbackFunc(this.turnOn);
          }.bind(this)
        );
        // Use splice to get rid of the socket that is ending.
        // The 'end' event means tcp client has disconnected.
        socket.on(
          "end",
          function() {
            // let sockets = deepcopy(this.tcpSockets);
            let i = this.tcpSockets.indexOf(socket);
            this.tcpSockets.splice(i, 1);
          }.bind(this)
        );
      }.bind(this)
    );

    this.tcpServer = tcpServer;

    try {
      // this.tcpServer.listen(this.MACEconfig.config.MACEComms.listenPortNumber);
      this.tcpServer.listen(this.listenPort, this.listenAddress);
    } catch (e) {
      console.log(e);
    }

    console.log(
      "System listening at http://" + this.listenAddress + ":" + this.listenPort
    );
  };
}

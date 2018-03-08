import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
const darkMuiTheme = getMuiTheme(darkBaseTheme);
import * as React from 'react';

// import { Weather } from '../components/Weather';
import { Weathrly } from '../components/weathrly/lib/Weathrly/Weathrly';
import { Lights } from '../components/Lights';
import { Calendar } from '../components/Calendar';

import * as deepcopy from 'deepcopy';
var net = electronRequire('net');

type Props = {
    activePage?: number
}


type State = {
    tcpServer?: any,
    tcpSockets?: any[]
}

export class PageContainer extends React.Component<Props, State> {
    //motionSensor: any;
    constructor(props: Props) {
        super(props);

        this.state = {
            tcpServer: null,
            tcpSockets: []
        }
    }

    componentDidMount() {
        this.setupTCPServer();
    }

    setupTCPServer = () => {
        // Close server if already exists:
        if(this.state.tcpServer !== null) {
            this.state.tcpServer.close();
        }

        // Close all existing sockets:
        let tcpSockets = deepcopy(this.state.tcpSockets);
        for(let i = 0; i < tcpSockets.length; i++) {
            tcpSockets[i].destroy();
        }
        this.setState({tcpSockets: []});

        // Create a TCP socket listener
        let tcpServer = net.createServer(function (socket: any) {
            // Add the new client socket connection to the array of sockets
            this.state.tcpSockets.push(socket);

            // 'data' is an event that means that a message was just sent by the client application
            socket.on('data', function (msg_sent: any) {
                // console.log("Data from socket: " + msg_sent);
                let jsonData: TCPReturnType = JSON.parse(msg_sent);
                this.parseTCPClientData(jsonData);
            }.bind(this));
            // Use splice to get rid of the socket that is ending.
            // The 'end' event means tcp client has disconnected.
            socket.on('end', function () {
                // let sockets = deepcopy(this.state.tcpSockets);
                let i = this.state.tcpSockets.indexOf(socket);
                this.state.tcpSockets.splice(i, 1);
            }.bind(this));

        }.bind(this));

        this.setState({tcpServer: tcpServer}, () => {
            // TODO: Allow for user configuration of the port and probably address too
            try{
                this.state.tcpServer.listen(1234);
            }
            catch(e) {
                console.log(e);
            }

            console.log('System listening at http://127.0.0.1:1234');
        });

    }

    parseTCPClientData = (jsonData: TCPReturnType) => {
        console.log("ParseTCPClientData: ");
        console.log(jsonData);
    }

    render() {

        const width = window.screen.width;
        const height = window.screen.height;
        const parentStyle = {height: height + 'px', width: width + 'px'};

        return(
            <MuiThemeProvider muiTheme={darkMuiTheme}>
                <div style={parentStyle}>
                        {/* <Weather /> */}
                    {this.props.activePage === 0 &&
                        <Weathrly />
                    }

                    {this.props.activePage === 1 &&
                        <Calendar />
                    }

                    {this.props.activePage === 2 &&
                        <Lights />
                    }
                </div>
            </MuiThemeProvider>
        )

    }
}

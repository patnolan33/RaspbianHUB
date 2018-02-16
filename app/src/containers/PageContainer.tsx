import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
const darkMuiTheme = getMuiTheme(darkBaseTheme);
import * as React from 'react';

// import { Weather } from '../components/Weather';
import { Weathrly } from '../components/weathrly/lib/Weathrly/Weathrly';
import { Lights } from '../components/Lights';
import { Calendar } from '../components/Calendar';

// Johnny-Five for RPi
import raspi from 'raspi-io';
import five from 'johnny-five';


type Props = {
    activePage?: number
}


type State = {
    motionDetected?: boolean
}

export class PageContainer extends React.Component<Props, State> {

    board: five.Board;

    constructor(props: Props) {
        super(props);

        this.state = {
            motionDetected: false
        }

        this.board = new five.Board({io: new raspi()});
    }

    componentDidMount(){
        this.setupMotionSensor();
    }

    setupMotionSensor = () => {
        let tmpRet = this.board.on('ready', () => {
            console.log('board is ready');

            // Create a new `motion` hardware instance.
            const motion = new five.Motion(4); //a PIR is wired on pin 7 (GPIO 4)

            // 'calibrated' occurs once at the beginning of a session
            motion.on('calibrated', () => {
                console.log('calibrated');
            });

            // Motion detected
            motion.on('motionstart', () => {
                console.log('motionstart');
                this.setState({motionDetected: true});
            });

            // 'motionend' events
            motion.on('motionend', () => {
                console.log('motionend');
                this.setState({motionDetected: false});
            });
        });

        console.log("BOARD ONREADY RETURN: " + tmpRet);
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
                        <Lights
                            motionDetected={this.state.motionDetected}
                         />
                    }
                </div>
            </MuiThemeProvider>
        )

    }
}

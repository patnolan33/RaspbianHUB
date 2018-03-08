import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
const darkMuiTheme = getMuiTheme(darkBaseTheme);
import * as React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import { Grid, Col } from 'react-bootstrap';
import { SwatchesPicker, ChromePicker } from 'react-color';
import * as colors from 'material-ui/styles/colors';

import { CustomColorPicker } from './lightsComponents/CustomColorPicker';
var PythonShell = require('python-shell');

type Props = {
}

type State = {
    color?: string,
    pickerType?: "swatch" | "chrome" | "custom",
    pythonScript?: string,
    lightsOn?: boolean,
    numLEDs?: number,
    brightness?: number,
    motionDetected?: boolean,
    motionEnabled?: boolean
}

export class Lights extends React.Component<Props, State> {
    pythonShell_Light: any;
    pythonShell_Motion: any;
    pixelData: Uint32Array;

    constructor(props: Props) {
        super(props);

        this.state = {
            color: '#000000',
            pickerType: 'custom',
            pythonScript: 'Solid.py',
            lightsOn: false,
	        numLEDs: 30,
            brightness: 128,
            motionDetected: false,
            motionEnabled: true
        }

        // let options = {
        //     mode: "text",
        //     pythonOptions: ["-u"],
	    //     scriptPath: "./python/",
	    //     args: ['#000000', '-c']
        // };
	    // this.pythonShell_Light = PythonShell.run('Solid.py', options, function(err: any, results: any) {
        //     if(err){
        //         console.log(err);
        //         throw err;
        //     }

        //     console.log(results);
        // }.bind(this));
        this.runPythonScript_Lights();

        // Motion detect:
        this.runPythonScript_Motion();
    }

    componentDidMount() {
    }

    runPythonScript_Motion = () => {
        let options = {
            mode: "text",
            pythonOptions: ["-u"],
	        scriptPath: "./python/"
        };
        this.pythonShell_Motion = PythonShell.run('DetectMotion.py', options, function(err: any, results: any) {
            if(err){
                console.log(err);
                throw err;
            }

            console.log("Motion detection results: ");
            console.log(results);
            // TODO: Set motion state true/false

        }.bind(this));
    }

    runPythonScript_Lights = () => {
        // Kill old python script:
        if(this.pythonShell_Light) {
            this.pythonShell_Light.childProcess.kill('SIGINT');
            this.pythonShell_Light = null;
        }

        let options = {
            mode: "text",
            pythonOptions: ["-u"],
            scriptPath: "./python/",
            args: ['#000000', '-c']
        };

// && (this.state.motionDetected && this.state.motionEnabled)
        if(this.state.lightsOn === false) {
            options = {
                mode: "text",
                pythonOptions: ["-u"],
                scriptPath: "./python/",
                args: [this.state.color, '-c']
            };
        }

        this.pythonShell_Light = PythonShell.run(this.state.pythonScript, options, function(err: any, results: any) {
            if(err){
                console.log(err);
                throw err;
            }

            console.log("Lights results: ");
            console.log(results);
        }.bind(this));
    }

    handleChangeLightBehavior = (behavior: string) => {
        let script = '';
        if(behavior === 'solid') {
            script = 'Solid.py';
        }
        else if(behavior === 'blink') {
            script = 'Strandtest.py';
        }

        this.setState({pythonScript: script});
    }

    handleChangeComplete = (color: any) => {
        console.log(color);
        this.setState({color: color.hex});
    }

    handleChangeColor = (color: string) => {
        this.setState({color: color});
    }

    handleLightsOn = (lightsOn: boolean) => {
        this.setState({lightsOn});

        // Run python script to turn on lights with script:
        this.runPythonScript_Lights();
    }


    render() {

        const height = window.screen.height;
        // const width = window.screen.width;

        const parentStyle = {
            width: 100+'%',
            display: 'flex' as 'flex',
            flexDirection: 'column' as 'column'
        };

        let inactiveButtonStyle = {
            width: 100+'%',
            flex: 1,
            borderStyle: 'solid',
            borderColor: colors.grey800,
        };

        let activeButtonStyle = {
            width: 100+'%',
            flex: 1,
            borderStyle: 'solid',
            borderColor: colors.grey800,
            color: colors.cyan700
        }

        let inactiveBackgroundStyle = {
            height: 100+'%'
        }

        let activeBackgroundStyle = {
            height: 100+'%',
            backgroundColor: colors.grey800
        }

        return(
            <MuiThemeProvider muiTheme={darkMuiTheme}>
                <div>
                    <Grid fluid style={{paddingLeft: 0, paddingRight: 0}}>
                        <Col xs={2} md={2} style={{paddingLeft: 0, paddingRight: 0, height: height-90+'px', display: 'flex'}}>
                            <div style={parentStyle}>
                                {this.state.lightsOn === true ?
                                    <RaisedButton
                                        icon={<i className="material-icons">power_settings_new</i>}
                                        onClick={() => this.handleLightsOn(false)}
                                        label="Off"
                                        style={inactiveButtonStyle}
                                        buttonStyle={{height: 100+'%'}}
                                    />
                                    :
                                    <RaisedButton
                                        icon={<i className="material-icons">power_settings_new</i>}
                                        onClick={() => this.handleLightsOn(true)}
                                        label="On"
                                        style={inactiveButtonStyle}
                                        buttonStyle={{height: 100+'%'}}
                                    />
                                }

                                <RaisedButton
                                    icon={<i className="material-icons">lens</i>}
                                    onClick={() => this.handleChangeLightBehavior('solid')}
                                    label="Solid"
                                    style={this.state.pythonScript === 'Solid.py' ? activeButtonStyle : inactiveButtonStyle}
                                    buttonStyle={this.state.pythonScript === 'Solid.py' ? activeBackgroundStyle : inactiveBackgroundStyle}
                                />
                                <RaisedButton
                                    icon={<i className="material-icons">hdr_strong</i>}
                                    onClick={() => this.handleChangeLightBehavior('blink')}
                                    label="Blink"
                                    style={this.state.pythonScript === 'Solid.py' ? inactiveButtonStyle : activeButtonStyle}
                                    buttonStyle={this.state.pythonScript === 'Solid.py' ? inactiveBackgroundStyle : activeBackgroundStyle}
                                />
                            </div>
                        </Col>

                        <Col xs={10} md={10} style={{paddingLeft: 0, paddingRight: 0, backgroundColor: colors.grey800, overflow: 'hidden'}}>
                            {this.state.pickerType === "swatch" &&
                                <SwatchesPicker
                                    color={this.state.color}
                                    onChangeComplete={this.handleChangeComplete}
                                />
                            }
                            {this.state.pickerType === "chrome" &&
                                <ChromePicker
                                    color={this.state.color}
                                    onChangeComplete={this.handleChangeComplete}
                                />
                            }
                            {this.state.pickerType === "custom" &&
                                <CustomColorPicker
                                    onChangeColor={this.handleChangeColor}
                                />
                            }
                        </Col>


                    </Grid>
                </div>
            </MuiThemeProvider>
        )

    }
}

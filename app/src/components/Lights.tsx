import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
const darkMuiTheme = getMuiTheme(darkBaseTheme);
import * as React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import { SwatchesPicker, ChromePicker } from 'react-color';

import { CustomColorPicker } from './lightsComponents/CustomColorPicker';
var PythonShell = require('python-shell');

type Props = {
}


type State = {
    color?: string,
    pickerType?: "swatch" | "chrome" | "custom",
    pythonScript?: string,
    lightsOn?: boolean
}

export class Lights extends React.Component<Props, State> {
    pythonShell: any;

    constructor(props: Props) {
        super(props);

        this.state = {
            color: '#000000',
            pickerType: 'custom',
            pythonScript: 'Solid.py',
            lightsOn: false
        }

        let options = {
            mode: "text",
            pythonOptions: ["-u"],
	    scriptPath: "./python/",
	    args: ['#000000', '-c']
        };
	this.pythonShell = PythonShell.run('Solid.py', options, function(err: any, results: any) {
            if(err){
                console.log(err);
                throw err;
            }

            console.log(results);
        }.bind(this));
    }

    componentDidMount() {
    }

    runPythonScript = () => {
	// Kill old python script:
	this.pythonShell.childProcess.kill('SIGINT');
	this.pythonShell = null;

        let options = {
            mode: "text",
            pythonOptions: ["-u"],
	    scriptPath: "./python/",
	    args: [this.state.color, '-c']
        };

        if(this.state.lightsOn === true) {
	    options = {
	        mode: "text",
	        pythonOptions: ["-u"],
	        scriptPath: "./python/",
	        args: ['#000000', '-c']
	    };
        }
        else {
	console.log('COLOR: ' + this.state.color);
	    options = {
	        mode: "text",
	        pythonOptions: ["-u"],
	        scriptPath: "./python/",
	        args: [this.state.color, '-c']
	    };
        }

        this.pythonShell = PythonShell.run(this.state.pythonScript, options, function(err: any, results: any) {
            if(err){
                console.log(err);
                throw err;
            }

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
        this.runPythonScript();
    }

    render() {

        return(
            <MuiThemeProvider muiTheme={darkMuiTheme}>
                <div>
                    {this.state.lightsOn === true ?
                        <RaisedButton
                            icon={<i className="material-icons">power_settings_new</i>}
                            onClick={() => this.handleLightsOn(false)}
                            label="Off"
                        />
                        :
                        <RaisedButton
                            icon={<i className="material-icons">power_settings_new</i>}
                            onClick={() => this.handleLightsOn(true)}
                            label="On"
                        />
                    }

                    <RaisedButton
                        icon={<i className="material-icons">lens</i>}
                        onClick={() => this.handleChangeLightBehavior('solid')}
                        label="Solid"
                    />
                    <RaisedButton
                        icon={<i className="material-icons">hdr_strong</i>}
                        onClick={() => this.handleChangeLightBehavior('blink')}
                        label="Blink"
                    />


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


                </div>
            </MuiThemeProvider>
        )

    }
}

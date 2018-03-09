import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
const darkMuiTheme = getMuiTheme(darkBaseTheme);
import * as React from 'react';

import { Grid, Col } from 'react-bootstrap';
import * as colors from 'material-ui/styles/colors';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';


type Props = {
    baseColor: string,
    onColorSelect: (lightColor: string) => void,
    onBack: () => void,
    selectedLightColor: string
}

type State = {
    selectedColor?: string,
    buttonColor?: string,
    arrowColor?: string
}

export class ColorSelector extends React.Component<Props, State> {
    materialColors: any;

    constructor(props: Props) {
        super(props);

        this.materialColors = colors;

        let tmpArrowColor = '#ffffff';
        let rgb = this.hexToRgb(this.materialColors[this.props.baseColor + '500']);
        if ((rgb.r*0.299 + rgb.g*0.587 + rgb.b*0.114) > 186) {
            tmpArrowColor = '#000000';
        }

        console.log(rgb);
        console.log(tmpArrowColor);

        this.state = {
            selectedColor: this.props.selectedLightColor,
            buttonColor: this.materialColors[this.props.baseColor + '500'],
            arrowColor: tmpArrowColor
        }
    }

    selectColor = (selectedLightColor: string) => {
        this.props.onColorSelect(this.materialColors[selectedLightColor]);

        if(this.state.selectedColor === selectedLightColor) {
            this.props.onBack();
        }
    }

    hexToRgb = (hex : string) => {
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
        });

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }


    render() {

        const height = window.screen.height;
        // const width = window.screen.width;

        let keys = Object.keys(this.materialColors); //get keys from object as an array
        let length = this.props.baseColor.length;
        let colorChoices: JSX.Element[] = [];
        keys.forEach(function(key: string) { //loop through keys array
            if(this.props.baseColor === 'blue' && key.substring(0,8) === 'blueGrey') {
                return;
            }

            if(key.substring(0,length) === this.props.baseColor) {
                let tmpTextColor = '#ffffff';
                let rgb = this.hexToRgb(this.materialColors[key]);
                if ((rgb.r*0.299 + rgb.g*0.587 + rgb.b*0.114) > 146) {
                    tmpTextColor = '#000000';
                }

                colorChoices.push(
                    <Paper key={key} onClick={() => this.selectColor(key)} style={{backgroundColor: this.materialColors[key]}} rounded={false} zDepth={0} >
                        <Grid fluid>
                            <Col xs={6}>
                                <h5 style={{color: tmpTextColor, padding: 20}}>{key}</h5>
                            </Col>
                            <Col xs={6}>
                                <h5 style={{color: tmpTextColor, textAlign: 'right', padding: 20}}>{this.materialColors[key]}</h5>
                            </Col>
                        </Grid>
                    </Paper>
                )
            }
        }.bind(this));


        return(
            <MuiThemeProvider muiTheme={darkMuiTheme}>
		<div style={{marginRight: -18+'px'}}>
		        <Grid fluid style={{paddingLeft: 0, paddingRight: 0, width: 100+'%'}}>
		            <Col xs={1} md={1} style={{paddingLeft: 0, paddingRight: 0}}>
		                <RaisedButton
		                    icon={<i className="material-icons">keyboard_arrow_left</i>}
		                    onClick={this.props.onBack}
		                    style={{height: height, color: this.state.arrowColor, width: 100+'%'}}
		                    backgroundColor={this.state.buttonColor}
		                />
		            </Col>
		            <Col xs={11} md={11} style={{overflow: 'hidden', paddingRight: 0, paddingLeft: 0, left: 20+'px'}}>
		                <div style={{height: height-90+'px', overflowY: 'scroll', width: 100+'%'}}>
		                    {colorChoices}
		                </div>
		            </Col>
		        </Grid>
		</div>
            </MuiThemeProvider>
        )

    }
}

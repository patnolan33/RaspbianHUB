import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
const darkMuiTheme = getMuiTheme(darkBaseTheme);
import * as React from 'react';
import { Grid, Col } from 'react-bootstrap';
import * as colors from 'material-ui/styles/colors';
import Paper from 'material-ui/Paper';

import { ColorSelector } from './ColorSelector';

type Props = {
    onChangeColor: (color: string) => void
}


type State = {
    selectedBaseColor?: string,
    showSelections?: boolean,
    selectedLightColor?: string
}

export class CustomColorPicker extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            selectedBaseColor: 'red',
            showSelections: false,
            selectedLightColor: '#F44336'
        }
    }

    showSelections = (color: string) => {
        this.setState({selectedBaseColor: color, showSelections: true})
    }

    handleColorSelect = (lightColor: string) => {
        this.setState({selectedLightColor: lightColor});
        this.props.onChangeColor(lightColor);
    }

    render() {

        return(
            <MuiThemeProvider muiTheme={darkMuiTheme}>
                <Grid fluid style={{paddingLeft: 0, paddingRight: 0}}>
                    {!this.state.showSelections ?
                        <Col xs={12} md={12}>
                            <Col style={{paddingRight: 0, paddingLeft: 0}} xs={3} md={3}>
                                <Paper onClick={() => this.showSelections('red')} style={{backgroundColor: colors.red500}} rounded={false} zDepth={0} >
                                    <h3 style={{padding: 20, margin: 5}}>Red</h3>
                                </Paper>
                            </Col>
                            <Col style={{paddingRight: 0, paddingLeft: 0}} xs={3} md={3}>
                                <Paper onClick={() => this.showSelections('pink')} style={{backgroundColor: colors.pink500}} rounded={false} zDepth={0} >
                                    <h3 style={{padding: 20, margin: 5}}>Pink</h3>
                                </Paper>
                            </Col>
                            <Col style={{paddingRight: 0, paddingLeft: 0}} xs={3} md={3}>
                                <Paper onClick={() => this.showSelections('purple')} style={{backgroundColor: colors.purple500}} rounded={false} zDepth={0} >
                                    <h3 style={{padding: 20, margin: 5}}>Purple</h3>
                                </Paper>
                            </Col>
                            <Col style={{paddingRight: 0, paddingLeft: 0}} xs={3} md={3}>
                                <Paper onClick={() => this.showSelections('deepPurple')} style={{backgroundColor: colors.deepPurple500}} rounded={false} zDepth={0} >
                                    <h3 style={{padding: 20, margin: 5}}>Deep Purple</h3>
                                </Paper>
                            </Col>

                            <Col style={{paddingRight: 0, paddingLeft: 0}} xs={3} md={3}>
                                <Paper onClick={() => this.showSelections('indigo')} style={{backgroundColor: colors.indigo500}} rounded={false} zDepth={0} >
                                    <h3 style={{padding: 20, margin: 5}}>Indigo</h3>
                                </Paper>
                            </Col>
                            <Col style={{paddingRight: 0, paddingLeft: 0}} xs={3} md={3}>
                                <Paper onClick={() => this.showSelections('blue')} style={{backgroundColor: colors.blue500}} rounded={false} zDepth={0} >
                                    <h3 style={{padding: 20, margin: 5}}>Blue</h3>
                                </Paper>
                            </Col>
                            <Col style={{paddingRight: 0, paddingLeft: 0}} xs={3} md={3}>
                                <Paper onClick={() => this.showSelections('lightBlue')} style={{color: 'black', backgroundColor: colors.lightBlue500}} rounded={false} zDepth={0} >
                                    <h3 style={{padding: 20, margin: 5}}>Light Blue</h3>
                                </Paper>
                            </Col>
                            <Col style={{paddingRight: 0, paddingLeft: 0}} xs={3} md={3}>
                                <Paper onClick={() => this.showSelections('cyan')} style={{color: 'black', backgroundColor: colors.cyan500}} rounded={false} zDepth={0} >
                                    <h3 style={{padding: 20, margin: 5}}>Cyan</h3>
                                </Paper>
                            </Col>

                            <Col style={{paddingRight: 0, paddingLeft: 0}} xs={3} md={3}>
                                <Paper onClick={() => this.showSelections('teal')} style={{backgroundColor: colors.teal500}} rounded={false} zDepth={0} >
                                    <h3 style={{padding: 20, margin: 5}}>Teal</h3>
                                </Paper>
                            </Col>
                            <Col style={{paddingRight: 0, paddingLeft: 0}} xs={3} md={3}>
                                <Paper onClick={() => this.showSelections('green')} style={{color: 'black', backgroundColor: colors.green500}} rounded={false} zDepth={0} >
                                    <h3 style={{padding: 20, margin: 5}}>Green</h3>
                                </Paper>
                            </Col>
                            <Col style={{paddingRight: 0, paddingLeft: 0}} xs={3} md={3}>
                                <Paper onClick={() => this.showSelections('lightGreen')} style={{color: 'black', backgroundColor: colors.lightGreen500}} rounded={false} zDepth={0} >
                                    <h3 style={{padding: 20, margin: 5}}>Light Green</h3>
                                </Paper>
                            </Col>
                            <Col style={{paddingRight: 0, paddingLeft: 0}} xs={3} md={3}>
                                <Paper onClick={() => this.showSelections('lime')} style={{color: 'black', backgroundColor: colors.lime500}} rounded={false} zDepth={0} >
                                    <h3 style={{padding: 20, margin: 5}}>Lime</h3>
                                </Paper>
                            </Col>

                            <Col style={{paddingRight: 0, paddingLeft: 0}} xs={3} md={3}>
                                <Paper onClick={() => this.showSelections('yellow')} style={{color: 'black', backgroundColor: colors.yellow500}} rounded={false} zDepth={0} >
                                    <h3 style={{padding: 20, margin: 5}}>Yellow</h3>
                                </Paper>
                            </Col>
                            <Col style={{paddingRight: 0, paddingLeft: 0}} xs={3} md={3}>
                                <Paper onClick={() => this.showSelections('amber')} style={{color: 'black', backgroundColor: colors.amber500}} rounded={false} zDepth={0} >
                                    <h3 style={{padding: 20, margin: 5}}>Amber</h3>
                                </Paper>
                            </Col>
                            <Col style={{paddingRight: 0, paddingLeft: 0}} xs={3} md={3}>
                                <Paper onClick={() => this.showSelections('orange')} style={{color: 'black', backgroundColor: colors.orange500}} rounded={false} zDepth={0} >
                                    <h3 style={{padding: 20, margin: 5}}>Orange</h3>
                                </Paper>
                            </Col>
                            <Col style={{paddingRight: 0, paddingLeft: 0}} xs={3} md={3}>
                                <Paper onClick={() => this.showSelections('deepOrange')} style={{backgroundColor: colors.deepOrange500}} rounded={false} zDepth={0} >
                                    <h3 style={{padding: 20, margin: 5}}>Deep Orange</h3>
                                </Paper>
                            </Col>

                            <Col style={{paddingRight: 0, paddingLeft: 0}} xs={3} md={3}>
                                <Paper onClick={() => this.showSelections('brown')} style={{backgroundColor: colors.brown500}} rounded={false} zDepth={0} >
                                    <h3 style={{padding: 20, margin: 5}}>Brown</h3>
                                </Paper>
                            </Col>
                            <Col style={{paddingRight: 0, paddingLeft: 0}} xs={3} md={3}>
                                <Paper onClick={() => this.showSelections('blueGrey')} style={{backgroundColor: colors.blueGrey500}} rounded={false} zDepth={0} >
                                    <h3 style={{padding: 20, margin: 5}}>Blue Grey</h3>
                                </Paper>
                            </Col>
                            <Col style={{paddingRight: 0, paddingLeft: 0}} xs={3} md={3}>
                                <Paper onClick={() => this.showSelections('grey')} style={{color: 'black', backgroundColor: colors.grey500}} rounded={false} zDepth={0} >
                                    <h3 style={{padding: 20, margin: 5}}>Grey</h3>
                                </Paper>
                            </Col>
                        </Col>
                        :
                        <Col xs={12} md={12}>
                            <ColorSelector
                                baseColor={this.state.selectedBaseColor}
                                onColorSelect={this.handleColorSelect}
                                onBack={() => this.setState({showSelections: false})}
                                selectedLightColor={this.state.selectedLightColor}
                             />
                        </Col>
                    }

                </Grid>
            </MuiThemeProvider>
        )

    }
}

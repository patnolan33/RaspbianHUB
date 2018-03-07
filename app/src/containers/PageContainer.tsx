import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
const darkMuiTheme = getMuiTheme(darkBaseTheme);
import * as React from 'react';

// import { Weather } from '../components/Weather';
import { Weathrly } from '../components/weathrly/lib/Weathrly/Weathrly';
import { Lights } from '../components/Lights';
import { Calendar } from '../components/Calendar';


type Props = {
    activePage?: number
}


type State = {
}

export class PageContainer extends React.Component<Props, State> {
    //motionSensor: any;
    constructor(props: Props) {
        super(props);

        this.state = {
        }
    }

    componentDidMount(){
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

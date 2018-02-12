import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
const darkMuiTheme = getMuiTheme(darkBaseTheme);
import * as React from 'react';

import { Weather } from '../components/Weather';
import { Lights } from '../components/Lights';
import { Calendar } from '../components/Calendar';


type Props = {
    activePage?: number
}


type State = {
}

export class PageContainer extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
        }
    }

    render() {

        const width = window.screen.width;
        const height = window.screen.height;
        const parentStyle = {height: height + 'px', width: width + 'px'};

        return(
            <MuiThemeProvider muiTheme={darkMuiTheme}>
                <div style={parentStyle}>
                    {this.props.activePage === 0 &&
                        <Weather />
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

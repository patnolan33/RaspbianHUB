import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
const darkMuiTheme = getMuiTheme(darkBaseTheme);
import * as React from 'react';

type Props = {
}


type State = {
}

export class Calendar extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
        }
    }

    render() {

        const width = window.screen.width;
        const height = window.screen.height - 150;
        const parentStyle = {height: height + 'px', width: width + 'px'};

        return(
            <MuiThemeProvider muiTheme={darkMuiTheme}>
                <webview id="calendar" src={"https://calendar.google.com/"} style={parentStyle}></webview>
            </MuiThemeProvider>
        )

    }
}




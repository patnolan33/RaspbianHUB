import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
const darkMuiTheme = getMuiTheme(darkBaseTheme);
import * as React from 'react';


type Props = {
    hourlyWeatherData: any
}


type State = {
}

export class HourlyTable extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
        }
    }

    componentDidMount() {
        console.log("Weather for day...");
        console.log(this.props.hourlyWeatherData);
    }

    render() {

        return(
            <MuiThemeProvider muiTheme={darkMuiTheme}>
                <div>
                    <p>TODO: HOURLY TABLE</p>
                </div>
            </MuiThemeProvider>
        )

    }
}

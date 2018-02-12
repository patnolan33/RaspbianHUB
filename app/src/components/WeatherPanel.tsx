import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
const darkMuiTheme = getMuiTheme(darkBaseTheme);
import * as React from 'react';

// import * as moment from 'moment';

import Paper from 'material-ui/Paper';
import { HourlyTable } from './HourlyTable';
import { getWeatherIcon } from '../util/WeatherIcons';

type Props = {
    day: any,
    currentWeatherData: any,
    hourlyWeatherData: any
}


type State = {
    icon?: any,
    dayNight?: 'day' | 'night'
}

export class WeatherPanel extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        let dayNight: 'day' | 'night' = "day";
        let now = new Date().getTime()/1000;
        if(now >= this.props.currentWeatherData.sys.sunset || now < this.props.currentWeatherData.sys.sunrise) {
            dayNight = "night";
        }

        this.state = {
            dayNight: dayNight,
            icon: getWeatherIcon(this.props.currentWeatherData.weather[0].main, dayNight)
        }
    }

    componentDidMount() {
    }


    render() {

        return(
            <MuiThemeProvider muiTheme={darkMuiTheme}>
                    <Paper zDepth={1} style={{flexGrow: 0, flexShrink: 0, flexBasis: '10000px'}}>
                        {/* Day name and date */}
                        <h1>{this.props.day}</h1>

                        {/* Icon */}
                        <p><i className={this.state.icon}></i></p>

                        {/* Tempurature */}
                        <p>{this.props.currentWeatherData.main.temp}</p>

                        {/* High vs Low temps */}
                        <p>{this.props.currentWeatherData.main.temp_min + " / " + this.props.currentWeatherData.main.temp_max}</p>

                        {/* Precipitation chance */}
                        <p>TODO: Get precipitation chance</p>

                        {/* Wind and wind direction */}
                        <p>{this.props.currentWeatherData.wind.speed + " mph at " + this.props.currentWeatherData.wind.deg + " degrees"}</p>

                        {/* Hourly breakdown (table??) */}
                        <HourlyTable hourlyWeatherData={this.props.hourlyWeatherData} />
                    </Paper>
            </MuiThemeProvider>
        )
    }
}

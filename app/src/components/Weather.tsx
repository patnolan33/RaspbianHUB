import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
const darkMuiTheme = getMuiTheme(darkBaseTheme);
import * as React from 'react';

import * as request from 'request';
// import * as moment from 'moment';

import { WeatherPanel } from './WeatherPanel';
// import { Grid, Col } from 'react-bootstrap';

type Props = {
}


type State = {
    USState?: string,
    city?: string,
    apiKey?: string,
    currentWeather?: any,
    days?: any
}

export class Weather extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);


        // TODO: Use weather underground instead, their API looks more full featured.
        //          - Look into search bar (see: https://github.com/dstock48/weathrly for an example)
        //              - I'll want to switch between cities
        //          - Figure out how webcams can be shown. Maybe a button to trigger webcam view from the detailed
        //              view of a day? I.e. default to 10 day forecast, and when clicked into the day, give
        //              summary and, when available, hourly and webcam views
        this.state = {
            USState: "DC",
            city: "Washington",
            apiKey: 'c932c6a292907528',
            currentWeather: {},
            days: {}
        }
    }

    componentDidMount() {
        this.getWeatherData();
    }

    getWeatherData = () => {
        let apiKey = this.state.apiKey;
        let usState = this.state.USState;
        let city = this.state.city;
        // let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial&precipitation=yes`
        let url = 'http://api.wunderground.com/api/'+ apiKey +'/forecast10day/hourly10day/geolookup/conditions/q/' + usState + '/' + city + '.json';
        request(url, function (err: any, response: any, body: any) {
            if(err){
                console.log('error:', err);
            } else {
                let weather = JSON.parse(body);
                console.log("Current WEATHER: ");
                console.log(weather);
                this.setState({currentWeather: weather});
            }
        }.bind(this));
    }

    render() {
        const height = window.screen.height;
        const width = window.screen.width;

        const weatherPanels = Object.keys(this.state.days).map( (day, index) => (
            <WeatherPanel key={day}
                day={day}
                currentWeatherData={this.state.currentWeather}
                hourlyWeatherData={this.state.days[day]}
            />
        ));

        return(
            <MuiThemeProvider muiTheme={darkMuiTheme}>
                <div style={{maxWidth: width, overflow: 'hidden'}}>
                    <div style={{display: "flex", flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'nowrap', overflowX: 'scroll', height: height}}>
                            {weatherPanels}
                    </div>
                </div>
            </MuiThemeProvider>
        )
    }
}

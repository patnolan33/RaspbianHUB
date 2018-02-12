import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
const darkMuiTheme = getMuiTheme(darkBaseTheme);
import * as React from 'react';

import * as request from 'request';
import * as moment from 'moment';

import { WeatherPanel } from './WeatherPanel';
// import { Grid, Col } from 'react-bootstrap';

type Props = {
}


type State = {
    city?: string,
    apiKey?: string,
    currentWeather?: any,
    days?: any
}

export class Weather extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            city: "district of columbia",
            apiKey: '630019d2e0a9a5e84ed405126d17b006',
            currentWeather: {},
            days: {}
        }
    }

    componentDidMount() {
        this.getCurrentData();
        this.getHourlyData();
    }

    getCurrentData = () => {
        let apiKey = this.state.apiKey;
        let city = this.state.city;
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial&precipitation=yes`
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

    getHourlyData = () => {
        let apiKey = this.state.apiKey;
        let city = this.state.city;
        let url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`
        request(url, function (err: any, response: any, body: any) {
            if(err){
                console.log('error:', err);
            } else {
                let weather = JSON.parse(body);
                console.log("Hourly WEATHER: ");
                console.log(weather);

                this.groupWeatherByDay(weather.list);

            }
        }.bind(this));
    }

    groupWeatherByDay = (list: any[]) => {
        const days: any = {} // use Map as need we to maintain insertion order

        list.forEach( (entry) => {
            // const day = moment(entry.dt*1000).local().format("dddd MMMM Do YYYY");
            const day = moment(entry.dt*1000).local().format("dddd");
            if( !days[day] ) {
                days[day] = [];
            }
            days[day].push(entry);
        })

        // console.log("DAYS: ");
        // console.log(days);
        this.setState({days});
    }

    render() {
        const height = window.screen.height;
        const width = window.screen.width;

        const weatherPanels = Object.keys(this.state.days).map( (day, index) => (
            <WeatherPanel key={day} day={day} currentWeatherData={this.state.currentWeather} hourlyWeatherData={this.state.days[day]}/>
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

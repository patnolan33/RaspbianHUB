import * as React from 'react';
import { AsideForecast } from './components/AsideForecast/AsideForecast';
import { ForecastDetail } from './components/ForecastDetail/ForecastDetail';
import { ErrorView } from './components/ErrorView/ErrorView';
import { WelcomeView } from './components/WelcomeView/WelcomeView';
// import dataDenver from './data.js';  // eslint-disable-line
import './Weathrly.css';
import City from '../model/City';
// import key from '../utils/apiKey';
import Trie from '../utils/Trie';
import cities from '../utils/largest1000cities';
import '../index.css';

type Props = {
}

type State = {
  welcomeMsg?: boolean,
  isNotFound?: boolean,
  cityData?: any,
  tabName?: string,
  city?: string,
  selectedDay?: string,
  selectedMonth?: string,
  trie?: Trie
}

export class Weathrly extends React.Component<Props, State> {
  key: string;

  constructor(props: Props) {
    super(props);
    this.state = {
      welcomeMsg: false,
      isNotFound: false,
      cityData: {},
      tabName: 'Hourly',
      city: localStorage.getItem('location') || 'no location',
      selectedDay: '',
      selectedMonth: '',
      trie: new Trie(),
    };

    this.key = 'c932c6a292907528';
  }

  componentDidMount() {
    this.updateWeatherData(this.state.city);
    this.state.trie.populate(cities.data);
  }

  getDayHandler(e: any) {
    this.setState({
      selectedDay: e.day,
      selectedMonth: e.month,
      tabName: '24 Hourly',
    });
  }

  setLocation(city: string) {
    this.state.trie.insert(city);
    this.state.trie.select(city);
    this.setState({ city });
    localStorage.setItem('location', city);
    this.updateWeatherData(city);
  }

  changeTab(e: any) {
    const tabName = e.target.textContent;
    this.setState({ tabName });
  }

  updateWeatherData(city: string) {
    const url = `http://api.wunderground.com/api/${this.key}/astronomy/conditions/hourly/forecast/forecast10day/hourly10day/geolookup/webcams/q/${city}.json`;  // eslint-disable-line
    if (city !== 'no location') {
      fetch(url)
      .then(res => res.json())
      .then((data) => {


    console.log(data);

        const cityData = new (City as any)(data);
        this.setState({ cityData, isNotFound: false });
      })
      .catch(() => {
        this.setState({ isNotFound: true });
        localStorage.location = '';
      });
      // const cityData = new City(dataDenver);
      // this.setState({ cityData });
    }
  }

  render() {
    const { cityData, tabName, isNotFound, selectedDay, selectedMonth, trie } = this.state;


    if (!localStorage.location) {
      return (
        <WelcomeView
          trie={trie}
          data={cityData}
          handler={this.changeTab.bind(this)}
          locationHandler={this.setLocation.bind(this)}
        />
      );
    }

    if (isNotFound) {
      return (
        <ErrorView
          trie={trie}
          data={cityData}
          handler={this.changeTab.bind(this)}
          locationHandler={this.setLocation.bind(this)}
        />
      );
    }

    return (
      <section className="Weathrly">
        <AsideForecast
          data={cityData}
        />
        <ForecastDetail
          trie={trie}
          data={cityData}
          tabName={tabName}
          handler={this.changeTab.bind(this)}
          locationHandler={this.setLocation.bind(this)}
          getDay={this.getDayHandler.bind(this)}
          selectedDay={selectedDay}
          selectedMonth={selectedMonth}
        />
      </section>
    );
  }
}

export default Weathrly;

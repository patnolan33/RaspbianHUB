import * as React from 'react';
import weatherIcons from '../../../utils/weather-icons';
import colorCondition from '../../../utils/colorCondition';
import './AsideForecast.css';

type Props = {
  data: any
}
type State = {
}

export class AsideForecast extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
    }
  }

  render() {
    if (!this.props.data.locationInfo) {
      return (
        <section className="AsideForecast" />
      );
    }

    if (!this.props.data.condition) {
      this.props.data.condition = 'Unknown';
    }

    const highLow = `${this.props.data.highTemp}° / ${this.props.data.lowTemp}°`;
    const iconColor = (colorCondition as any)[this.props.data.condition].iconColor;
    let backgroundGradient = (colorCondition as any)[this.props.data.condition].style;
    let icon = `./weathrly/assets/weather-icons/${iconColor}/${(weatherIcons as any)[this.props.data.icon]}.svg`;

    if (this.props.data.icon === 'clear' && parseInt(this.props.data.curTemp, 10) < 50) {
      backgroundGradient = colorCondition['Partly Cloudy'].style;
    }

    if (this.props.data.currentHour >= this.props.data.sunSetTime || this.props.data.currentHour <= this.props.data.sunRiseTime) {
      icon = `./weathrly/assets/weather-icons/white/${(weatherIcons as any)[`nt_${this.props.data.icon}`]}.svg`;
      backgroundGradient = colorCondition.night.style;
    }

    return (
      <aside className="AsideForecast" style={backgroundGradient}>
        <div className="top">
          <h1 className="city">{this.props.data.locationInfo.full}</h1>
          <h2 className="current-time">{this.props.data.lastUpdateTime}</h2>
        </div>
        <div className="middle">
          <p className="current-temp">{this.props.data.curTemp}<span className="deg">&deg;</span></p>
          <img className="weather-icon" src={icon} alt="weather condition icon" />
          <p className="weather-condition">{this.props.data.condition}</p>
          <p className="hi-low">{highLow}</p>
        </div>
        <div className="bottom">
          <p className="weather-summary">{this.props.data.forecastDisc}</p>
        </div>
      </aside>
    );
  }
}

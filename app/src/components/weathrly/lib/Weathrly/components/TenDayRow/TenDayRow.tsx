import * as React from 'react';
import weatherIcons from '../../../utils/weather-icons';
import colorCondition from '../../../utils/colorCondition';
import { getAccentColor, getIcon } from '../../../utils/helperFunctions';
import './TenDayRow.css';

type Props = {
  dayData: any,
  data: any,
  getDay: (dayData: any) => void
}
type State = {
}

export class TenDayRow extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
    }
  }

  render() {

    const accentColor = (colorCondition as any)[this.props.data.condition].accentColor;
    const tempColor = getAccentColor(accentColor, this.props.data);
    const icon = getIcon(weatherIcons, this.props.dayData, this.props.data);
    const highLow = `${this.props.dayData.highTemp}° / ${this.props.dayData.lowTemp}°`;
    const dayMonth = `${this.props.dayData.month} ${this.props.dayData.day}`;

    return (
      <article onClick={() => this.props.getDay(this.props.dayData)} className="TenDayRow">
        <p className="month-date">{dayMonth}</p>
        <p className="day">{this.props.dayData.dayName}</p>
        <p className="condition">{this.props.dayData.condition}</p>
        <div className="row-sec">
          <img src={icon} alt="" className="hourly-icon" />
          <p style={tempColor} className="hi-low-temp">{highLow}</p>
        </div>
      </article>
    );
  }
}

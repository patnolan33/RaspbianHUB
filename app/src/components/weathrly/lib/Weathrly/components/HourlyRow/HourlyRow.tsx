import * as React from 'react';
import weatherIcons from '../../../utils/weather-icons';
import colorCondition from '../../../utils/colorCondition';
import { getAccentColor, getIcon } from '../../../utils/helperFunctions';
import './HourlyRow.css';

type Props = {
  hourData: any,
  data: any
}
type State = {
}

export class HourlyRow extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
    }
  }

  render() {
    const accentColor = (colorCondition as any)[this.props.data.condition].accentColor;
    const tempColor = getAccentColor(accentColor, this.props.data);
    const icon = getIcon(weatherIcons, this.props.hourData, this.props.data);

    return (
      <article className="HourlyRow">
        <p className="time">{this.props.hourData.time}</p>
        <p className="condition">{this.props.hourData.condition}</p>
        <div className="row-sec">
          <img src={icon} alt="" className="hourly-icon" />
          <p style={tempColor} className="hourly-temp">{`${this.props.hourData.temp}°`}</p>
        </div>
      </article>
    );
  }
}

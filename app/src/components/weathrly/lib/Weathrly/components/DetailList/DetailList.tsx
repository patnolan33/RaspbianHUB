import * as React from 'react';
import { HourlyRow } from '../HourlyRow/HourlyRow';
import { TenDayRow } from '../TenDayRow/TenDayRow';
import colorCondition from '../../../utils/colorCondition';
import { getRandomKey } from '../../../utils/helperFunctions';
import './DetailList.css';

type Props = {
  data: any,
  tabName: string,
  handler: () => void,
  getDay: (data: any) => void,
  selectedDay: any,
  selectedMonth: any
}
type State = {
}

export class DetailList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
    }
  }

  render() {
    if (!this.props.data.sevenHourData) {
      return <section className="DetailList" />;
    }

    const accentColor = (colorCondition as any)[this.props.data.condition].accentColor;
    const sevenHourData = this.props.data.sevenHourData.map((hour: any) =>
      <HourlyRow
        key={getRandomKey()}
        hourData={hour}
        data={this.props.data}
      />);
    const tenDayData = this.props.data.tenDayData.map((hour:any) =>
      <TenDayRow
        key={getRandomKey()}
        getDay={this.props.getDay}
        dayData={hour}
        data={this.props.data}
      />);
    const twentyFourData = this.props.data.twentyFourData
      .filter((e: any) => e.day === this.props.selectedDay)
      .map((hour: any) =>
        <HourlyRow
          key={getRandomKey()}
          hourData={hour}
          data={this.props.data}
        />);

    let borderColor = { borderColor: accentColor };

    if (this.props.data.currentHour >= this.props.data.sunSetTime || this.props.data.currentHour <= this.props.data.sunRiseTime) {
      borderColor = { borderColor: '#7438B8' };
    }

    let hourlyTab;
    let tenDayTab;
    let twentyFourTab;
    let tabs;
    let dataView;

    switch (this.props.tabName) {
      case 'Hourly':
        hourlyTab = <a key="tab-1" style={borderColor} onClick={this.props.handler} className="tab tab-active">Hourly</a>;
        tenDayTab = <a key="tab-2" onClick={this.props.handler} className="tab">10 Day</a>;
        twentyFourTab = <a key="tab-3" className="tab">{this.props.selectedMonth} {this.props.selectedDay}</a>;
        dataView = sevenHourData;
        tabs = [hourlyTab, tenDayTab];
        break;
      case '10 Day':
        hourlyTab = <a key="tab-1" onClick={this.props.handler} className="tab">Hourly</a>;
        tenDayTab = <a key="tab-2" style={borderColor} onClick={this.props.handler} className="tab tab-active">10 Day</a>;
        dataView = tenDayData;
        tabs = [hourlyTab, tenDayTab];
        break;
      case '24 Hourly':
        hourlyTab = <a key="tab-1" onClick={this.props.handler} className="tab">Hourly</a>;
        tenDayTab = <a key="tab-2" onClick={this.props.handler} className="tab">10 Day</a>;
        twentyFourTab = <a key="tab-3" style={borderColor} className="tab tab-active">{this.props.selectedMonth} {this.props.selectedDay}</a>;
        dataView = twentyFourData;
        tabs = [hourlyTab, tenDayTab, twentyFourTab];
        break;
      default:
    }

    return (
      <section className="DetailList">
        <nav className="list-tabs">
          {tabs}
        </nav>
        <section className="list" style={{marginRight: -22+'px', marginBottom: -22+'px'}}>
          {dataView}
        </section>
      </section>
    );
  };

}

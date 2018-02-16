import * as React from 'react';
import { DetailList } from '../DetailList/DetailList';
import SearchInput from '../SearchInput/SearchInput';
import './ForecastDetail.css';

type Props = {
  data: any,
  tabName: string,
  handler: () => void,
  locationHandler: any,
  input?: any,
  getDay: () => void,
  selectedDay: any,
  selectedMonth: any,
  trie: any
}
type State = {
}

export class ForecastDetail extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
    }
  }

  render() {
    return (
      <main className="ForecastDetail">
        <SearchInput
          trie={this.props.trie}
          data={this.props.data}
          handler={this.props.locationHandler}
          input={this.props.input}
        />
        <DetailList
          selectedDay={this.props.selectedDay}
          selectedMonth={this.props.selectedMonth}
          getDay={this.props.getDay}
          data={this.props.data}
          tabName={this.props.tabName}
          handler={this.props.handler}
        />
      </main>
    );
  }

}
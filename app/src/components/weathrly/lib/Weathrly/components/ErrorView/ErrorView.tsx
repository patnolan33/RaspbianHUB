import * as React from 'react';
import SearchInput from '../SearchInput/SearchInput';
import './ErrorView.css';

type Props = {
  data: any,
  locationHandler: any,
  trie: any,
  handler: any
}
type State = {
}

export class ErrorView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
    }
  }

  render() {
    return (
      <section className="ErrorView">
        <span className="emoji">🌩 😭 🌩</span>
        <h1 className="error-msg">Not Found!</h1>
        <p className="error-sub-msg">Try again...</p>
        <SearchInput
          trie={this.props.trie}
          errorClass={true}
          data={this.props.data}
          handler={this.props.locationHandler}
          accentColor={'#3a405d'}
        />
      </section>
    );
  }
}


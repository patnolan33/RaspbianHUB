import * as React from 'react';
import SearchInput from '../SearchInput/SearchInput';
import './WelcomeView.css';

type Props = {
  data: any,
  locationHandler: (val: string) => void,
  trie: any,
  handler: any
}
type State = {
}

export class WelcomeView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
    }
  }

  render() {

    return (
      <section className="WelcomeView">
        <div className="cloud-container">
          <img alt="cloud" id="cloud1" className="clouds" src="./weathrly/assets/clouds1.png" />
          <img alt="cloud" id="cloud2" className="clouds" src="./weathrly/assets/clouds2.png" />
          <img alt="cloud" id="cloud3" className="clouds" src="./weathrly/assets/clouds3.png" />
          <img alt="cloud" id="cloud1" className="cloudsL" src="./weathrly/assets/clouds1.png" />
          <img alt="cloud" id="cloud2" className="cloudsL" src="./weathrly/assets/clouds2.png" />
          <img alt="cloud" id="cloud3" className="cloudsL" src="./weathrly/assets/clouds3.png" />
        </div>
        <h1 className="logo">WEATHRLY</h1>
        <span className="emoji">😄</span>
        <h1 className="welcome-msg">Welcome!</h1>
        <p className="welcome-sub-msg">Enter your location</p>
        <SearchInput
          trie={this.props.trie}
          errorClass={true}
          data={this.props.data}
          handler={this.props.locationHandler}
        />
      </section>
    )
  }
}

import * as React from 'react';
import './WebCamPanel.css';

type Props = {
  data: any
}
type State = {
}

export class WebCamPanel extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
    }
  }

  render() {

    return (
      <article className="WebCamPanel">
          <webview src={this.props.data.CURRENTIMAGEURL} className="WebCamPanel"></webview>
      </article>
    );
  }
}

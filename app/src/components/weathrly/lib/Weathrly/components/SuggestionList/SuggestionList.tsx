import * as React from 'react';
import { getRandomKey } from '../../../utils/helperFunctions';
import './SuggestionList.css';

type Props = {
  suggestions: any[],
  selectHandler: any
}
type State = {
}

export class SuggestionList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
    }
  }

  render() {
    const suggestionsArray = this.props.suggestions.slice(0, 5).map((e: any) =>
      // <option value={e} key={getRandomKey()} className="suggestion" />
     <li key={getRandomKey()} className="suggestion" onClick={() => this.props.selectHandler(e)}>
       <button className="suggestion-btn">{e}</button>
     </li>
    );

    return (
     <section id="SuggestionList" className="SuggestionList">
       {suggestionsArray}
     </section>

      // <datalist id="SuggestionList" className="SuggestionList">
      //   {suggestionsArray}
      // </datalist>
    );
  }
}

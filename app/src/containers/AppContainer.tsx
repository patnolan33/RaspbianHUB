import * as React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
const darkMuiTheme = getMuiTheme(darkBaseTheme);

import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import * as colors from 'material-ui/styles/colors';

import { PageContainer } from './PageContainer';

type Props = {
}

type State = {
  openDrawer?: boolean,
  selectedPage?: number
}

export default class AppContainer extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      openDrawer: false,
      selectedPage: 2
    }
  }

  componentDidMount(){
  }

  handleDrawerAction = (action: string) => {
    console.log("Drawer action: " + action);
  }

  changePage = (index: number) => {
    this.setState({selectedPage: index});
  }


  render() {

    const width = window.screen.width;
    const height = window.screen.height;
    const parentStyle = {height: height + 'px', width: width + 'px'};


    return (
        <MuiThemeProvider muiTheme={darkMuiTheme}>
          <div style={parentStyle}>

            <PageContainer
              activePage={this.state.selectedPage}
             />

            <Paper zDepth={1} style={{position: 'absolute', bottom: 0, width: width + 'px', borderTop: 'solid', borderTopColor: colors.grey800}}>
              <BottomNavigation selectedIndex={this.state.selectedPage}>
                <BottomNavigationItem
                  label="Weather"
                  icon={<i className="material-icons">cloud</i>}
                  onClick={() => this.changePage(0)}
                />
                <BottomNavigationItem
                  label="Calendar"
                  icon={<i className="material-icons">today</i>}
                  onClick={() => this.changePage(1)}
                />
                <BottomNavigationItem
                  label="Lights"
                  icon={<i className="material-icons" style={{transform: 'rotate(180deg)'}}>wb_incandescent</i>}
                  onClick={() => this.changePage(2)}
                />
              </BottomNavigation>

            </Paper>
          </div>
        </MuiThemeProvider>
    );
  }
}

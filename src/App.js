import React, { Component } from "react";
import Layout from "./Containers/Layout/Layout";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
// import Editor from './Components/Editor/Editor'
// import OdaIdentify from './Components/OdaIdentify/OdaIdentify'
class App extends Component {
  render() {
    const theme = createMuiTheme({
      palette: {
        primary: {
          light: "#757ce8",
          main: "#1db954",
          dark: "#191414",
          contrastText: "#fff"
        },
        secondary: {
          light: "#ff7961",
          main: "#ffffff",
          dark: "#191414",
          contrastText: "#000"
        }
      },
      typography: {
        useNextVariants: true
      }
    });

    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <CssBaseline>
            <Layout
              style={{
                fontFamily:
                  "spotify-circular,Helvetica Neue,Helvetica,Arial,Hiragino Kaku Gothic Pro,Meiryo,MS Gothic,sans-serif"
              }}
            />
          </CssBaseline>
        </MuiThemeProvider>
         {/* <Switch>
              <Route path='/coreography' component={Editor} />
              <Route path='/odaIdentify' component={OdaIdentify} />
          </Switch> */}
      </div>
    );
  }
}

export default App;

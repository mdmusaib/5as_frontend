import React from "react";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import muiTheme from "../src/theme/defaultTheme";
import globalStyles from "../src/theme/GlobalCss";

const InnerProvider = ({children}) => {
  globalStyles();
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      {children}
    </MuiPickersUtilsProvider>
  );
};

const MuiDecorator = storyFn => {
  return (
    <ThemeProvider theme={createMuiTheme(muiTheme)}>
      <InnerProvider>{storyFn()}</InnerProvider>
    </ThemeProvider>
  );
};

export default MuiDecorator;

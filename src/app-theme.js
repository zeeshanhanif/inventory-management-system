import getMuiTheme from 'material-ui/styles/getMuiTheme';
//import {blue600, grey900} from 'material-ui/styles/colors';
//import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
/*
//Custom Theme to change UI at application level
const CustomTheme = getMuiTheme({
  palette: {
  },
  appBar: {
    height: 57,
    color: blue600
  },
  drawer: {
    width: 230,
    color: grey900
  },
  raisedButton: {
    primaryColor: blue600,
  }
});
*/
function AppTheme(){
  return getMuiTheme(lightBaseTheme);
  //return CustomTheme;
}

export default AppTheme();

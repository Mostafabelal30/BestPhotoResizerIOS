import { AppRegistry } from 'react-native';
import React, { Component } from 'react';
//import App from './App';
import { StackNavigator } from 'react-navigation';
 import Home from './screens/Home';
 import Splash from './screens/splash';
  import ResizeImage from './screens/ResizeImage';
 import CropImage from './screens/CropImage';
// import ResultResizedImage from './screens/ResultResizedImage';
export const Stack=StackNavigator({
    Splash:{screen:Splash},
     Home:{screen:Home},
     ResizeImage:{screen:ResizeImage},
     CropImage:{screen:CropImage},
    //ResultResizedImage:{screen:ResultResizedImage}
    })
    export default class Best_Photo_Resizer extends Component {
        render() {
          const { navigation } = this.props;
          return (
            <Stack navigation={ navigation }/>
          );
        }
      }
AppRegistry.registerComponent('Best_Photo_Resizer', () => Best_Photo_Resizer);

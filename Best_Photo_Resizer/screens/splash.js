/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions
} from 'react-native';

var deviceWidth = Dimensions.get('window').width;
var deviceHight = Dimensions.get('window').height;
import { NavigationActions } from "react-navigation";

export default class Splash extends Component {
    constructor(props) {
        super(props); 
//       this.showBookDetail = this.showBookDetail.bind(this);
    }

 static navigationOptions = {
    title: 'Welcome',
header: null
  };
    componentWillMount () {
      //const { navigate } = props.navigation;
      const { navigate } = this.props.navigation;

      setTimeout (() => this.props
      .navigation
      .dispatch(NavigationActions.reset(
        {
           index: 0,
           actions: [
             NavigationActions.navigate({ routeName: 'Home'})
           ]
         })), 2000); 
            }
  render() {
    return (
      <View style={styles.container}>
    <Image source={{uri: 'resize'}} style={styles.thumbnail} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  thumbnail:
  {
      zIndex:2,
      width:deviceWidth,
      height:deviceHight*.5,
  

  },
});

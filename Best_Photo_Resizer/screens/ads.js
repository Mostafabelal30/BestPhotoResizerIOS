import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  TouchableHighlight,
} from 'react-native';
import { AdMobBanner } from 'react-native-admob';
var deviceWidth = Dimensions.get('window').width;
var deviceHight = Dimensions.get('window').height;
export default class Main extends Component {

  constructor(props) {
    super(props);
    this.didReceiveAd = this.didReceiveAd.bind(this);
    this.state = {
      adsize:'largeBanner'
    }
  }
   componentDidMount() {
   //  alert(deviceHight)
     if(deviceHight<600)
     {
       this.setState({adsize:"banner"})
     }
     else 
     {
      this.setState({adsize:"largeBanner"})
     }
    // alert(deviceWidth)
  //   AdMobRewarded.setTestDeviceID('cb004b2871e5e35a');
  //   AdMobRewarded.setAdUnitID('ca-app-pub-3940256099942544/1033173712');

  //   AdMobRewarded.addEventListener('rewardedVideoDidRewardUser',
  //     (type, amount) => console.log('rewardedVideoDidRewardUser', type, amount)
  //   );
  //   AdMobRewarded.addEventListener('rewardedVideoDidLoad',
  //     () => console.log('rewardedVideoDidLoad')
  //   );
  //   AdMobRewarded.addEventListener('rewardedVideoDidFailToLoad',
  //     (error) => console.log('rewardedVideoDidFailToLoad', error)
  //   );
  //   AdMobRewarded.addEventListener('rewardedVideoDidOpen',
  //     () => console.log('rewardedVideoDidOpen')
  //   );
  //   AdMobRewarded.addEventListener('rewardedVideoDidClose',
  //     () => {
  //       console.log('rewardedVideoDidClose');
  //       AdMobRewarded.requestAd((error) => error && console.log(error));
  //     }
  //   );
  //   AdMobRewarded.addEventListener('rewardedVideoWillLeaveApplication',
  //     () => console.log('rewardedVideoWillLeaveApplication')
  //   );

  //   AdMobRewarded.requestAd((error) => error && console.log(error));
  // }

  // componentWillUnmount() {
  //   AdMobRewarded.removeAllListeners();
  // }

  // showRewarded() {
  //   AdMobRewarded.showAd((error) => error && console.log(error));
  }
  bannerError(error)
  {
    //alert(error);
  }
  didReceiveAd(asd)
  {
    //alert(asd);
    //console.log(asd);
  }

  render() {
    return (
      // <View style={styles.container}>
      //   <View style={{ flex: 1 }}>
      <View style ={styles.container}>
    <AdMobBanner
      style={{bottom:deviceHight*.02,position:'absolute'}}
      // bannerSize="banner"
      adSize={(deviceHight<600)  ? "banner" : "largeBanner"}

        adUnitID="ca-app-pub-3729227462465765/9667596606"
        testDeviceID=""
        didFailToReceiveAdWithError={this.bannerError} 
        adViewDidReceiveAd={this.didReceiveAd}
       />
</View>
   
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: (Platform.OS === 'ios') ? 30 : 10,
    flex: 1,
    alignItems: 'center',
  },
  button: {
    color: '#333333',
    marginBottom: 15,
  },
});

module.exports = Main;
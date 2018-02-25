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
  CameraRoll,
  TouchableOpacity,
  NativeModules,
  Dimensions
} from 'react-native';

var deviceWidth = Dimensions.get('window').width;
var deviceHight = Dimensions.get('window').height;
import { NavigationActions } from "react-navigation";
import Ads from "./ads";
var ImagePicker = NativeModules.ImageCropPicker;
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
} from 'react-native-admob'
AdMobInterstitial.setAdUnitID('ca-app-pub-3729227462465765/3330608334');
AdMobInterstitial.setTestDevices([""]);
export default class Splash extends Component {
    constructor(props) {
        super(props); 
    
//       this.showBookDetail = this.showBookDetail.bind(this);
this.state = {
  imagenumber:'',
  image: null,
  images: '',
}

    }
    
    componentDidMount() {

     
     AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
    
      // CameraRoll.getPhotos({first:1000 }).then((photos) => {
      //       //alert(photos.edges.length)
      //       this.setState({imagenumber:photos.edges.length})
    
      //     //  photos.edges.map(i => {
      //     //      RNFetchBlob.fs.readFile( i.node.image.uri, 'base64')
      //     //   .then((data) => {
      //     //     //alert("asd")
      //     //       var decodedData = base64.decode(data);
      //     //       var bytes=decodedData.length;
      //     //       if(bytes < 1024) alert(bytes + " Bytes");
      //     //       else if(bytes < 1048576) alert("KB:"+(bytes / 1024).toFixed(3) + " KB");
      //     //       else if(bytes < 1073741824) alert("MB:"+(bytes / 1048576).toFixed(2) + " MB");
      //     //       else alert((bytes / 1073741824).toFixed(3) + " GB");
      //     //   })
      //     // })
      //   })
    }

 static navigationOptions = {
    title: 'Welcome',
header: null
  };

  pickSingleWithCamera(cropping) {
    ImagePicker.openCamera({
      cropping: cropping,
      width: 500,
      height: 500,
      compressImageMaxWidth:1000,
      compressImageMaxHeight:1000,
      mediaType:"photo",
     // multiple: true,
    }).then(images => {
      
      this.setState({
        image: null,
        images: {uri: images.path, width: images.width, height: images.height},

      });
      this.props.navigation.navigate('ResizeImage',{ images:this.state.images}) 
    }).catch((err) => { alert(err) });
  }

  pickMultiple() {
    ImagePicker.openPicker({
    //  multiple: true,
    compressImageMaxWidth:1000,
    compressImageMaxHeight:1000,
      mediaType:"photo",
      waitAnimationEnd: false
    }).then(images => {
      this.setState({
        image: null,
        images: {uri: images.path, width: images.width, height: images.height,sourceURL:images.sourceURL},        

      });
      //alert(this.state.images.sourceURL)      
      this.props.navigation.navigate('ResizeImage',{ images: this.state.images})      // alert(ind)
      // alert(this.state.images.count())
      // alert(this.state.images[0].height+"  width"+this.state.images[0].width)
    }).catch((err) => { return });
  }

  renderImage(image) {

    return <Image resizeMode='contain' style={{ width: deviceWidth * .2, marginLeft: deviceWidth * .01, justifyContent: 'flex-end', height: deviceHight * .1, resizeMode: 'contain' }} source={image} />
  }

  renderAsset(image) {
    if (image.mime && image.mime.toLowerCase().indexOf('video/') !== -1) {
      return this.renderVideo(image);
    }

    return this.renderImage(image);
  }
  
  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>

            <Image source={{uri: 'bitmap'}} resizeMode='contain' style={styles.thumbnail} />
<View style={styles.text_left}>
      {/* <Text style={styles.save_space}>Save space</Text>
      <Text style={styles.oversize}>you have {this.state.imagenumber} oversize</Text> */}

      <Text style={styles.save_space}>Resize Photo</Text>
      <Text style={styles.oversize}>Take a photo by camera or select one from the gallery</Text>
      </View>
      <View style={styles.gallery_camera}>
      <View style={{ justifyContent: 'center',alignItems: 'center',width:deviceWidth*.4}}>
      <TouchableOpacity onPress={() => this.pickSingleWithCamera(false)} style={styles.button}>
      <View style={styles.camera_view}>
      <Image source={{uri: 'shape'}} resizeMode='contain' style={styles.camera} />
      </View>
      </TouchableOpacity>
      </View>
      <View style={{ justifyContent: 'center',alignItems: 'center',width:deviceWidth*.4}}>
      <TouchableOpacity onPress={() => this.pickMultiple()} style={styles.button}>
      <View style={styles.camera_view}>
      <Image source={{uri: 'shape1'}} resizeMode='contain' style={styles.camera} />
      </View>
      </TouchableOpacity>
      </View>
    </View>
    <Ads/>
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
    width:deviceWidth,
    height:deviceHight,

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
      width:deviceWidth*.82,
      height:deviceHight*.4,
      top:deviceHight*.05
  },
  camera:
  {
    width:deviceWidth*.1,
    height:deviceHight*.056,
  },
  
  save_space:
  {
      textAlign:'left',
      fontSize:deviceWidth*.06,
      color:"black",
      height:deviceHight*.05,
      fontWeight: "bold",
      textAlign:"left"

  },
  oversize:
  {
    textAlign:'left',
    fontSize:deviceWidth*.035,
    color:"gray",
    height:deviceHight*.07,
    textAlign:"left"

  },
  gallery_camera:
  {
    flexDirection:'row',
    alignItems:"center",
    justifyContent:"center",
   // height:deviceHight*.3
   //paddingTop:deviceHight*.1
  },
  camera_view:
  {
      width:deviceWidth*.35,
      height:deviceHight*.13,
      borderRadius: 6,
      borderWidth:1,
      borderColor:"red",
      alignItems:"center",
      justifyContent:"center",
      //marginLeft:deviceWidth*.02

  },
  text_left:
  {
      width:deviceWidth*.8,
      height:deviceHight*.15,
     // alignItems:"center",
      justifyContent:"center",
     

  }

});

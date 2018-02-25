
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  CameraRoll,
  Alert,
  ImageStore,
  NativeModules,
} from 'react-native';
//import Switch from 'react-native-material-switch';
var deviceWidth = Dimensions.get('window').width;
var deviceHight = Dimensions.get('window').height;
import { NavigationActions } from "react-navigation";
// import FileSystem from 'react-native-filesystem';
// var RNFS = require('react-native-fs');
var RNFetchBlob = require('react-native-fetch-blob').default
import ImageResizer from 'react-native-image-resizer';
import ModalPicker from 'react-native-modal-picker'
var base64 = require('base-64');
import Popup from 'react-native-popup';

import Modal from 'react-native-modal'
var ImagePicker = NativeModules.ImageCropPicker;
import Ads from "./ads";
// const dirPicutures = `${RNFS.DocumentDirectoryPath}/Pictures`;

export default class App extends Component {

    constructor(props) {
        super(props); 
        const { images } = this.props.navigation.state.params;
        
this.state = {
    textInputValue: 'Choose Size',
    textInputValue2: 'Social Use',
    size: [],
    resizedImageUri: '',
    cropImage:'',
    cropWidth:200,
    cropHeight:200,
    isModalVisible: false,
    deleteModalVisible:false,
    resultImage:'',
    customizeResize:'',
    //active:false,
    width:'width',
    height:'height',
    sizeImage:'',
    buttonShow:true,
    imageUri:images.uri,
    status:""

}
    }

    componentWillMount() {
  this.resizePresentage()
  
  
    }
   

 static navigationOptions = {
    title: 'Welcome',
header: null
  };
  renderImage(image) {
        return <Image  style={{ width: deviceWidth * .81, height: deviceHight * .42,top:deviceHight*.07,borderRadius:10}} source={image} />
      }
    
      renderAsset(image) {
        if (image.mime && image.mime.toLowerCase().indexOf('video/') !== -1) {
          return this.renderVideo(image);
        }
        return this.renderImage(image);
      }


  notFoundImage() {  
     
    // this.popup.confirm({
    //     title: 'Not Found image or image is deleted',
    //     content: ['image not found or image is deleted please choose other image'],
    //     ok: {
    //       text: 'OK',
    //       style: {
    //         color: 'red'
    //       },
    //       callback: () => {
    //       //  this.popup.alert('Good!');
    //       this.props.navigation.navigate('Home') 
    //       },
    //     },
    //     // cancel: {
    //     //   text: 'N',
    //     //   style: {
    //     //     color: 'blue'
    //     //   },
    //     //   callback: () => {
    //     //     this.popup.alert('Hurry up！');
    //     //   },
    //     // },
    //   });

      this.popup.tip({
        title: 'Not Found Photo',
        content: ['Original Photo was deleted. Please select another Photo.'],
        btn: {
          text: 'OK',
          style: {
            color: 'red'
          },
          callback: () => {
            this.props.navigation.navigate('Home')          },
        },
      });
    }
      

    numberBetween() {  
  
 
       this.popup.tip({
         title: 'Enter correct number',
         content: ['Please enter a number between 0 and 100.'],
         btn: {
           text: 'OK',
           style: {
             color: 'red'
           },
           callback: () => {
            // this.props.navigation.navigate('Home')    
                  },
         },
       });
     }
    resizePresentage() {
      const { images } = this.props.navigation.state.params;
        let index = 0;
        const data = [
          { key: index++, label: '10%' },
          { key: index++, label: '20%' },
          { key: index++, label: '30%' },
          { key: index++, label: '40%' },
          { key: index++, label: '50%' },
          { key: index++, label: '60%' },
          { key: index++, label: '70%' },
          { key: index++, label: '80%' },
          { key: index++, label: '90%' },
          { key: index++, label: '100%' },
        ];
       this.setState({ size: [] });
        data.map(i => {
          ImageResizer.createResizedImage(images.uri, ((images.width) * parseInt(i.label.replace('%', '')) / 100), ((images.height) * parseInt(i.label.replace('%', '')) / 100), 'JPEG', 90)
            .then((uri) => {
              
        this.setState({
          size: this.state.size.concat([uri.size])
        })
        this.setState({size:this.state.size.sort((num1, num2) => num1 < num2 ? -1 : 1)})
            }).catch((err) => {
              // alert(err);
              // return Alert.alert('Unable to resize the photo',  
              //   'Check the console for full the error message');
            });
          })
      }

      resize(text) {
    const { images } = this.props.navigation.state.params;
    if(text=="customize")
    {
      this.setState({ isModalVisible: true })
    }
    else if(parseInt(text)>0 && parseInt(text)<101){
        ImageResizer.createResizedImage(images.uri, ((images.width) * parseInt(text.substring(0, 4).replace('%', '')) / 100), 
        ((images.height) * parseInt(text.substring(0, 4).replace('%', '')) / 100), 'JPEG',90)
          .then((Response) => {
            this.setState({
              resultImage: Response,
            });
            this.setState({imageUri:Response.uri})
            this.setState({width:((images.width) * parseInt(text.substring(0, 4).replace('%', '')) / 100)+"px",height: ((images.height) * parseInt(text.substring(0, 4).replace('%', '')) / 100)+"px"})            
            this.getSizeResizedImage()
            this.setState({isModalVisible:false})
            this.setState({buttonShow:false})
            this.setState({status:"2"})
           //this._handlePressImage();
         // this.props.navigation.navigate('ResultResizedImage',{ resizedImageUri:this.state.resizedImageUri,images,active:this.state.active})
           
          }).catch((err) => {
            this.notFoundImage()
           // alert("image not found or image is deleted please choose other image");
            //this.props.navigation.navigate('Home')            
            // return Alert.alert('Unable to resize the photo',
            //   'Check the console for full the error message');
          });
        }
        else
        {
          
            this.setState({ isModalVisible:false })
           // alert("Please enter a number between 0 and 100")
           this.numberBetween();
      
          
        }
      }
      _handlePressImage() {

        var uri = this.state.resultImage.uri;
            var promise = CameraRoll.saveToCameraRoll(uri);
            promise.then(function (result) {
            }).catch(function (error) {
              // alert('save failed ' + error);
            });
          
          }

          cropLast() {

            const { images } = this.props.navigation.state.params;
            if (!images) {
              return Alert.alert('No image', 'Before open cropping only, please select image');
            }
            ImagePicker.openCropper({
              path: images.uri,
              cropperCircleOverlay:false,
              width: this.state.cropWidth,
              height: this.state.cropHeight,
              compressImageMaxWidth:1000,
              compressImageMaxHeight:1000
            }).then(resultImage => {
              this.setState({imageUri:resultImage.path})              
              this.setState({
                resultImage: {uri: resultImage.path, width: resultImage.width, height: resultImage.height, mime: resultImage.mime},        
              });
              this.setState({status:"1"})
              this.setState({width:this.state.resultImage.width+"px",height:this.state.resultImage.height+"px"})
              this.getSizeImage()
              this.setState({buttonShow:false})
             // this.saveCropImage()
             // this.props.navigation.navigate('CropImage',{ cropImage:this.state.cropImage,images,active:this.state.active}) 
            }).catch(e => {
              if(e=="Error: User cancelled image selection")
              {
                
              }
              // alert("image not found or image is deleted please choose other image");
              // console.log(e);
              // this.props.navigation.navigate('Home')
              else
              {
                this.notFoundImage()
              }
              
              
              //Alert.alert(e.message ? e.message : e);
            });
          }

          getSizeImage() {
         //   const { resultImage } = this.props.navigation.state.params;
                RNFetchBlob.fs.readFile(this.state.resultImage.uri, 'base64')
                  .then((data) => {
                    this.setState({imageBase64:data})
                    var decodedData = base64.decode(data);
                    var bytes = decodedData.length;
                    if (bytes < 1024) 
                    this.setState({sizeImage:bytes + " Bytes"})
                    else if (bytes < 1048576)
                    this.setState({sizeImage:(bytes / 1024).toFixed(3) + " KB"})
                    else if (bytes < 1073741824) 
                    //alert("MB:" + (bytes / 1048576).toFixed(2) + " MB");
                    this.setState({sizeImage:(bytes / 1048576).toFixed(3) + " MB"})
                    else 
                  //  alert((bytes / 1073741824).toFixed(3) + " GB");
                    this.setState({sizeImage:(bytes / 1073741824).toFixed(3) + " GB"})
                  })
            
              }

              getSizeResizedImage() {
                //alert("assssss")

                    if(this.state.resultImage.size<1024)
                    this.setState({sizeImage:this.state.resultImage.size + " Bytes"})
                    else if (this.state.resultImage.size < 1048576)
                     this.setState({sizeImage:(this.state.resultImage.size/ 1024).toFixed(3) + " KB"})
                     else if (this.state.resultImage.size < 1073741824) 
                     this.setState({sizeImage:(this.state.resultImage.size / 1048576).toFixed(2) + " MB"});
                     else 
                     this.setState({sizeImage:(this.state.resultImage.size / 1073741824).toFixed(3) + " GB"});
            
                
                  }

          saveCropImage()
          {
            var uri = this.state.cropImage.uri;
            var promise = CameraRoll.saveToCameraRoll(uri);
            promise.then(function (result) {
              }).catch(function (error) {
               // alert('save failed ' + error);
              });
          }

          setWidthHeight(socialFlag)
          {
            if(socialFlag=="1")
            {
              //facebook profile picture
              //Profile Picture: 180 x 180 pixels
              this.setState({ cropWidth:400,cropHeight:400}, () =>setTimeout(()=>this.cropLast(),500) );
            }
           else if(socialFlag=="2")
            {
               //facebook cover photo
              //Cover Photo: 828 x 315
              this.setState({ cropWidth:828,cropHeight:315}, () =>setTimeout(()=>this.cropLast(),500) );
            }
            else if(socialFlag=="3")
            {
              //facebook post photo
              //Shared Image: 1 200 x 630 pixels
              this.setState({ cropWidth:1200,cropHeight:630},() =>setTimeout(()=>this.cropLast(),500) );
            }
            if(socialFlag=="4")
            {
              //twitter profile picture
              //Profile Photo: 400 x 400 pixels
              this.setState({ cropWidth:400,cropHeight:400}, () =>setTimeout(()=>this.cropLast(),500) );
            }
           else if(socialFlag=="5")
            {
              //twitter header
              //Header Photo: 1 500 x 500 pixels
              this.setState({ cropWidth:1500,cropHeight:500}, () =>setTimeout(()=>this.cropLast(),500));
            }

            else if(socialFlag=="6")
            {
              //twitter post photo
              //Tweeted Image size: 1200 x 675 
              this.setState({ cropWidth:1200,cropHeight:675}, () =>setTimeout(()=>this.cropLast(),500));
            }
            if(socialFlag=="7")
            {
              //instgram profile picture
              //Profile Picture: 110 x 110 pixels
              this.setState({ cropWidth:400,cropHeight:400}, () =>setTimeout(()=>this.cropLast(),500) );
            }
           else if(socialFlag=="8")
            {
               //instgram post photo
              //Photo Size: 1080 x 1080 pixels
              this.setState({ cropWidth:1080,cropHeight:1080},() =>setTimeout(()=>this.cropLast(),500) );
            }
          }


          // deleteFile() {
          //   const { images } = this.props.navigation.state.params;
          //   let path = images.sourceURL.replace('file://','');
          //   let arr = path.split('/')
          //   const dirs = RNFetchBlob.fs.dirs
          //   filePath = `${dirs.DCIMDir}/${arr[arr.length - 1]}`
          //  alert(path)
          //   RNFetchBlob.fs.exists(path)
          //   .then( (result) => {
          //      // alert(result);
        
          //       if(result){
          //         return  RNFetchBlob.fs.unlink(path)
          //         .then(() => {
          //           //ImageStore.removeImageForTag(path)

          //           //RNFetchBlob.fs.scanFile([{ path: path, mime: path.mime }])
          //          // this.setState({deleteModalVisible:false})
          //           this.setState({active:false})
          //         })
          //         .catch((err) => { alert(err) })
          //       }
        
          //     })
          //     .catch((err) => {
          //      // console.log(err.message);
          //     });
           
          // }

          save()
          {
            if(this.state.textInputValue=="Choose Size"&&this.state.textInputValue2=="Social Use")
            {
                alert("Please select an action (choose size or social use)")
            }
            else
            {

          
            //save image 
            // if(this.state.active)
            // {
            //   this._handlePressImage()
            //   this.deleteFile()
            //   this.setState({textInputValue:"Choose Size"})
            //   this.setState({textInputValue2:"Social Use"})              
            //   this.props.navigation.navigate('CropImage',{ resultImage:this.state.resultImage})
            // }
            // else{
              this._handlePressImage()
              this.setState({textInputValue:"Choose Size"})
              this.setState({textInputValue2:"Social Use"}) 
              this.props.navigation.navigate('CropImage',{ resultImage:this.state.resultImage,status:this.state.status})
            // }
          }
            //delete orginal image or not
            //go to result screen
          }

  render() {
    const { images } = this.props.navigation.state.params;
    const { navigate } = this.props.navigation;
    let index = 0;
    const data = [
        { key: index++, label: '10%  ' + parseInt(isNaN(this.state.size[0]) ? 0 : this.state.size[0] / 1024) + "  KB" },
        { key: index++, label: '20%  ' + parseInt(isNaN(this.state.size[1]) ? 0 : this.state.size[1] / 1024) + "  KB"},
        { key: index++, label: '30%  ' + parseInt(isNaN(this.state.size[2]) ? 0 : this.state.size[2] / 1024) + "  KB"},
        { key: index++, label: '40%  ' + parseInt(isNaN(this.state.size[3]) ? 0 : this.state.size[3] / 1024) + "  KB"},
        { key: index++, label: '50%  ' + parseInt(isNaN(this.state.size[4]) ? 0 : this.state.size[4] / 1024) + "  KB"},
        { key: index++, label: '60%  ' + parseInt(isNaN(this.state.size[5]) ? 0 : this.state.size[5] / 1024) + "  KB"},
        { key: index++, label: '70%  ' + parseInt(isNaN(this.state.size[6]) ? 0 : this.state.size[6] / 1024) + "  KB"},
        { key: index++, label: '80%  ' + parseInt(isNaN(this.state.size[7]) ? 0 : this.state.size[7] / 1024) + "  KB"},
        { key: index++, label: '90%  ' + parseInt(isNaN(this.state.size[8]) ? 0 : this.state.size[8] / 1024) + "  KB"},
        { key: index++, label: '100%  ' + parseInt(isNaN(this.state.size[9]) ? 0 : this.state.size[9] / 1024) + "  KB"},
         { key: index++, label: 'customize' },
      ];

      const data2 = [
        { key: index++, section: true, label:"Facebook"},
        { key: index++, label: 'Profile Picture',flag:"1" },
        { key: index++, label: 'Cover Photo',flag:"2" },
        { key: index++, label: 'Post Photo',flag:"3" },
        { key: index++, section: true, label:"Twitter" },
        { key: index++, label: 'Profile Picture',flag:"4" },
        { key: index++, label: 'Header',flag:"5" },
        { key: index++, label: 'Post Photo',flag:"6" },
        { key: index++, section: true, label:"Instgram" },
        { key: index++, label: 'Profile Picture',flag:"7" },
        { key: index++, label: 'Post Photo',flag:"8" },
      ];
        return (
      <View style={styles.container}>
        <Modal style={{alignItems:"center"}} onBackdropPress={() => this.setState({ isModalVisible: false })} isVisible={this.state.isModalVisible}>
          <View style={styles.modalViewResize}>
          <Text style={{fontSize:deviceWidth*.04}}>Type Percentage :</Text>
          <View style={{flexDirection:"row",alignItems:"center"}}>
            <TextInput keyboardType={"phone-pad"} ref={(el) => { this.customizeResize = el; }} 
            underlineColorAndroid="transparent" style={styles.modalTextInput}
            onChangeText={(customizeResize) => this.setState({ customizeResize })}
            value={this.state.customizeResize}/>
            <Text style={{fontSize:deviceWidth*.07}}>%</Text>
         </View>
         <View style={{flexDirection:"row"}}>
         <TouchableOpacity onPress={()=> this.resize(this.state.customizeResize)}>
      <View style={styles.button}>
        <Text>Resize</Text>
      </View>
    </TouchableOpacity>
    </View>
          </View>
          
        </Modal>

        {/* <Modal onBackdropPress={() => this.setState({ deleteModalVisible: false })} isVisible={this.state.deleteModalVisible}>
          <View style={styles.modalView}>
          
            <Text style={{fontSize:deviceWidth*.04,color:'rgba(157, 157, 157, 1)'}}>sure you delete original image?</Text>
            <View style={{flexDirection:"row"}}>
         <TouchableOpacity onPress={()=> this.deleteFile()}>
      <View style={styles.button}>
        <Text>Yes</Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=> this.setState({deleteModalVisible:false,active:false})}>
      <View style={styles.button}>
        <Text>No</Text>
      </View>
    </TouchableOpacity>
    </View>
          </View>
          
        </Modal> */}
            <Image  style={{ width: deviceWidth * .81, height: deviceHight * .4,top:deviceHight*.05,borderRadius:10}} source={{uri: this.state.imageUri}} />
            
            <View style={styles.modal}>
          
         
            <View style={styles.selectModalContainer}>
            <ModalPicker
                data={data}
                style={styles.selectModalComponent}
                initValue="Select something yummy!"
                onChange={(option) => { this.setState({ textInputValue: option.label,textInputValue2:"Social Use" }),this.resize(option.label) }} />

            <TextInput
            style={{ borderWidth: 1, fontSize: deviceWidth * .04, borderColor: 'rgba(219, 219, 219, 1)', width: deviceWidth * .35, padding: 10, height: deviceHight * .07, textAlign: 'left',color:'black',borderRadius:5,borderWidth:2 }}
            editable={false}
                placeholder="Select something yummy!"
                value={this.state.textInputValue}
               />
               <Image style={styles.listImage} resizeMode='contain' source={{uri: 'list'}} />


        </View>
        
             <Text style={styles.or}>OR</Text>
             <View style={styles.selectModalContainer}>
            <ModalPicker
                data={data2}
                style={styles.selectModalComponent}
                initValue="Select something yummy!"
                onChange={(option) => { this.setState({ textInputValue2: option.label,textInputValue:"Choose Size" }), this.setWidthHeight(option.flag)}}/>

            <TextInput
            style={{ borderWidth: 1, fontSize: deviceWidth * .04, borderColor: 'rgba(219, 219, 219, 1)', width: deviceWidth * .35, padding: 10, height: deviceHight * .07, textAlign: 'left',color:'black',borderRadius:5,borderWidth:2 }}
            editable={false}
                placeholder="Select something yummy!"
                value={this.state.textInputValue2}
               />
               <Image style={styles.listImage} resizeMode='contain' source={{uri: 'list'}} />


        </View>
           
          </View>
          <Text style={styles.Dimension}>Dimension : {this.state.width} x  {this.state.height} ({this.state.sizeImage})</Text>
          {/* <View style={styles.block}>
            <Switch
              active={this.state.active}
              buttonRadius={Math.floor(deviceHight*.015)}
              switchHeight={Math.floor(deviceHight*.025) }
              activeBackgroundColor='#ef5d5d'
              inactiveBackgroundColor='rgba(34, 31, 31, 0.26)'
              activeButtonColor='#FF9393'
              activeButtonPressedColor='#ef5d5d'
              inactiveButtonColor='#f1f1f1'
              inactiveButtonPressedColor='#f1f1f1'
              switchWidth={Math.floor(deviceWidth*.11)}
              onActivate={()=>this.setState({active:true})}
              onDeactivate={()=>this.setState({active:false})}
              />
              <Text style={styles.blockText}>Delete the original photo?</Text>

        </View> */}

        <View style={styles.saveView}>

            <TouchableOpacity 
            onPress={ () => this.save()}  
            disabled={this.state.buttonShow}
                          activeOpacity={ 0.75 }
                           style={this.state.buttonShow  ? styles.disabledbutton : styles.goToWeb} >
                     <Text  style={styles.ButtonText}>Save</Text>
                
      </TouchableOpacity>
      </View>
            <Ads/>
            <Popup ref={popup => this.popup = popup }/>

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
  modal:
  {
      flexDirection:"row",
      height:deviceHight*.2,
      alignItems:"center",
      justifyContent:"flex-end"
  },
  ModalPicker1:
  {
      width:deviceWidth*.4,
      height:deviceHight*.1,
      alignItems:"center",
      justifyContent:"flex-end",
      left:deviceWidth*.03,
  },
  ModalPicker2:
  {
      width:deviceWidth*.4,
      height:deviceHight*.1,
      alignItems:"center",
      justifyContent:"flex-end",
      left:deviceWidth*.01,
  },
  Switch:
  {
      width:deviceWidth*.4,
      height:deviceHight*.1,
      padding:10
  },
  block: {
    flexDirection:"row",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    //marginTop:deviceHight*.08
  },
  blockText: {
    marginBottom: 10,
    fontSize:deviceWidth*.035,
    marginLeft:deviceWidth*.05
  },
  or:
  {
    fontSize:deviceWidth*.05,
    textAlign:"center",
    marginTop:deviceHight*.04
    
  },
  modalView:
  {
    backgroundColor: 'white',
    padding: 22,
    width:deviceWidth*.8,
    height:deviceHight*.2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalViewResize:
  {
    backgroundColor: 'white',
    padding: 22,
    width:deviceWidth*.5,
    height:deviceHight*.2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',

  },
  button: {
    backgroundColor: '#FF9393',
    //padding: 22,
    width:deviceWidth*.2,
    height:deviceHight*.05,
    marginTop: deviceHight*.02,
    marginLeft:deviceWidth*.02,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: '#FF9393',
  },
  modalTextInput:
  {
    width:deviceWidth*.2,
    height:deviceHight*.07,
    borderBottomColor: 'rgba(239, 93, 93, 1)',
    borderBottomWidth:2,
    fontSize:deviceWidth*.05,
  },
  listImage:
  {
    width:deviceWidth*.04,
    height:deviceHight*.015,
   // position:"absolute",
    top:deviceHight*.03,
    left:deviceWidth* -.07,
   //zIndex:99
  },
  ButtonText:
  {
      color:'#ffffff',
      textAlign:'center',
      fontSize:deviceWidth*.05,
      // height:deviceHight*.04,
      // width:deviceWidth*.5,
  },
  saveView:
  {
      height:deviceHight*.1,
      alignItems:"center",
      justifyContent:"center"
  },
  goToWeb:
  {
      alignItems:'center',
      backgroundColor: "#ef5d5d",
      width:deviceWidth*.577,
      height:deviceHight*.07,
      alignItems:"center",
      justifyContent:"center",
     borderRadius:5,
  },
  disabledbutton:
  {
    alignItems:'center',
    backgroundColor: "gray",
    width:deviceWidth*.577,
    height:deviceHight*.07,
    alignItems:"center",
    justifyContent:"center",
   borderRadius:5,

  },
  Dimension:
  {
    fontSize:deviceWidth*.04,
    height:deviceHight*.05,
    color:'black'
  },
  selectModalContainer: {
    position: 'relative',
    flexDirection:"row",
    width: deviceWidth*.4,
    height: deviceHight*.1,
    marginTop:deviceHight*.07,
    left:deviceWidth*.03
  },
  selectModalComponent: {
    position: 'absolute',
    opacity: 0,
    zIndex: 2,
    width:deviceWidth*.4,
    height:deviceHight*.1,
    alignItems:"center",
    justifyContent:"flex-end",
    //left:deviceWidth*.03,
  },
  inputStyleSelectModal: {
    position: 'absolute',
    zIndex: 1,
    borderWidth: 1,
    fontSize: deviceWidth * .04,
    borderColor: 'rgba(219, 219, 219, 1)',
    width: deviceWidth * .35,
    height: deviceHight * .07,
    textAlign: 'left',
    color:'black',
    borderRadius:5,
  }
});

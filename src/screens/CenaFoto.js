import React, { Component } from 'react';
import { StyleSheet,
         Text,
         TouchableOpacity,
         View, Image, 
         CameraRoll, 
         PermissionsAndroid } from 'react-native';

import { RNCamera } from 'react-native-camera';

export default class App extends Component {
  static navigationOptions = {
        header: null
      };

  constructor(props) {
        super(props);

        this.requestExternalStoragePermission();
    }


  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, fixOrientation: true };
      const data = await this.camera.takePictureAsync(options);
      CameraRoll.saveToCameraRoll(data.uri);
    }
  };

  requestExternalStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'My App Storage Permission',
          message: 'My App needs access to your storage ' +
            'so you can save your photos',
        },
      );
      return granted;
    } catch (err) {
      console.error('Failed to request permission ', err);
      return null;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={camera => {
            this.camera = camera;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          autoFocus={RNCamera.Constants.AutoFocus.on}
          flashMode={RNCamera.Constants.FlashMode.off}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={
            'We need your permission to use your camera phone'
          }
        />
        <View style={styles.buttonContainer}>
         <View style={{ flex: 1.2 }}>
          <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
            <Image style={{ height: 60, width: 60 }} source={{ uri: 'https://cdn.pixabay.com/photo/2016/02/25/05/36/button-1221338_960_720.png' }} />
          </TouchableOpacity>
          </View>
          <View styles={{ flex: 0.4 }}>
          <TouchableOpacity onPress={() => this.props.navigation.pop()} style={styles.capture2}>
            <Text style={styles.buttonText}>VOLTAR</Text>
          </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#000'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  buttonContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  capture: {
    padding: 1,
    paddingHorizontal: 25,
    alignSelf: 'flex-end',
    margin: 20
  },

  capture2: {
    padding: 1,
    paddingTop: 20,
    margin: 20,
    justifyContent: 'center',
    alignSelf: 'flex-end' 
  },

  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff'
  },

  ImageContainer: {
      height: 65,
      width: 65
  }
});

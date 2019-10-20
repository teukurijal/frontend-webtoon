import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';

const options = {
  title: 'Select Photo',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export default class EditProfileScreen extends Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    headerTitle: 'Edit Proe',
    headerLeft: null,
    headerRight: (
      <Icon
        name="check"
        style={{marginRight: 20, fontSize: 25}}
        onPress={() => this.handleUpload()}
      />
    ), // () => navigation.navigate('ProfileScreen')
  });

  constructor(props) {
    super(props);

    this.state = {
      photo: '',
      inputName: '',
      isChangingPhoto: false,
    };
  }

  handleUpload() {
    axiosInstance({
      method: 'POST',
      url: `/user/${1}/upload`,
      //body:
    }).then(result => {
      this.setState({toons: result.data});
    });
  }
  componentDidMount() {
    if (this.state.isChangingPhoto) {
      var newphoto = this.state.photo;
      newphoto.image = this.state.avatarSource.uri;
      newphoto.name = this.state.inputName;
      this.setState({
        photo: newphoto,
        isChangingPhoto: false,
      });
    }
  }

  // componentDidUpdate (){
  //     if(this.state.isChangingPhoto){

  //         var newphoto = this.state.photo
  //         newphoto.image = this.state.avatarSource.uri
  //         newphoto.name = this.state.inputName
  //         this.setState({
  //             photo: newphoto,
  //             isChangingPhoto:false
  //         });
  //     }
  //   }

  handleProfile() {
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};

        console.log(source);
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          photo: source,
          isChangingPhoto: true,
        });
      }
    });
  }

  handleInputName(text) {
    this.setState({
      inputName: text,
    });
  }

  render() {
    const {photo} = this.state;
    return (
      <View style={styles.center}>
        <View style={styles.textcontainer}>
          <Image
            style={{
              width: 165,
              height: 165,
              borderRadius: 200 / 2,
              overflow: 'hidden',
              borderWidth: 3,
              borderColor: 'black',
            }}
            source={{uri: photo.uri}}
          />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity style={{bottom: 25, left: 68}}>
            <Icon
              name="camera"
              size={25}
              color="#000000"
              onPress={this.handleProfile.bind(this)}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.passwordcontainer}>
          <TextInput
            style={{padding: 0, fontSize: 30, textAlign: 'center'}}
            onChangeText={this.handleInputName.bind(this)}
            value={this.state.inputName}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  emailcontainer: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 5,
    marginVertical: 5,
    marginHorizontal: 5,
    elevation: 5,
    borderRadius: 20,
    flexDirection: 'row',
  },
  passwordcontainer: {
    backgroundColor: '#ffffff',
    padding: 5,
    marginTop: 10,
    marginHorizontal: 5,
    elevation: 3,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    //   flex: 1,
    //   justifyContent: 'center'
  },
  logincontainer: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 10,
    marginVertical: 60,
    marginHorizontal: 90,
    justifyContent: 'center',
    elevation: 8,
    borderRadius: 30,
  },
  logintext: {
    fontSize: 32,
    justifyContent: 'center',
  },
  textcontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0,
    marginTop: 40,
  },
  btn1: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 50,
    elevation: 4,
    marginHorizontal: 80,
    marginVertical: 40,
    alignItems: 'center',
  },
  btn2: {
    padding: 20,
    backgroundColor: '#F35959',
    borderRadius: 50,
    elevation: 9,
    marginHorizontal: 80,
    marginVertical: 40,
    alignItems: 'center',
  },
});

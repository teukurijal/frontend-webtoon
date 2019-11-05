import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  AsyncStorage,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';

const options = {
  title: 'Select Photo',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

class EditProfileScreen extends Component {
  

  constructor(props) {
    super(props);

      this.state = {
        photo:'',
        user_id:'',
        token:''
    };
  }
  

  createFormData = (photo, body) => {
    const data = new FormData();
  
    data.append('profile', {
      name: photo.fileName,
      type: photo.type,
      uri:
        Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
    });
  
    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });
  
    return data;
  };
  
  handleUploadPhoto = () => {
    fetch(`http://192.168.1.28:3000/api/v1/user/1/upload`, {
    method: "PUT",
    body: this.createFormData(this.state.photo, { userId: "123" })
  })
      .then(response => console.log(response))
      .then(response => {
        console.log("upload succes", response);
        this.props.navigation.navigate('ProfileScreen',{photo: this.state.photo})
        //alert("Upload success!");
        //this.setState({ photo: null });
      })
      .catch(error => {
        console.log("upload error", error);
        alert("Upload failed!");
      });
  };

  componentDidMount = async () => {
    // alert(this.props.name)
    this.props.navigation.setParams({
      headerRight:(<Icon
        name="check"
        style={{marginRight: 20, fontSize: 25}}
        onPress={this.handleUploadPhoto}
      />)
    })
    this.setState({
      id: await AsyncStorage.getItem('Userid'),
    });
    // alert(this.state.id)
  }

  handleDataUser = async () => {
    try {
      const datauser = await AsyncStorage.getItem('Datauser');
      const user = JSON.parse(datauser);
      this.setState({
        user_id : user.id,
        token: user.token
      })
    } catch (error) {
      console.log(error);
    }
  }

  handleChoosePhoto () {
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({ photo: response })
      }
    })
  }

  handleInputName(text) {
    this.setState({
      inputName: text,
    });
  }

  static navigationOptions = ({navigation, screenProps}) => ({
    headerTitle: 'Edit Profile',
    headerLeft: null,
    headerRight: 
    navigation.state.params && navigation.state.params.headerRight
  });

  render() {
    const { photo } = this.state;
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
            source={{ uri: photo.uri }}
          />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity style={{bottom: 25, left: 68}}>
            <Icon
              name="camera"
              size={25}
              color="#000000"
              onPress={this.handleChoosePhoto.bind(this)}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.passwordcontainer}>
          <TextInput
            style={{ fontSize: 30, textAlign: 'center'}}
            onChangeText={this.handleInputName.bind(this)}
            editable={true}
            defaultValue={this.props.name}
          />
        </View>
        <View style={styles.passwordcontainer}>
          <TextInput
            style={{ fontSize: 18, textAlign: 'center'}}
            // onChangeText={this.handleInputName.bind(this)}
            editable={true}
            defaultValue={this.props.email}
          />
        </View>
      </View>
    );
  }
}

const MapStateToProps = state => ({
  name: state.users.data.name,
  email: state.users.data.email
})

export default connect(
MapStateToProps
)(EditProfileScreen)

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
    borderBottomWidth:0.5,
    marginHorizontal:40,
    flexDirection: 'row',
    // alignItems: 'center',
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

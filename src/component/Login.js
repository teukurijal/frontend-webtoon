import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import axiosInstance from '../service/baseUrl';
import {AsyncStorage} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-easy-toast'
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      useremail: '',
      password: '',
      showPass: true,
      validatedemail: false,
      validatedpass: false,
      loading: false,
    };
  }

  componentDidMount() {
    SplashScreen.hide();
  }

  handleSubmit = () => {
    if (this.state.validatedemail && this.state.validatedpass) {
      axiosInstance({
        method: 'POST',
        url: '/login',
        data: {
          email: this.state.useremail,
          password: this.state.password,
        },
      })
        .then(response => {
          //console.log(response);
          AsyncStorage.setItem('Token', response.data.token);
          this.props.navigation.navigate('ForYou');
        })
        .catch(error => {
          alert(error);
          //console.log(error);
        });
      } else {
        this.refs.toast.show('Wrong Email or Password');
    }
  };

  handleVisibelpassword() {
    this.setState({
      showPass: !this.state.showPass,
    });
  }

  handleEmail(useremail) {
    this.state.useremail = useremail;

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(useremail) === true) {
      this.setState({
        validatedemail: true,
      });
    } else {
      this.setState({
        validatedemail: false,
      });
    }
  }

  handlePassword = text => {
    this.setState({password: text});
    if (text == '') {
      this.setState({
        validatedpass: false,
      });
    } else {
      this.setState({
        // password: text,
        validatedpass: true,
      });
    }
  };

  render() {
    const disableLogin = true
    ////console.log(this.props.navigation)

    return (
      <KeyboardAvoidingView  style={styles.container} behavior="padding" enabled>
        <Toast 
          ref="toast"
          style={{backgroundColor:'#E04A3A'}}
          />
        <View style={styles.logoContainer}>
          <Image
            style={{
              width: 180,
              height: 101
            }}
            source={require('@assets/webtoon.png')}
          />
          <Text style={{fontSize: 13, color: 'rgba(0,0,0,0.7)', marginTop: 7}} >Global Digital Free Comics Service Platform</Text>
        </View>

        <View style={styles.emailcontainer}>
          <TextInput
            onChangeText={useremail => this.handleEmail(useremail)}
            value={this.state.useremail}
            style={{padding: 12}}
            placeholder="Enter your email"></TextInput>
        </View>

        <View style={styles.passwordcontainer}>
          <View style={{flex: 4.5}}>
            <TextInput
              onChangeText={text => this.handlePassword(text)}
              secureTextEntry={this.state.showPass}
              value={this.state.password}
              style={{padding: 12}}
              placeholder="Enter your Password"
            />
          </View>

          <View style={{flex: 1}}>
            <TouchableOpacity onPress={this.handleVisibelpassword.bind(this)}>
              {this.state.showPass ? (
                <Icon
                  style={{padding: 15}}
                  name="eye-with-line"
                  size={20}
                  color="#000000"
                />
              ) : (
                <Icon
                  style={{padding: 15}}
                  name="eye"
                  size={20}
                  color="#000000"
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <TouchableOpacity
            onPress={this.handleSubmit.bind(this)} //() => this.props.navigation.navigate('ForYou')
            disabled={disableLogin ? false : true}
            style={disableLogin ? styles.btn2 : styles.btn1}>
            <Text style={{fontSize: 18, color: 'white'}}>Login</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Register')}>
          <Text style={{fontSize: 11, color: 'grey', alignSelf: 'center'}}>
            don't have an account?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{alignItems: 'center', marginTop: 40}}
          onPress={() => this.props.navigation.navigate('ForYou')}>
          <Text style={{fontSize: 20, color: 'grey'}}>Skip >></Text>
        </TouchableOpacity>
      </KeyboardAvoidingView >
    );
  }
}

export default Login;

const styles = StyleSheet.create({
  emailcontainer: {
    width: '80%',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 5,
    marginVertical: 5,
    elevation: 3,
    borderRadius: 50,
    flexDirection: 'row',
    alignSelf: 'center'
  },
  passwordcontainer: {
    width: '80%',
    backgroundColor: '#ffffff',
    padding: 5,
    marginVertical: 5,
    elevation: 3,
    borderRadius: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center'
  },
  container: {
    flex: 1,
  },
  logincontainer: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 15,
    marginVertical: 60,
    justifyContent: 'center',
    elevation: 3,
    borderRadius: 30,
  },
  logintext: {
    fontSize: 32,
    justifyContent: 'center',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
    marginBottom: 50
  },
  btn1: {
    width: '80%',
    padding: 15,
    backgroundColor: '#09CE61',
    borderRadius: 50,
    elevation: 3,
    marginTop: 35,
    marginBottom: 15,
    alignItems: 'center',
    alignSelf: 'center',
  },
  btn2: {
    width: '80%',
    padding: 18,
    backgroundColor: '#09CE61',
    borderRadius: 50,
    elevation: 3,
    marginHorizontal: 70,
    marginTop: 35,
    marginBottom: 15,
    alignItems: 'center',
    alignSelf: 'center'
  },
});

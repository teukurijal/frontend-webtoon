import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  AlertIOS,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import axiosInstance from '../service/baseUrl';
import {AsyncStorage} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

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
    axiosInstance({
      method: 'POST',
      url: '/login',
      data: {
        email: this.state.useremail,
        password: this.state.password,
      },
    })
      .then(response => {
        console.log(response);
        AsyncStorage.setItem('Token', response.data.token);
        this.props.navigation.navigate('ForYou');
      })
      .catch(error => {
        alert(error);
        console.log(error);
      });
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
    const disableLogin = this.state.validatedemail && this.state.validatedpass;
    //console.log(this.props.navigation)

    return (
      <View style={styles.center}>
        <View style={styles.textcontainer}>
          <Text style={{fontSize: 40}}>LOGIN</Text>
          <Text style={{fontSize: 16, letterSpacing: 2}}>
            Login with your account WEBTOON
          </Text>
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
            <Text style={{fontSize: 18}}>Login</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.textcontainer}
          onPress={() => this.props.navigation.navigate('Register')}>
          <Text style={{fontSize: 12, letterSpacing: 2}}>
            don't have an account?
            <Text style={{color: '#1BB4D3', fontWeight: '700'}}>
              {' '}
              Register here
            </Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{justifyContent: 'center', alignItems: 'center', top: 25}}
          onPress={() => this.props.navigation.navigate('ForYou')}>
          <Text style={{fontSize: 20}}>Skip >></Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Login;

const styles = StyleSheet.create({
  emailcontainer: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 5,
    marginVertical: 12,
    marginHorizontal: 10,
    elevation: 8,
    borderRadius: 50,
    flexDirection: 'row',
  },
  passwordcontainer: {
    backgroundColor: '#ffffff',
    padding: 5,
    marginVertical: 12,
    marginHorizontal: 10,
    elevation: 8,
    borderRadius: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
  },
  logincontainer: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 15,
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
    marginBottom: 30,
  },
  btn1: {
    padding: 18,
    backgroundColor: '#ffffff',
    borderRadius: 50,
    elevation: 9,
    marginHorizontal: 70,
    marginVertical: 40,
    alignItems: 'center',
  },
  btn2: {
    padding: 18,
    backgroundColor: '#1BB4D3',
    borderRadius: 50,
    elevation: 9,
    marginHorizontal: 70,
    marginVertical: 40,
    alignItems: 'center',
  },
});

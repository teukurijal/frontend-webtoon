import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class ProfileScreen extends Component {
  constructor() {
    super();

    this.state = {
      image: '',
      name: 'Teuku Rijal'
    };
  }

  componentDidMount() {
    const url= 'http://192.168.1.28:3000/profile-1.png';
    this.setState({ 
      image: url
    })
  }

  render() {
    //console.log(this.props.navigation);
    const{ image } = this.state
    return (
      <View style={styles.center}>
        <View style={styles.profilecontainer}>
          <View >
            <Image
              style={{
                width: 100,
                height: 100,
                borderRadius: 200 / 2,
                overflow: 'hidden',
                borderWidth: 1,
                borderColor: 'black',
              }}
              source={{uri: image}}
            />
          </View>
          <View>
            <Text style={{fontSize: 30, color: 'black', marginLeft:10}}>
              {this.state.name}
            </Text>
          </View>
        </View>
        <View style={styles.menucontainer}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('EditProfileScreen')}
            style={styles.menu}
          >
            <View style={styles.btncontainer}>
                 <Icon name='user' color={'#09CE61'} size={20} />
            </View>
            <View style={styles.btncontainer}>
                  <Text style={{fontSize: 20}}>My Profile</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('WebtoonCreation')}
            style={styles.menu}
          >
            <View style={styles.btncontainer}>
                 <Icon name='pencil-square' color={'#09CE61'} size={20} />
            </View>
            <View style={styles.btncontainer}>
                  <Text style={{fontSize: 20}}>My Webtoon Creation</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPressOut={() => this.props.navigation.navigate('Logout')}
            style={styles.menu}
          >
            <View style={styles.btncontainer}>
                 <Icon name='sign-out' color={'#09CE61'} size={20} />
            </View>
            <View 
              style={styles.btncontainer}>
                <Text 
                  style={{
                    fontSize: 20
                  }}>Log Out</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btncontainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginRight:15
  },
  center: {
    justifyContent: 'center',
    flex:1,
    marginHorizontal:30
  },
  profilecontainer: {
    flexDirection:'row',
    alignItems:'center',
    flex:2.5
  },
  menucontainer: {
    flex:3,
  },
  menu: {
    marginBottom:30,
    flexDirection:'row',
  }
});

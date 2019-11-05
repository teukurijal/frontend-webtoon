import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';


class ProfileScreen extends Component {
  constructor() {
    super();

    this.state = {
      image: 'http://192.168.1.131:3000/profile-1571917689166FB_IMG_1567813714025.jpg',
    };
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
              {this.props.name}
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
            onPressOut={() => alert('no function')}
            style={styles.menu}
          >
            <View style={styles.btncontainer}>
                 <Icon2 name='ios-settings' color={'#09CE61'} size={20} />
            </View>
            <View 
              style={styles.btncontainer}>
                <Text 
                  style={{
                    fontSize: 20
                  }}>Setting</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPressOut={() => alert('no function')}
            style={styles.menu}
          >
            <View style={styles.btncontainer}>
                 <Icon2 name='md-help-circle' color={'#09CE61'} size={20} />
            </View>
            <View 
              style={styles.btncontainer}>
                <Text 
                  style={{
                    fontSize: 20
                  }}>Help & Support</Text>
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

const MapStateToProps = state => ({
  name: state.users.data.name
})

export default connect(
  MapStateToProps
  )(ProfileScreen)

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
    backgroundColor:'white',
    borderTopRightRadius: 100,
    // borderWidth:0.4,
    // elevation:2
  },
  menu: {
    marginBottom:30,
    flexDirection:'row',
  }
});

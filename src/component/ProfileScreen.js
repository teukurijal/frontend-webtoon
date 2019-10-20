import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class ProfileScreen extends Component {
  constructor() {
    super();

    this.state = {
      image: {uri: 'https://i.ibb.co/rdjb1Yt/avatar.jpg'},
      name: 'Teuku Rijal'
    };
  }

  render() {
    //console.log(this.props.navigation);
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
                borderWidth: 3,
                borderColor: 'black',
              }}
              source={this.state.image}
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
                 <Icon name='user' color={'grey'} size={20} />
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
                 <Icon name='pencil-square' color={'grey'} size={20} />
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
                 <Icon name='sign-out' color={'grey'} size={20} />
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

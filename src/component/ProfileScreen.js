import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'


export default class ProfileScreen extends Component {

  constructor() {
    super();

    this.state = {
      image:{ uri: "https://i.ibb.co/rdjb1Yt/avatar.jpg"}
    }
  }

  render() {
    console.log(this.props.navigation)
    return (

        <View style={styles.center}>
        <View style={styles.textcontainer}>
        <Image style={{width:165, height: 165, borderRadius: 200/2, overflow: "hidden", borderWidth: 3,borderColor: "black"}} source={this.state.image} />
        </View>
        <View style={{alignItems:'center', marginTop: 15}}>
          <Text style={{fontSize: 35,marginBottom:20, color:'black'}}>Your Name</Text>
        </View>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('WebtoonCreation')} >
                <View style={styles.btncontainer}>
                    <View style={{padding:12,flexDirection:'row-reverse',justifyContent:'center'}}>
                        <View>
                        <Icon name="arrow-right" size={21} />
                        </View>
                        <View style={{flex:1}}>
                        <Text style={{fontSize: 15}}>My Webtoon Creation</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPressOut={() => this.props.navigation.navigate('Logout')}>
                <View style={styles.btncontainer}>
                    <View
                    style={{padding:12}}>
                        <Text style={{fontSize: 15}}>Log Out</Text>
                    </View>
                </View>
            </TouchableOpacity>
      </View>
        );
  }
}

const styles = StyleSheet.create ({
    btncontainer: {
      alignItems: 'center',
      backgroundColor: '#ffffff',
      padding: 5,
      marginVertical: 5,
      marginHorizontal: 5,
      elevation: 1,
      borderWidth:0.2,
      borderRadius: 20,
      flexDirection: 'row',
      alignItems: 'center'
    },
    center: {
      justifyContent: 'center'
    },
    textcontainer: {
      alignItems: 'center',
      marginTop: 50
    },
  })
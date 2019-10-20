import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ScrollView,
  Dimensions,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import axiosInstance from '../service/baseUrl';
import {AsyncStorage} from 'react-native';

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 260;

class WebtoonCreation extends Component {
  constructor() {
    super();
    this.state = {
      webtoons: '',
      token:''
    };
  }

  componentDidMount = async () => {
    this.setState({
      token: await AsyncStorage.getItem('Token'),
    });

    this.onWebtoon();
  };

  onWebtoon = async () => {
    await axiosInstance({
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
      url: `/user/${1}/webtoons`,
    }).then(result => {
      this.setState({webtoons: result.data});
    });
  };

  renderPage(image, index) {
    return (
      <View key={index}>
        <Image
          style={{width: BannerWidth, height: BannerHeight}}
          source={{uri: image}}
        />
      </View>
    );
  }

  render() {
    //console.log(this.props.navigation);
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1}}>
          <ScrollView scrollEventThrottle={0}>
            <View>
              <View style={{flex: 3}}>
                <View 
                  style={{
                    marginTop: 15,
                    marginHorizontal:10
                  }}>
                  <SafeAreaView>
                    <FlatList
                      data={this.state.webtoons}
                      horizontal={false}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({item}) => (
                        <TouchableOpacity
                          onPress={() =>
                            this.props.navigation.navigate('DetailScreen', {
                              image: item.image,
                              title: item.title,
                              toonid: item.id,
                            })
                          }>
                          <View
                            style={{
                              backgroundColor: 'white',
                              flex: 1,
                              marginBottom:10,
                              flexDirection: 'row',
                              borderRadius: 1,
                            }}>
                            <View>
                              <Image
                                style={{
                                  width: 90,
                                  height: 90,
                                  padding: 10,
                                  borderRadius: 10,
                                }}
                                source={{uri: item.image}}
                              />
                            </View>
                            <View
                              style={{
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginLeft: 10,
                                marginRight:5
                              }}>
                              <View
                                style={{
                                  fontSize: 17,
                                  fontWeight: 'bold',
                                  color: 'black'
                                }}>
                                <Text
                                  style={{
                                    fontSize: 17,
                                    fontWeight: 'bold',
                                    color: 'black'
                                  }}>
                                  {item.title}
                                </Text>
                                <Text
                                  style={{
                                    fontSize: 10,
                                    color: 'grey',
                                  }}>
                                  {item.genre}
                                </Text>
                              </View>
                              <View 
                                style={{
                                  flexDirection:'row',
                                }}>
                                <TouchableOpacity
                                onPress={() => alert('ad to favorite')}
                                style={{
                                  borderRadius:5,
                                  elevation:3,
                                  padding:8,
                                  backgroundColor: '#09CE61',
                                  marginRight:10
                                }}
                                >
                                <Icon style={{color: '#ffffff'}}  name="trash" size={15} />
                              </TouchableOpacity>
                              <TouchableOpacity
                                onPress={() => alert('ad to favorite')}
                                style={{
                                  flexDirection:'row', 
                                  borderRadius:5,
                                  elevation:3,
                                  paddingHorizontal:10,
                                  alignItems:'center',
                                  backgroundColor: '#09CE61',
                                  marginLeft:10
                                }}
                              >
                                  <Icon style={{color: '#ffffff'}}  name="edit" size={15} />
                                  <Text style={{fontWeight:'bold', color:'#ffffff'}}> Edit</Text>
                              </TouchableOpacity>
                            </View>
                            </View>
                          </View>
                        </TouchableOpacity>
                      )}
                      keyExtractor={(item, index) => index.toString()}
                    />
                  </SafeAreaView>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
        <View
          style={{
            backgroundColor: 'none',
            position: 'absolute',
            width: 60,
            height: 60,
            alignItems: 'center',
            justifyContent: 'center',
            right: 30,
            bottom: 30,
          }}>
          <Icon
            name="plus-circle"
            size={70}
            color="#09CE61"
            onPress={() => this.props.navigation.navigate('CreateWebtoon')}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default WebtoonCreation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

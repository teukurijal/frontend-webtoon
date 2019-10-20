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

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 260;

class SearchScreen extends Component {
  constructor() {
    super();
    this.state = {
      data: '',
    };
  }

  request(searchtext) {
    axiosInstance({
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
      url: `/webtoons?title=${searchtext}`,
    }).then(result => {
      this.setState({data: result.data});
      if (!searchtext) {
        this.setState({data: ''});
      }
    });
  }

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
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1}}>
          <View
            style={{
              height: 50,
              borderBottomColor: '#dddddd',
              marginTop: 15,
              marginVertical: 6,
            }}>
            <View
              style={{
                flexDirection: 'row',
                padding: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
                marginHorizontal: 10,
                marginVertical: 1,
                shadowOffset: {width: 0, height: 0},
                shadowColor: 'black',
                shadowOpacity: 0.2,
                elevation: 2,
                paddingHorizontal: 20,
                borderRadius: 50,
              }}>
              <TextInput
                autoFocus="true"
                underlineColorAndroid="transparent"
                placeholder="Search"
                onChangeText={text => this.request(text)}
                placeholderTextColor="grey"
                style={{
                  flex: 1,
                  fontWeight: '700',
                  backgroundColor: 'white',
                }}
              />
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('ForYou')}>
                <Text>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView scrollEventThrottle={0}>
            <View>
              <View style={{flex: 3}}>
                <View>
                  <SafeAreaView>
                    <FlatList
                      data={this.state.data}
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
                              borderBottomWidth: 0.5,
                              marginVertical: 4,
                              flex: 2,
                              flexDirection: 'row',
                              borderRadius: 10,
                            }}>
                            <View>
                              <Image
                                style={{
                                  width: 90,
                                  height: 90,
                                  padding: 10,
                                  borderRadius: 10,
                                }}
                                source={{
                                  uri: item.image,
                                }}
                              />
                            </View>
                            <View
                              style={{
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                              }}>
                              <View
                                style={{
                                  marginHorizontal: 15,
                                }}>
                                <Text
                                  style={{
                                    fontSize: 17,
                                    fontWeight: 'bold',
                                    marginBottom: 10,
                                  }}>
                                  {item.title}
                                </Text>
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
      </SafeAreaView>
    );
  }
}

export default SearchScreen;

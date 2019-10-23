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
  RefreshControl
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import axiosInstance from '../service/baseUrl'
import { SwipeListView } from 'react-native-swipe-list-view'

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 260;

class FavoriteScreen extends Component {
  constructor() {
    super();

    this.state = {
      data: '',
      isRefreshing: false,
    };
  }

  componentDidMount() {
    return fetch('http://192.168.1.28:3000/api/v1/webtoons?is_favorite=true')
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            data: responseJson,
          },
          function() {},
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  request(searchtext) {
    axiosInstance({
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
      url: `/webtoons?isFavorite=true&&title=${searchtext}`,
    }).then(result => {
      this.setState({data: result.data});
      if (!searchtext) {
        this.setState({data: ''});
      }
    });
  }

  refreshData() {
    this.setState({isRefreshing: true});
    this.componentDidMount();
    setTimeout(() => {
      this.setState({isRefreshing: false});
    }, 1000);
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
        <View style={{flex: 1, marginHorizontal:10}}>
          <View
            style={{
              height: 50,
              borderBottomColor: '#dddddd',
              marginTop: 15,
              marginVertical: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                padding: 1,
                backgroundColor: 'white',
                shadowOffset: {width: 0, height: 0},
                shadowColor: 'black',
                shadowOpacity: 0.2,
                justifyContent: 'center',
                alignItems: 'center',
                elevation: 2,
                paddingHorizontal: 20,
                borderRadius: 50,
              }}>
              
              <TextInput
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
              <Icon
                name="search"
                size={20}
                style={{padding: 10}}
              />
            </View>
          </View>
          <ScrollView 
          showsVerticalScrollIndicator={false}
            scrollEventThrottle={0}
            refreshControl = {
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={() => this.refreshData()}
            />
          }>
            <View>
              <View style={{flex: 3}}>
                <View>
                  <SafeAreaView>
                    <SwipeListView
                      useFlatList={true}
                      data={this.state.data}
                      horizontal={false}
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
                                marginHorizontal: 20,
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
                            </View>
                          </View>
                        </TouchableOpacity>
                      )}
                      renderHiddenItem={ (rowData, rowMap) => (
                        <View >
                          
                        </View>
                    )}
                    disableRightSwipe={true}
                    leftOpenValue={20}
                    rightOpenValue={-70}
                    onRowOpen={(rowKey, rowMap) => {
                        setTimeout(() => {
                            rowMap[rowKey].closeRow()
                        }, 2000)
                    }}
                    previewRowKey={this.state.data}
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

export default FavoriteScreen;

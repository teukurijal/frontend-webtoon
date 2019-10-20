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
  RefreshControl,
} from 'react-native';
import Carousel from 'react-native-banner-carousel';
import Icon from 'react-native-vector-icons/FontAwesome';
import axiosInstance from '../service/baseUrl';
import {AsyncStorage} from 'react-native';

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 260;
const banners = [
  'https://www.bleedingcool.com/wp-content/uploads/2019/09/letsplay-1-1200x746.jpg',
  'https://swebtoon-phinf.pstatic.net/20190905_299/15676636851905DKXg_JPEG/06_banner_10x8.jpg',
  'https://swebtoon-phinf.pstatic.net/20170529_247/1496067138718EHF0H_JPEG/banner_collection_yuk.jpg',
];

class ForyouScreen extends Component {
  constructor() {
    super();
    this.state = {
      data: '',
      favorites: '',
      banners: '',
      token: '',
      position: 1,
      interval: null,
      disbaledbtn: true,
      isRefreshing: false,
      searchtext: '',
    };
  }

  componentDidMount = async () => {
    this.setState({
      token: await AsyncStorage.getItem('Token'),
    });
    this.requestData();
  };

  requestData() {
    this.onFavorite();
    this.onToons();
    this.onBanners();
  }

  refreshData() {
    this.setState({isRefreshing: true});
    this.requestData();
    setTimeout(() => {
      this.setState({isRefreshing: false});
    }, 1000);
  }

  onFavorite = async () => {
    await axiosInstance({
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
      url: `/webtoons?is_favorite=true`,
    }).then(result => {
      this.setState({favorites: result.data});
      //console.log(this.state.favorites);
    });
  };

  onToons = async () => {
    await axiosInstance({
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
      url: `/webtoons`,
    }).then(result => {
      this.setState({toons: result.data});
    });
  };

  onBanners = async () => {
    await axiosInstance({
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
      url: `/banners`,
    }).then(result => {
      this.setState({banners: result.data});
    });
  };

  handleSeacrh(text) {
    this.setState({searchtext: text});
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
      <SafeAreaView
        style={{
          position: 'relative',
          flex: 1,
          zIndex: 0,
        }}>
        <ScrollView
          scrollEventThrottle={0}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={() => this.refreshData()}
            />
          }>
          <View>
            <View style={{flex: 1}}>
              <View style={styles.container}>
                <View
                  style={{
                    flexDirection: 'row',
                    position: 'absolute',
                    right: 0,
                    padding: 1,
                    marginTop: 10,
                    marginRight: 10,
                    zIndex: 2,
                  }}>
                  <TouchableOpacity
                    style={{
                      padding: 10,
                      elevation: 2,
                    }}
                    onPress={() => this.props.navigation.navigate('Search')}>
                    <Icon
                      name="search"
                      size={23}
                      style={{
                        color: 'white',
                      }}
                    />
                  </TouchableOpacity>
                </View>
                <Carousel
                  loop
                  autoplay
                  index={0}
                  activePageIndicatorStyle={{color: '#09CE61'}}
                  autoplayTimeout={3000}
                  pageSize={350}>
                  {banners.map((image, index) => this.renderPage(image, index))}
                </Carousel>
              </View>
            </View>
            <View
              style={{
                flex: 2,
                paddingHorizontal: 15,
              }}>
              <View
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                }}>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: 'bold',
                  }}>
                  Favorite Toons
                </Text>
              </View>
              <View>
                <SafeAreaView>
                  <FlatList
                    data={this.state.favorites}
                    horizontal={true}
                    style={{overflow: 'visible'}}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item}) => (
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate('DetailScreen', {
                            image: item.image,
                            title: item.title,
                            toonid: item.id,
                          })
                        }
                        style={{marginRight: 15}}>
                        <View
                          style={{
                            backgroundColor: 'white',
                            borderRadius: 5,
                            borderWidth: 0.4,
                            overflow: 'hidden',
                          }}>
                          <Image
                            source={{uri: item.image}}
                            style={{
                              width: 150,
                              height: 120,
                              padding: 10,
                            }}
                          />
                        </View>
                        <View
                          style={{
                            width: 100,
                          }}>
                          <Text
                            style={{
                              fontSize: 10,
                              marginTop: 5,
                              color: 'grey',
                            }}>
                            {item.genre}
                          </Text>
                          <Text
                            style={{
                              fontSize: 16,
                            }}>
                            {item.title}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </SafeAreaView>
              </View>
              <View
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                }}>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: 'bold',
                  }}>
                  New episodes
                </Text>
              </View>
              <View>
                <SafeAreaView>
                  <FlatList
                    data={this.state.toons}
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
                        }
                      >
                        <View
                          style={{
                            backgroundColor: 'white',
                            flex: 1,
                            marginBottom:10,
                            flexDirection: 'row',
                            borderRadius: 1,

                          }}>
                          <View
                            style={{
                              borderWidth: 0.4,
                              borderRadius: 5,
                              overflow:'hidden'
                            }}>
                            <Image
                              source={{uri: item.image}}
                              style={{
                                width: 90,
                                height: 90,
                              }}
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
                            <View>
                              <TouchableOpacity
                                onPress={() => alert('ad to favorite')}>
                                  <Icon style={item.isFavorite ? {color: '#09CE61'} : {color: 'grey'}}  name="heart" size={25} />
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
      </SafeAreaView>
    );
  }
}

export default ForyouScreen;

const styles = StyleSheet.create({
  container: {
    zIndex: 0,
    height: 240,
  },
  btnblue: {
    padding: 5,
    backgroundColor: '#1BB4D3',
    borderRadius: 10,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnwhite: {
    padding: 8,
    backgroundColor: 'grey',
    borderRadius: 10,
    elevation: 3,
    marginLeft: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

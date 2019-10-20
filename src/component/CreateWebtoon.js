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
  AsyncStorage
} from 'react-native';
import axiosInstance from '../service/baseUrl';
import Icon from 'react-native-vector-icons/FontAwesome';

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 260;


class CreateWebtoon extends Component {
  constructor() {
    super();
    this.state = {
      webtoons:'',
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
          <View
            style={{
              height: 50,
              borderBottomColor: '#dddddd',
              marginVertical: 6,
            }}>
            <View
              style={{
                flexDirection: 'row-reverse',
                padding: 1,
                backgroundColor: 'white',
                marginHorizontal: 10,
                marginVertical: 1,
                shadowOffset: {width: 0, height: 0},
                shadowColor: 'black',
                shadowOpacity: 0.2,
                elevation: 2,
                borderRadius: 50,
              }}>
              <TextInput
                underlineColorAndroid="transparent"
                placeholder="Seacrh here"
                placeholderTextColor="grey"
                style={{
                  flex: 1,
                  marginLeft: 15,
                  marginRight: 20,
                  backgroundColor: 'white',
                }}
              />
            </View>
          </View>
          {/* <View style={{ marginTop: 0,marginLeft: 15}}>
                        <Text style={{fontSize: 30,marginBottom:0}}>Episode</Text>
                    </View> */}
          <ScrollView
            scrollEventThrottle={0}
            showsVerticalScrollIndicator={false}
            style={{felx: 1}}>
            <View>
              <View style={{flex: 3}}>
                <View style={{paddingHorizontal: 5}}>
                  <SafeAreaView>
                    <FlatList
                      data={this.state.webtoons}
                      horizontal={false}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({item}) => (
                        <TouchableOpacity
                          onPress={() => {
                            alert('This Is Favorite');
                          }}>
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
                                  borderRadius: 15,
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
                                  flexDirection:'row', 
                                  borderRadius:5,
                                  padding:5,
                                  elevation:3,
                                  paddingHorizontal:5,
                                  alignItems:'center',
                                  backgroundColor: '#09CE61',
                                }}
                              >
                                  <Text style={{fontWeight:'bold', color:'#ffffff'}}>Add Episode</Text>
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
          <View
            style={{
              height: 50,
              borderBottomColor: '#dddddd',
              admarginVertical: 6,
              marginBottom: 0,
            }}>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default CreateWebtoon;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn1: {
    padding: 10,
    borderRadius: 30,
    elevation: 2,
    marginLeft: 10,
    alignItems: 'center',
  },
  btn2: {
    padding: 10,
    backgroundColor: '#CD1C07',
    borderRadius: 10,
    elevation: 3,
    marginLeft: 10,
    marginTop: 20,
    alignItems: 'center',
  },
});

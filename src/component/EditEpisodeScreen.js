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
import axiosInstance from '../service/baseUrl';
import {AsyncStorage} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/FontAwesome';

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 260;
const {height, width} = Dimensions.get('window');

class DetailScreen extends Component {
  constructor() {
    super();
    this.state = {
      episodes: '',
      token: '',
    };
  }

  componentDidMount = async () => {
    this.setState({
      token: await AsyncStorage.getItem('Token'),
    });

    this.onEpisode();

    this.props.navigation.setParams({
      headerRight: (<Icon
        name="plus"
        style={{marginRight: 20, fontSize: 25}}
        onPress={() => alert('asdasa')}
      />
    ),
    })
  };

  onEpisode = async () => {
    await axiosInstance({
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
      url: `/user/${1}/webtoon/${this.props.navigation.getParam(
        'toonid',
      )}/episodes`,
    }).then(result => {
      this.setState({episodes: result.data});
      //console.log(episodes);
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
  handleEdit(item) {
    alert(item)
  }
  handleDelete(item) {
    alert(item)
  }

  static navigationOptions = ({navigation}) => {
    const {navigate, getParam} = navigation;
    const title = getParam('title');

    return {
      headerTitle: title,
      headerTitleStyle: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      headerTitle: title,
      headerRight: navigation.state.params && 
      navigation.state.params.headerRight
    };
  }

  render() {
    //console.log(this.props.navigation);
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1}}>
          <ScrollView scrollEventThrottle={0}>
            <View>
              <View style={{flex: 1}}>
                <View style={styles.container}>
                  <Image
                    style={styles.image}
                    source={{uri: this.props.navigation.getParam('image')}}
                  />
                </View>
              </View>

              <View 
                style={{
                  flex: 3,
                  marginHorizontal:1,
                  marginVertical:1
                }}>
                  <SafeAreaView>
                    <SwipeListView
                      useFlatList={true}
                      data={this.state.episodes}
                      horizontal={false}
                      renderItem={({item}) => (
                        <TouchableOpacity
                          activeOpacity={.99}
                          onPress={() =>
                            this.props.navigation.navigate('DetailEpisode', {
                              image: item.image,
                              title: item.title,
                              toonid: item.toonId,
                              episodeid: item.id,
                            })
                          }>
                          <View
                            style={{
                              backgroundColor: 'white',
                              flex: 1,
                              flexDirection: 'row',
                              borderRadius: 1,
                              borderBottomWidth:0.5,
                              marginBottom:1
                            }}>
                            <View>
                              <Image
                                style={{
                                  width: 85,
                                  height: 85,
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
                              <View>
                                <Text
                                  style={{
                                    fontSize: 17,
                                    fontWeight: 'bold',
                                    color: 'black'
                                  }}>
                                  {item.title}
                                </Text>
                              </View>
                              <View>
                                <Text
                                  style={{
                                    fontSize: 12,
                                    fontWeight: 'bold',
                                    color: '#c5c5c5'
                                  }}>
                                  Edit >
                                </Text>
                              </View>
                            </View>
                          </View>
                        </TouchableOpacity>
                      )}
                      renderHiddenItem={ ({item}) => (
                        <View
                          style={{
                            flex:1,
                            flexDirection:'row-reverse',
                            alignItems:'center',
                          }}  
                        >
                            <TouchableOpacity
                              style={{
                                width:30,
                                height:30,
                                borderRadius:5,
                                backgroundColor:'#09CE61',
                                alignItems:'center',
                                justifyContent:'center',
                                marginRight:20
                              }}
                              onPress={() => this.handleEdit(item.id)}
                            >
                              <Icon 
                                style={{
                                  color: '#ffffff',
                                }}  
                                name="pencil" 
                                size={20} 
                              />
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={{
                                width:30,
                                height:30,
                                borderRadius:5,
                                backgroundColor:'#09CE61',
                                alignItems:'center',
                                justifyContent:'center',
                                marginHorizontal:20
                              }}
                              onPress={() => this.handleDelete(item.id)}
                            >
                              <Icon 
                                style={{
                                  color: '#ffffff',
                                }}  
                                name="trash" 
                                size={20} 
                              />
                            </TouchableOpacity>
                        </View>
                    )}
                    disableRightSwipe={true}
                    leftOpenValue={20}
                    rightOpenValue={-140}
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
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    padding: 10,
    backgroundColor: '#FFC300',
    borderRadius: 10,
    elevation: 3,
    marginLeft: 10,
  },
  image: {
    width: 400,
    height: 200,
  },
});

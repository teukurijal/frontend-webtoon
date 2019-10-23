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
import axiosInstance from '../service/baseUrl';
import {AsyncStorage} from 'react-native';
//import AddModal from './AddModal';
import Modal from 'react-native-modalbox';

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 260;

class WebtoonCreation extends Component {
  constructor() {
    super();
    this.state = {
      webtoons: '',
      token:'',
      idtoon:'',
      titletooon:'',
      genretoon:'',
      isRefreshing: false,
    };
  }

  componentDidMount = async () => {
    this.setState({
      token: await AsyncStorage.getItem('Token'),
    });
    this.requestData();
    
    this.props.navigation.setParams({
      headerRight:(<Icon
        name="plus-circle"
        style={{marginRight: 20, fontSize: 45, color:'#09CE61'}}
        onPress={() => this.refs.addmodal.open()}
      />)
    });
  };

  requestData() {
    this.onWebtoon();
  }

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

  handleAddtoons = async () => {
    this.refs.addmodal.close();
    await axiosInstance({
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
      url: `/user/${1}/webtoon`,
      data: {
        title: this.state.titletooon,
        genre: this.state.genretoon
      }
    }).then( response => {
      this.setState({
        titletooon:'',
        genretoon:''
      })
    })
    this.refreshData()
  }

  handleDetele = async (item) => {
    await axiosInstance({
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
      url: `/user/${1}/webtoon/${item}`,
    })
    this.refreshData()
  }

  handleOpen(item) {
    console.log(item)
    this.refs.editmodal.open();
    this.setState({
      id: item
    })
  }

  handleEdit = async () => {
    //console.log('test);
    //this.refs.editmodal.open();
    await axiosInstance({
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
      url: `/user/${1}/webtoon/${this.state.id}`,
      data: {
        //id: this.state.id,
        title: this.state.titletooon,
        genre: this.state.genretoon
      }
    }).then( response => {
      this.setState({
        titletooon:'',
        genretoon:''
      })
    })
    this.refs.editmodal.close();
    this.refreshData();
  }
  

  refreshData() {
    this.setState({isRefreshing: true});
    this.requestData();
    setTimeout(() => {
      this.setState({isRefreshing: false});
    }, 1000);
  }

  renderPage(image, index) {
    return (
      <View key={index}>
        <Image
          alt="No Image"
          style={{width: BannerWidth, height: BannerHeight}}
          source={{uri: image}}
        />
      </View>
    );
  }
  static navigationOptions = ({navigation, screenProps}) => ({
    headerTitle: 'My Webtoon',
    headerLeft: null,
    headerRight: 
    navigation.state.params && navigation.state.params.headerRight
  });

  render() {
    //console.log(this.props.navigation);
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1}}>
          <ScrollView 
            scrollEventThrottle={0}
            refreshControl = {
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={() => this.refreshData()}
            />
          }
          >
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
                              this.props.navigation.navigate('EditEpisodeScreen', {
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
                                  onPress={() => this.handleDetele(item.id)}
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
                                onPress={() => 
                                  this.handleOpen(item.id)
                                  //this.handleEdit(item.id)
                                  //this.props.navigation.setParams({id: item.id})
                                }
                                //onPress={() => this.handleEdit(item.id)}
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
                                  <Icon 
                                    style={{
                                      color: '#ffffff'
                                    }}  
                                    name="edit" 
                                    size={15} />
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
        {/* <View
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
            color="grey"
            onPress={() => this.refs.addmodal.open()}
          />
        </View> */}
        <Modal
          ref={'addmodal'}
          style={[styles.modal, styles.modal4]}
          position={'center'}>
          <View>
            <Text style={styles.text}>
              Add Your Webtoon
            </Text>
            <TextInput
              placeholder="Title"
              style={styles.textinput}
              onChangeText={(text) => this.setState({ titletooon: text})}
            />
            <TextInput
              placeholder="Genre"
              style={styles.textinput}
              onChangeText={(text) => this.setState({genretoon: text})}
            />
            <View 
              style={{
                flexDirection:'row',
                justifyContent:'center',
                alignItems:'center',
                marginTop:15
              }}> 
              <Image
                style={styles.image}
              />
              <View 
                style={{
                  marginHorizontal: 10,
                  justifyContent:'space-around',
                }}  
              >
                <TouchableOpacity style={styles.btn}>
                  <Text style={styles.textbtn}>Add Image</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={()=> this.handleAddtoons()}>
                  <Text style={styles.textbtn}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          ref={'editmodal'}
          style={[styles.modal, styles.modal4]}
          position={'center'}>
          <View>
            <Text style={styles.text}>
              Edit Webtoon
            </Text>
            <TextInput
              placeholder="Title"
              style={styles.textinput}
              onChangeText={(text) => this.setState({ titletooon: text})}
            />
            <TextInput
              placeholder="Genre"
              style={styles.textinput}
              onChangeText={(text) => this.setState({genretoon: text})}
            />
            <View 
              style={{
                flexDirection:'row',
                justifyContent:'center',
                alignItems:'center',
                marginTop:15
              }}> 
              <Image
                style={styles.image}
              />
              <View 
                style={{
                  marginHorizontal: 10,
                  justifyContent:'space-around',
                }}  
              >
                <TouchableOpacity style={styles.btn}>
                  <Text style={styles.textbtn}>Add Image</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={() =>this.handleEdit()}>
                  <Text style={styles.textbtn}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
  modal4: {
    height: 350,
    borderRadius:30
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontSize: 22,
    textAlign: 'center',
  },
  image: {
    width: 100,
    height: 100,
    //borderRadius: 200 / 2,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius:10
  },
  textinput: {
    height: 50, 
    width: 200, 
    backgroundColor: '#DDDDDD',
    marginTop:16,
    borderRadius:10
  },
  btn: {
    backgroundColor:'#09CE61',
    paddingHorizontal:5,
    paddingVertical:5,
    marginVertical:10,
    borderRadius:10
  },
  textbtn: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

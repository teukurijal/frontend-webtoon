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
import ImagePicker from 'react-native-image-picker';
import Modal from 'react-native-modalbox';
import { SwipeListView } from 'react-native-swipe-list-view';
import { connect } from 'react-redux';

const options = {
  title: 'Select Photo',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 260;

class WebtoonCreation extends Component {
  constructor() {
    super();
    this.state = {
      photo:'',
      webtoons: '',
      token:'',
      idtoon:'',
      titletooon:'',
      genretoon:'',
      isRefreshing: false,
      defaulttitle:'',
      defaultgenre:'',
    };
  }

  componentDidMount = async () => {
    this.requestData();
    
    this.props.navigation.setParams({
      headerRight:(<Icon
        name="plus"
        style={{marginRight: 20, fontSize: 25, color:'#09CE61'}}
        onPress={() => this.refs.addmodal.open()}
      />)
    });
  };

  requestData() {
    this.onWebtoon();
  }

  onWebtoon = async () => {
    const {id, token } = this.props
    await axiosInstance({
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      url: `/user/${id}/webtoons`,
    }).then(result => {
      this.setState({webtoons: result.data});
    });
  };

  handleAddtoons = async () => {
    const {id, token } = this.props
    this.refs.addmodal.close();
    await axiosInstance({
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      url: `/user/${id}/webtoon`,
      data: {
        title: this.state.titletooon,
        genre: this.state.genretoon,
        isFavorite: 0
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

  handleOpen(id, title, genre) {
    // console.log(item)
    this.refs.editmodal.open();
    this.setState({
      idtoon: id,
      defaulttitle: title,
      defaultgenre: genre
    })
  }

  handleEdit = async () => {
    const {id, token} = this.props
    await axiosInstance({
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      url: `/user/${id}/webtoon/${this.state.idtoon}`,
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

  handleChoosePhoto () {
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({ photo: response })
      }
    })
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
                    <SwipeListView
                      useFlatList={true}
                      data={this.state.webtoons}
                      horizontal={false}
                      renderItem={({item}) => (
                        <TouchableOpacity
                          activeOpacity={.99}
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
                                <Text
                                  style={{
                                    fontSize: 10,
                                    color: 'grey',
                                  }}>
                                  {item.genre}
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
                          onPress={() => 
                            this.handleOpen(item.id, item.title, item.genre)
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
                            marginHorizontal:10
                          }}
                        >
                          <Icon 
                            style={{
                              color: '#ffffff',
                              paddingVertical:8,
                            }}  
                            name="edit" 
                            size={15} />
                          <Text style={{fontWeight:'bold', color:'#ffffff'}}> Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.handleDetele(item.id)}
                            style={{
                              borderRadius:5,
                              elevation:3,
                              padding:8,
                              backgroundColor: '#09CE61',
                              marginRight:5
                            }}
                          >
                          <Icon style={{color: '#ffffff'}}  name="trash" size={15} />
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
                source={{ uri: this.state.photo.uri }}
              />
              <View 
                style={{
                  marginHorizontal: 10,
                  justifyContent:'space-around',
                }}  
              >
                <TouchableOpacity style={styles.btn} onPress={() => this.handleChoosePhoto()}>
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
              // editable={true}
              defaultValue={this.state.defaulttitle}
              style={styles.textinput}
              onChangeText={(text) => this.setState({ titletooon: text})}
            />
            <TextInput
              // editable={true}
              defaultValue={this.state.defaultgenre}
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
                source={{ uri: this.state.photo.uri }}
              />
              <View 
                style={{
                  marginHorizontal: 10,
                  justifyContent:'space-around',
                }}  
              >
                <TouchableOpacity style={styles.btn} onPress={() => this.handleChoosePhoto()}>
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

const mapStateToProps = state => ({
  token: state.users.data.token,
  id: state.users.data.id
})

export default connect(
  mapStateToProps
  // mapDispatchToProps
  )(WebtoonCreation);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal4: {
    height: 340,
    width:330,
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

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
import * as actionEpisodes from '../_actions/actionEpisodes';
import { connect } from 'react-redux';

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 260;
const {height, width} = Dimensions.get('window');

class DetailScreen extends Component {
  constructor() {
    super();
    this.state = {
      // episodes: '',
      token: '',
      user_id: '',
    };
  }

  componentDidMount = async () => {
    this.onEpisode();
  };


  onEpisode = () => {
    const toonid = this.props.navigation.getParam('toonid')
    const { id, token } = this.props
    this.props.getEpisodes(id, toonid, token);

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
    const { episodes } = this.props
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
                <View>
                  <SafeAreaView>
                    <FlatList
                      data={ episodes }
                      horizontal={false}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({item}) => (
                        <TouchableOpacity
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

const mapStateToProps = state => ({
  episodes: state.episodes.data,
  token: state.users.data.token,
  id: state.users.data.id
})

const mapDispatchToProps = dispatch => {
  return {
    getEpisodes: (user_id, toonid, token) => dispatch(actionEpisodes.getEpisodes(user_id, toonid, token))
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
  )(DetailScreen);

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
    
    // resizeMode: 'stretch'
  },
});

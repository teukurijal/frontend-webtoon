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

import Icon from 'react-native-vector-icons/Ionicons';

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 260;

class CreateEpisode extends Component {
  constructor() {
    super();
    this.state = {
      banners: [
        {
          title: 'Episode 1',
          image:
            'https://swebtoon-phinf.pstatic.net/20190918_270/1568801068280kz79d_JPEG/156880106825014711048.jpg?type=q90',
        },
        {
          title: 'Episode 2',
          image:
            'https://swebtoon-phinf.pstatic.net/20190918_298/1568801026250dYKzy_JPEG/156880102622014711036.jpg?type=q90',
        },
        {
          title: 'Episode 3',
          image:
            'https://swebtoon-phinf.pstatic.net/20190904_177/15675826889663R94u_JPEG/156758268893414711021.jpg?type=q90',
        },
        {
          title: 'Episode 4',
          image:
            'https://swebtoon-phinf.pstatic.net/20190904_203/1567582600864Oyvlf_JPEG/15675826008331471998.jpg?type=q90',
        },
        {
          title: 'Episode 5',
          image:
            'https://swebtoon-phinf.pstatic.net/20190827_129/1566898535254hC191_JPEG/15668985352221471989.jpg?type=q90',
        },
        {
          title: 'Episode 6',
          image:
            'https://swebtoon-phinf.pstatic.net/20190827_297/1566898501275xrhi5_JPEG/15668985012561471975.jpg?type=q90',
        },
      ],
    };
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
    //console.log(this.props.navigation);
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1}}>
          <View style={{marginTop: 15, marginLeft: 15}}>
            <Text style={{fontSize: 25, marginBottom: 0}}>Name</Text>
          </View>
          <View
            style={{
              height: 50,
              borderBottomColor: '#dddddd',
              marginVertical: 6,
            }}>
            <View
              style={{
                flexDirection: 'row-reverse',
                padding: 5,
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
                placeholder="Seacrh Episode"
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
          <View style={{marginTop: 0, marginLeft: 15}}>
            <Text style={{fontSize: 25, marginBottom: 5}}>Add Image</Text>
          </View>
          <ScrollView scrollEventThrottle={0}>
            <View>
              <View style={{flex: 3}}>
                <View style={{marginTop: 15, paddingHorizontal: 5}}>
                  <SafeAreaView>
                    <FlatList
                      data={this.state.banners}
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
                              marginHorizontal: 15,
                              marginVertical: 5,
                              flex: 2,
                              flexDirection: 'row',
                              borderRadius: 15,
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
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                              }}>
                              <View style={{marginHorizontal: 15}}>
                                <Text
                                  style={{
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                    marginBottom: 0,
                                  }}>
                                  {item.title}
                                </Text>
                              </View>
                              <View style={{padding: 10}}>
                                <TouchableOpacity>
                                  <View style={styles.btn}>
                                    <Text>Delete</Text>
                                  </View>
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
              marginVertical: 6,
              marginBottom: 0,
            }}>
            <View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('EditEpisode')}>
                <View style={styles.btn1}>
                  <Text style={{fontSize: 18}}>+ Image</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default CreateEpisode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    padding: 10,
    backgroundColor: '#1BB4D3',
    borderRadius: 10,
    elevation: 3,
    marginLeft: 10,
  },
  btn1: {
    padding: 10,
    borderRadius: 30,
    elevation: 2,
    marginLeft: 10,
    alignItems: 'center',
  },
});

import React, { Component } from 'react';
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
    TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome'
import axiosInstance from '../service/baseUrl'
import { AsyncStorage } from 'react-native'

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 260;

class ForyouScreen extends Component {

    constructor() {
        super()
        this.state = {
            webtoons:'' 
        }
    }

    componentDidMount= async () => {
        this.setState({
            token: await AsyncStorage.getItem('Token')
            });
        
        this.onWebtoon();
        }
    
        onWebtoon = async () => {
            await axiosInstance({
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    "Authorization": `Bearer ${this.state.token}`
                },
                url: `/user/${1}/webtoons`
            }).then(result=>{
                this.setState({webtoons: result.data})
            });
        }

    renderPage(image, index) {
        return (
            <View key={index}>
                <Image style={{ width: BannerWidth, height: BannerHeight }} source={{ uri: image }} />
            </View>
        );
    }
    
    render() {
        console.log(this.props.navigation)
        return (
        
            <SafeAreaView style={{flex:1}}>
                <View style={{flex:1}}>
                        <ScrollView
                         scrollEventThrottle={0}>
                        <View>
                                <View style={{flex:3}}>
                                    <View style={{marginTop: 15, paddingHorizontal: 0,}}>
                                    <SafeAreaView>
                                        <FlatList
                                             data={this.state.webtoons}
                                             horizontal={false}
                                             showsHorizontalScrollIndicator={false}
                                             renderItem={({item}) =>
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailScreen',{image:item.image, title:item.title, toonid: item.id})}>
                                                <View style={{backgroundColor:'white',marginHorizontal:0, marginVertical:5, flex:2, flexDirection:'row', borderRadius:15}}>
                                                    <View>
                                                        <Image style={{width:80, height:90, borderRadius:15}} source={{uri : item.image}}/>
                                                    </View>
                                                    <View style={{flexDirection: 'column',alignItems: 'flex-start'}}>
                                                        <View style={{marginHorizontal:15}}>
                                                            <Text style={{fontSize:17, fontWeight:'bold', marginBottom:10}}>{item.title}</Text>
                                                            <Text style={{fontSize:12, fontWeight:'bold', marginBottom:10}}>{item.count} Favorite</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                            }
                                            keyExtractor={(item, index) => index.toString()}
                                            />
                                        </SafeAreaView>
                                    </View>
                                </View>
                        </View>
                    </ScrollView>
                </View>
                <View style={{backgroundColor:'none',
                            position: 'absolute',
                            width: 60,
                            height: 60,
                            alignItems: 'center',
                            justifyContent: 'center',
                            right: 30,
                            bottom: 30,
                            }}>
                        <Icon name="plus-circle" size={70} color='#1BB4D3' 
                        onPress={()=>this.props.navigation.navigate('CreateWebtoon')} />
                    </View>
            </SafeAreaView>
            

        );
    }
}

export default ForyouScreen;

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
    },
    btn: {
        padding: 10,
        backgroundColor: '#FFC300',
        borderRadius:10,
        elevation: 3,
        marginLeft: 10
    }
})
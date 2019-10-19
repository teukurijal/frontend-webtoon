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
import axiosInstance from '../service/baseUrl'
import { AsyncStorage } from 'react-native'

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 260;
const {height,width} = Dimensions.get('window')
 

class DetailScreen extends Component {

    constructor() {
        super()
        this.state = {
            episodes: '',
            token:''
        }
    }

    componentDidMount= async () => {
        this.setState({
            token: await AsyncStorage.getItem('Token')
            });
        
        this.onEpisode();
        }
    

    onEpisode = async () => {
        await axiosInstance({
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                "Authorization": `Bearer ${this.state.token}`
            },
            url: `/user/${1}/webtoon/${this.props.navigation.getParam('toonid')}/episodes`
        }).then(result=>{
            this.setState({episodes: result.data})
            console.log(episodes)
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
                                <View style={{flex:1}}> 
                                    <View style={styles.container}>
                                        <Image 
                                            style={styles.image}
                                            source= {{uri: this.props.navigation.getParam('image')}}
                                        />
                                    </View>
                                </View>

                                <View style={{flex:3}}>
                                    <View>
                                    <SafeAreaView>
                                        <FlatList
                                             data={this.state.episodes}
                                             horizontal={false}
                                             showsHorizontalScrollIndicator={false}
                                             renderItem={({item}) =>
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailEpisode',
                                            {image: item.image, 
                                            title: item.title,
                                            toonid: item.toonId,
                                            episodeid: item.id, 
                                             })}>

                                                <View style={{backgroundColor:'white',marginHorizontal:4, marginVertical:4, 
                                                flex:2, flexDirection:'row', borderRadius:15,borderWidth:0.3}}>
                                                    <View>
                                                        <Image style={{width:90, height:90, padding:10, borderRadius:15 }} source={{uri : item.image}}/>
                                                    </View>
                                                    <View style={{flexDirection: 'column',alignItems: 'flex-start'}}>
                                                        <View style={{marginHorizontal:15}}>
                                                            <Text style={{fontSize:18, fontWeight:'bold', marginBottom:10}}>{item.title}</Text>
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
            </SafeAreaView>

        );
    }
}

export default DetailScreen;

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
    },
    image: {
        width: 300,
        height: 200,
        // resizeMode: 'stretch'
      }
})
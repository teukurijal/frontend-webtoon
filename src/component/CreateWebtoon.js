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

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 260;

class CreateWebtoon extends Component {

    constructor() {
        super()
        this.state = {
            banners: [{
                title: 'Ghost Wife',
                image: 'https://swebtoon-phinf.pstatic.net/20181026_223/1540517103219JIDOO_JPEG/10_EC8DB8EB84A4EC9DBC_ipad.jpg?type=a210',
                count: 100
            }, {
                title: 'Tower of God',
                image: 'https://swebtoon-phinf.pstatic.net/20190318_291/1552868599909GoVLY_JPEG/10_EC8DB8EB84A4EC9DBC_ipad.jpg?type=a210',
                count: 10
            }, {
                title: 'Sweet Home',
                image: 'https://swebtoon-phinf.pstatic.net/20180115_46/1515982322405V9H8X_JPEG/10_EC8DB8EB84A4EC9DBC_ipad.jpg?type=a210',
                count: 12
            },{
                title: 'Code Adam',
                image: 'https://swebtoon-phinf.pstatic.net/20190623_198/1561228729004sN096_JPEG/10_EC8DB8EB84A4EC9DBC_ipad.jpg?type=a210',
                count: 18
            },{
                title: 'Demon Queen',
                image: 'https://swebtoon-phinf.pstatic.net/20180821_187/1534817578859RBWsk_JPEG/10_EC8DB8EB84A4EC9DBC_ipad.jpg?type=a210',
                count: 109
            },{
                title: 'UnderPrin',
                image: 'https://swebtoon-phinf.pstatic.net/20140710_63/1404980105173DcuB8_JPEG/12_EC96B8EB8D94ED9484EBA6B0.jpg?type=a210',
                count: 90
            },
            ]
        }
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
                    
                    <View style={{height:50,
                    borderBottomColor: '#dddddd',
                    marginVertical: 6 }}>
                            <View style={{flexDirection:'row-reverse', padding: 1, 
                            backgroundColor:'white',marginHorizontal: 10,
                            marginVertical: 1,
                            shadowOffset:{width:0, height:0},
                            shadowColor: 'black',
                            shadowOpacity: 0.2, elevation:2, borderRadius: 50}}>
                                <TextInput
                                underlineColorAndroid='transparent' 
                                placeholder="Seacrh Episode"
                                placeholderTextColor="grey"
                                style={{ flex:1,marginLeft:15,marginRight:20,
                                backgroundColor:'white'}} />
                            </View>
                    </View>
                    {/* <View style={{ marginTop: 0,marginLeft: 15}}>
                        <Text style={{fontSize: 30,marginBottom:0}}>Episode</Text>
                    </View> */}
                        <ScrollView
                         scrollEventThrottle={0}
                         showsVerticalScrollIndicator={false}
                         style={{felx:1}}>
                        <View>
                                <View style={{flex:3}}>
                                    <View style={{marginTop: 15, paddingHorizontal: 5,}}>
                                    <SafeAreaView>
                                        <FlatList
                                             data={this.state.banners}
                                             horizontal={false}
                                             showsHorizontalScrollIndicator={false}
                                             renderItem={({item}) =>
                                            <TouchableOpacity onPress={()=>{alert('This Is Favorite') }}>
                                                <View style={{backgroundColor:'white',marginHorizontal:15, marginVertical:5, flex:2, flexDirection:'row', borderRadius:15}}>
                                                    <View>
                                                        <Image style={{width:90, height:90, padding:10, borderRadius:15}} source={{uri : item.image}}/>
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
                    <View style={{height:50,
                        borderBottomColor: '#dddddd',
                        admarginVertical: 6,
                        marginBottom:0}}>
                            <View>
                                <TouchableOpacity onPress={()=>this.props.navigation.navigate('CreateEpisode')} >
                                    <View
                                        style={styles.btn1}>
                                        <Text style={{fontSize: 18}}>+ Add Episode</Text>
                                    </View>
                                </TouchableOpacity>
                                
                            </View>
                    </View>
                </View>
            </SafeAreaView>

        );
    }
}

export default CreateWebtoon;

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
    },
    btn1: {
        padding: 10,
        borderRadius:30,
        elevation: 2,
        marginLeft: 10,
        alignItems: 'center'
    },
    btn2: {
        padding: 10,
        backgroundColor: '#CD1C07',
        borderRadius:10,
        elevation: 3,
        marginLeft: 10,
        marginTop: 20,
        alignItems: 'center'
    }
})
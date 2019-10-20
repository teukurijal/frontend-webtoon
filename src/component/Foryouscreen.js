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
    TouchableOpacity,
    RefreshControl
} from 'react-native';
import Carousel from 'react-native-banner-carousel'
import Icon from 'react-native-vector-icons/FontAwesome'
import axiosInstance from '../service/baseUrl'
import {AsyncStorage} from 'react-native'



const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 260;
const banners =[

    'https://swebtoon-phinf.pstatic.net/20190708_212/15625801951630WaKO_JPEG/banner_10x8.jpg',
    'https://swebtoon-phinf.pstatic.net/20190905_299/15676636851905DKXg_JPEG/06_banner_10x8.jpg',
]


class ForyouScreen extends Component {

    constructor() {
        super()
        this.state = {
            data: '',
            favorites:'',
            banners:'',
            token:'',
            position:1,
            interval: null,
            disbaledbtn: true,
            isRefreshing: false,
            searchtext:''
        }
    }

   componentDidMount= async () => {
        this.setState({
            token: await AsyncStorage.getItem('Token')
        });
        this.requestData();
    }

    requestData () {
        this.onFavorite();
        this.onToons();
        this.onBanners();
    }

    refreshData () {
        this.setState({ isRefreshing: true })
        this.requestData()
        setTimeout(() => {
            this.setState({ isRefreshing: false })
        }, 1000);
    }

    onFavorite = async () => {
        await axiosInstance({
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                "Authorization": `Bearer ${this.state.token}`
            },
            url: `/webtoons?is_favorite=true`
        }).then(result=>{
            this.setState({favorites: result.data})
            console.log(this.state.favorites)
        });
    }

    onToons = async () => {
        await axiosInstance({
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                "Authorization": `Bearer ${this.state.token}`
            },
            url: `/webtoons`
        }).then(result=>{
            this.setState({toons: result.data})
        });
    }

    onBanners = async () => {
        await axiosInstance({
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                "Authorization": `Bearer ${this.state.token}`
            },
            url: `/banners`
        }).then(result=>{
            this.setState({banners: result.data})
        });
    }

    handleSeacrh(text) {
        this.setState({searchtext: text})
    }

    renderPage(image, index) {
        return (
            <View key={index}>
                <Image style={{ width: BannerWidth, height: BannerHeight }} source={{ uri: image }} />
            </View>
        );
    }

    render() {
        return (
            <SafeAreaView style={{
                position: 'relative',
                flex: 1,
                zIndex: 0
            }}>
                
                <ScrollView
                    scrollEventThrottle={0}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl refreshing={this.state.isRefreshing} onRefresh={() => this.refreshData()} />
                    }>
                <View>
                        <View style={{flex:1}}>
                            <View style={styles.container}>
                                <View
                                    style={{
                                        flexDirection:'row',
                                        position: "absolute",
                                        right: 0,
                                        padding: 1,
                                        marginTop: 10,
                                        marginRight: 10,
                                        zIndex: 2
                                    }} >
                                    <TouchableOpacity
                                        style={{
                                            padding: 10,
                                            elevation: 2
                                        }}
                                        onPress={() => this.props.navigation.navigate('Search')}>
                                            <Icon
                                                name="search"
                                                size={23}
                                                style={{
                                                    color: 'white'
                                                }}
                                            />
                                    </TouchableOpacity>
                                </View>
                                <Carousel
                                    autoplay
                                    autoplayTimeout={3000}
                                    loop
                                    index={0}
                                    pageSize={350}
                                >
                                    {banners.map((image, index) => this.renderPage(image, index))}
                                </Carousel>
                            </View>
                        </View>
                        <View style={{flex:2}}>
                            <View
                                style={{
                                    marginTop: 15,
                                    paddingHorizontal: 5,}}>
                                <Text
                                    style={{
                                        fontSize: 24,
                                        marginBottom: 5,
                                        marginLeft:10}}>
                                        Favorite Toons
                                </Text>
                            </View>
                            <View>
                                <SafeAreaView>
                                    <FlatList
                                        data={this.state.favorites}
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                        renderItem={({item}) =>
                                        <TouchableOpacity
                                        onPress={() => this.props.navigation.navigate('DetailScreen',
                                            {image:item.image, title:item.title, toonid: item.id})}>
                                            <View style={{
                                                marginHorizontal:5,
                                                backgroundColor:'white',
                                                borderRadius:10,
                                                borderWidth: 0.5}}>
                                                <Image
                                                    source={{uri : item.image}}
                                                    style={{
                                                        width:150,
                                                        height:120, padding:10,
                                                        borderTopLeftRadius:10,
                                                        borderTopRightRadius:10}}/>
                                                <View style={{width : 100,alignItems:'center'}}>
                                                    <Text
                                                        style={{
                                                            justifyContent:'center',
                                                            fontSize: 14,
                                                            marginTop:5,
                                                            textAlign:'center'}}>
                                                            {item.title}
                                                    </Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                        }
                                        keyExtractor={(item, index) => index.toString()}
                                    />
                                </SafeAreaView>
                            </View>
                            <View
                                style={{
                                    marginTop: 15,
                                    paddingHorizontal: 5,}}>
                                <Text 
                                style={{
                                    fontSize: 24,
                                    marginLeft:10, 
                                    marginBottom:5}}>
                                    New episodes
                                </Text>
                            </View>
                            <View>
                            <SafeAreaView>
                                <FlatList
                                        data={this.state.toons}
                                        horizontal={false}
                                        showsHorizontalScrollIndicator={false}
                                        renderItem={({item}) =>
                                    <TouchableOpacity
                                    onPress={() =>this.props.navigation.navigate('DetailScreen',{image:item.image, title:item.title, toonid: item.id})}>
                                        <View
                                            style={{
                                                backgroundColor:'white',
                                                marginHorizontal:5,
                                                marginVertical:4,
                                                flex:1,
                                                flexDirection:'row',
                                                borderRadius:10,
                                                borderTopWidth:0}}>
                                            <View>
                                                <Image
                                                    source={{uri : item.image}}
                                                    style={{
                                                        width:90,
                                                        height:90,
                                                        marginLeft:1,
                                                        borderRadius:20}} />
                                            </View>
                                            <View
                                                style={{
                                                    flexDirection: 'column',
                                                    alignItems: 'flex-start',
                                                    justifyContent:'center'}}>
                                                <View
                                                    style={{
                                                        marginHorizontal:15}}>
                                                    <Text
                                                        style={{
                                                            fontSize:17,
                                                            marginBottom:5}}>
                                                            {item.title}
                                                    </Text>
                                                </View>
                                                <View>
                                                    <TouchableOpacity
                                                        onPress={()=>alert('ad to favorite')} >
                                                        <View
                                                            style={styles.btnblue}>
                                                                <Icon name='plus' size={12} />
                                                                <Text> Favorite</Text>
                                                        </View>
                                                </TouchableOpacity>
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
        </SafeAreaView>

        );
    }
}

export default ForyouScreen;

const styles = StyleSheet.create ({
    container: {
        zIndex: 0,
        height:240
    },
    btnblue: {
        padding: 8,
        backgroundColor: '#1BB4D3',
        borderRadius:10,
        elevation: 3,
        marginLeft: 12,
        flexDirection:'row',
        alignItems:'center',
    },
    btnwhite: {
        padding: 8,
        backgroundColor: 'grey',
        borderRadius:10,
        elevation: 3,
        marginLeft: 12,
        flexDirection:'row',
        alignItems:'center',
    }
})
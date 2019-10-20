import React, {Component} from 'react';
import {FlatList, Image, ActivityIndicator} from 'react-native';
import axiosInstance from '../service/baseUrl';
import {AsyncStorage} from 'react-native';

function Story({image}) {
  //console.log(image);
  return <Image source={{uri: image}} style={{width: '100%', height: 500}} />;
}

class DetailEpisode extends Component {
  constructor() {
    super();
    this.state = {
      pages: '',
      token: '',
    };
  }

  componentDidMount = async () => {
    this.setState({
      token: await AsyncStorage.getItem('Token'),
    });

    this.onPage();
    //console.log(this.props.navigation.getParam('toonid'));
  };

  onPage = async () => {
    await axiosInstance({
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
      url: `/user/${1}/webtoon/${this.props.navigation.getParam(
        'toonid',
      )}/episode/${this.props.navigation.getParam('episodeid')}/images`,
    }).then(result => {
      this.setState({pages: result.data});
      //console.log('toon ' + this.props.navigation.getParam('toonid'));
      //console.log('episode ' + this.props.navigation.getParam('episodeid'));
    });
  };

  Story(image) {
    //console.log(image);
    return <Image source={{uri: image}} style={{width: '100%', height: 500}} />;
  }

  render() {
    return (
      <FlatList
        data={this.state.pages}
        renderItem={({item}) => (
          <Image
            source={{uri: item.image}}
            style={{width: '100%', height:600}}
          />
        )}
        keyExtractor={item => item.id.toString()}
      />
    );
  }
}

export default DetailEpisode;

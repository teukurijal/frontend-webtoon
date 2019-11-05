import React, {Component} from 'react';
import {FlatList, Image, ActivityIndicator} from 'react-native';
import axiosInstance from '../service/baseUrl';
import { connect } from 'react-redux';

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
    this.onPage();
  };

  onPage = async () => {
    const {id, token} = this.props
    await axiosInstance({
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      url: `/user/${id}/webtoon/${this.props.navigation.getParam(
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

const mapStateToProps = state => ({
  token: state.users.data.token,
  id: state.users.data.id
})
export default connect(
  mapStateToProps, 
  // mapDispatchToProps
  )(DetailEpisode);

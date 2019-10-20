import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import Foryouscreen from '../component/Foryouscreen';
import FavoriteScreen from '../component/FavoriteScreen';
import ProfileScreen from '../component/ProfileScreen';

// import DetaiScreen from '../component/DetailScreen';

const ProfileStack = createStackNavigator({
  ProfileStack: {
    screen: ProfileScreen,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: 'Profile',
        headerRight: (
          <Icon
            name="pencil"
            size={25}
            style={{marginRight: 20}}
            color="#000000"
            onPress={() => navigation.navigate('EditProfileScreen')}
          />
        ),
      };
    },
  },
});

const BottomTabNavigator = createBottomTabNavigator(
  {
    ForYou: {
      screen: Foryouscreen,
      navigationOptions: {
        header: null,
        tabBarLabel: 'For You',
        tabBarIcon: ({tintColor}) => <Icon name="th-large" size={26} />,
      },
    },
    FavoriteScreen: {
      screen: FavoriteScreen,
      navigationOptions: {
        header: null,
        tabBarLabel: 'Favorite',
        tabBarIcon: ({tintColor}) => <Icon name="star" size={26} />,
      },
    },
    ProfileScreen: {
      screen: ProfileStack,

      navigationOptions: {
        headerTitle: 'Episode 1',
        headerRight: (
          <Icon
            name="share-alt"
            style={{marginRight: 30, fontSize: 25}}
            onPress={() => Share.shareSingle(shareOptions)}
          />
        ),
        tabBarLabel: 'Profile',
        tabBarIcon: ({tintColor}) => <Icon name="user" size={26} />,
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: '#000000',
      inactiveTintColor: '#777777',
      labelStyle: {
        fontSize: 12,
      },
      style: {
        backgroundColor: '#ffffff',
        borderBottomWidth: 0,
        padding: 5,

        borderTopWidth: 0,
        shadowOffset: {width: 9, height: 9},
        shadowColor: 'black',
        shadowOpacity: 0.5,
        elevation: 5,
      },
    },
  },
);
export default BottomTabNavigator;

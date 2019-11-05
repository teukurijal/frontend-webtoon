import { combineReducers } from 'redux';

import reducerWebtoons from '../_reducers/reducerWebtoons';
import reducersFavorites from './reducerFavorites';
import reducerseEpisodes from './reducerEpisodes';
import reducersUsers from './reducersUsers';

//The Global State
const appReducer = combineReducers({
    webtoons: reducerWebtoons,
    favorites: reducersFavorites,
    episodes: reducerseEpisodes,
    users: reducersUsers,
})

export default appReducer
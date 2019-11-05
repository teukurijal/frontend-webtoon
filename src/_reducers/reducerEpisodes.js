const initialState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    data: []
  };
  
  const reducerseEpisodes = (state = initialState, action) => {
    //   console.log(action.payload)
    switch (action.type) {
      case 'GET_EPISODES_PENDING':
        return {
          ...state,
          isLoading: true
        };
  
      case 'GET_EPISODES_FULFILLED':
        return {
          ...state,
          isSuccess: true,
          isLoading: false,
          data: action.payload.data
        };
        
      case 'GET_EPISODES_REJECTED':
        return {
          ...state,
          isLoading: false,
          isError: true
        };
      default:
        return state;
    }
  };
  
  export default reducerseEpisodes;
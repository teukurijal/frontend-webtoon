const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  data: []
};

const reducersFavorites = (state = initialState, action) => {
  // console.log('inipayload', action.payload)
  switch (action.type) {
    case 'GET_FAVORITES_PENDING':
      return {
        ...state,
        isLoading: true
      };

    case 'GET_FAVORITES_FULFILLED':
      return {
        ...state,
        isSuccess: true,
        isLoading: false,
        data: action.payload.data
      };
      
    case 'GET_FAVORITES_REJECTED':
      return {
        ...state,
        isLoading: action.isLoading,
        isError: true
      };
    default:
      return state;
  }
};

export default reducersFavorites;
const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  data: []
};

const reducersWebtoons = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_WEBTOONS_PENDING':
      return {
        ...state,
        isLoading: true
      };

    case 'GET_WEBTOONS_FULFILLED':
      return {
        ...state,
        isSuccess: true,
        isLoading: false,
        data: action.payload.data
      };
      
    case 'GET_WEBTOONS_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      return state;
  }
};

export default reducersWebtoons;
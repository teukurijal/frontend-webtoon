const initialState = {
  fetching: false,
  fetched: false,
  error: null,
  webtoons: []

}

const reducer = function (state = initialState, action) {
  switch (action.type) {
    case 'FETCH_WEBTOONS_PENDING':
      return {
        ...state,
        fetching: true
      }
      break;
    case 'FETCH_WEBTOONS_FULLFILLED':
      return {
        ...state,
        fetching: false,
        fetched: true,
        webtoons: action.payload
      }
      break;
    case 'FETCH_WEBTOONS_REJECTED':
      return {
        ...state,
        fetching: false,
        error: action.payload
      }
      break;
      default:
  }
  return state;
}

export default reducer
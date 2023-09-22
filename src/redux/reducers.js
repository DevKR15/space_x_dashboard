const initialState = {
  launches: [],
  upcomingLaunches: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LAUNCHES':
      return {
        ...state,
        launches: action.payload,
      };
    case 'SET_UPLAUNCHES':
      return {
        ...state,
        upcomingLaunches: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;

const initialState = {
  nuove: [],
  search: "",
};

const nuoveReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_NUOVE":
      return {
        ...state,
        nuove: action.payload,
      };
    case "GET_SEARCH":
      return {
        ...state,
        search: action.payload,
      };

    default:
      return state;
  }
};

export default nuoveReducer;

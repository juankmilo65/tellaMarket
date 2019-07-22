export function appReducer(state = { name: "Shane" }, action) {
  switch (action.type) {
    case "SET_NAME": {
      return {
        ...state,
        name: action.payload
      };
    }
    case "LOGIN": {
      return {};
    }
    default:
      return state;
  }
}

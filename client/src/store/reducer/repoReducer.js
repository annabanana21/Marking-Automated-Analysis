export const initialState = {
    current: {},
    repoList: []
}

export const reducerRepo = (state, action) => {
    switch (action.type) {
      case "UPDATE": {
        return {
          ...state,
          current: action.payload.repo
        };
      }
      case "CREATE": {
        return {
            repoList: action.payload.repoList,
            current: {}
        }
      }
      default:
        return state;
    }
  };
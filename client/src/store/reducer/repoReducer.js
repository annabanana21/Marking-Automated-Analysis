export const initialState = {
    current: {},
    repoList: [],
    commits: []
}

export const reducerRepo = (state, action) => {
    switch (action.type) {
      case "UPDATE": {
        return {
          ...state,
          current: action.payload.repo,
          commits: []
        };
      }
      case "CREATE": {
        return {
            repoList: action.payload.repoList,
            current: {},
            commits: []
        }
      }
      case "COMMITS": {
        return {
          ...state,
          commits: action.payload.commits,
          branches: action.payload.branches
        }
      }
      default:
        return state;
    }
  };
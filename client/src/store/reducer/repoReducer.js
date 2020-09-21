const storageState = JSON.parse(localStorage.getItem("repo"));

let initialState;

if (storageState) {
  initialState = {
      current: storageState.current || {},
      repoList: storageState.repoList || [],
      commits: storageState.commits || [],
      analysis: new Map(storageState.analysis) || {},
      boardId: storageState.boardId || null,
      collaborators: storageState.collaborators || [],
      branches: storageState.branches || []
  }
} else {
  initialState = {
    current: {},
    repoList: [],
    commits: [],
    analysis: {},
    boardId: null,
    collaborators: [],
    branches: []
}
}


export const reducerRepo = (state, action) => {
    let localVersion = JSON.parse(localStorage.getItem("repo"))
    switch (action.type) {
      case "UPDATE": {
        localVersion.current = action.payload.repo
        localStorage.setItem("repo", JSON.stringify(localVersion))
        return {
          ...state,
          current: action.payload.repo,
          commits: []
        };
      }

      case "CREATE": {
        localStorage.setItem("repo", JSON.stringify({
            repoList: action.payload.repoList
        }))
        return {
          ...state,
          repoList: action.payload.repoList
        }
      }

      case "COMMITS": {
        localVersion.commits = action.payload.commits;
        localVersion.branches = action.payload.branches;
        localVersion.collaborators = action.payload.collaborators;
        localStorage.setItem("repo", JSON.stringify(localVersion))
        return {
          ...state,
          commits: action.payload.commits,
          branches: action.payload.branches,
          collaborators: action.payload.collaborators
        }
      }
      case "BOARD": {
        localVersion.boardId = action.payload.boardId
        localStorage.setItem("repo", JSON.stringify(localVersion))
        return {
          ...state,
          boardId: action.payload.boardId
        }
      }
      case "ANALYSIS": {
        localVersion.analysis = Array.from(action.payload.analysis)
        localStorage.setItem("repo", JSON.stringify(localVersion))
        return {
          ...state,
          analysis: action.payload.analysis
        }
      }
      default:
        return state;
    }
  };

  export {initialState};
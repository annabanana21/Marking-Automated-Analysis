export const initialState = {
    isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")) || false,
    isLoggedInJira: JSON.parse(localStorage.getItem("isLoggedInJira")) || false,
    jiraData: JSON.parse(localStorage.getItem("jiraData")) || null,
    user: JSON.parse(localStorage.getItem("user")) || null,
    client_id: process.env.REACT_APP_CLIENT_ID, //"6bafcc20d274364fb660",
    redirect_uri: process.env.REACT_APP_REDIRECT_URI, //"http://localhost:3000",
    client_secret: process.env.REACT_APP_CLIENT_SECRET, //"de390593f3b2709a8a81c972b5dd56711b8e16e6",
    proxy_url: process.env.REACT_APP_PROXY_URL //"http://localhost:8080/authenticate"
  };
  
  export const reducer = (state, action) => {
    switch (action.type) {
      case "LOGIN": {
        localStorage.setItem("isLoggedIn", JSON.stringify(action.payload.isLoggedIn))
        localStorage.setItem("user", JSON.stringify(action.payload.user))
        return {
          ...state,
          isLoggedIn: action.payload.isLoggedIn,
          user: action.payload.user
        };
      }
      case "LOGINJIRA": {
        localStorage.setItem("isLoggedInJira", JSON.stringify(action.payload.isLoggedInJira))
        localStorage.setItem("jiraData", JSON.stringify(action.payload.data))
        return {
          ...state,
          isLoggedInJira: action.payload.isLoggedInJira,
          jiraData: action.payload.data
        }
      }
      case "LOGOUT": {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("user")
        return {
          ...state,
          isLoggedIn: false,
          user: null
        };
      }
      case "LOGOUTJIRA": {
        localStorage.removeItem("isLoggedInJira");
        localStorage.removeItem("jiraData");
        return {
          ...state,
          isLoggedinJira: false,
          jiraData: null
        };
      }
      default:
        return state;
    }
  };
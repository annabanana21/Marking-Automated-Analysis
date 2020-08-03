export const initialState = {
    isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")) || false,
    user: JSON.parse(localStorage.getItem("user")) || null,
    client_id: /*process.env.REACT_APP_CLIENT_ID,*/ "6bafcc20d274364fb660",
    redirect_uri: /*process.env.REACT_APP_REDIRECT_URI,*/ "http://localhost:3000",
    client_secret: /*process.env.REACT_APP_CLIENT_SECRET*/ "de390593f3b2709a8a81c972b5dd56711b8e16e6",
    proxy_url: /*process.env.REACT_APP_PROXY_URL*/ "http://localhost:8080/authenticate"
  };
  
  export const reducer = (state, action) => {
    switch (action.type) {
      case "LOGIN": {
        localStorage.setItem("isLoggedIn", JSON.stringify(action.payload.isLoggedIn))
        localStorage.setItem("user", JSON.stringify(action.payload.user))
        console.log(action.payload.isLoggedIn)
        return {
          ...state,
          isLoggedIn: action.payload.isLoggedIn,
          user: action.payload.user
        };
      }
      case "LOGOUT": {
        localStorage.clear()
        return {
          ...state,
          isLoggedIn: false,
          user: null
        };
      }
      default:
        return state;
    }
  };
import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuth: true,
      };

    case "logout":
      return { ...state, user: null, isAuth: false };

    default:
      return;
  }
};

const FAKE_USER = {
  name: "Boi",
  email: "boi@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=uz",
};

const AuthProvider = ({ children }) => {
  const [{ user, isAuth }, dispatch] = useReducer(reducer, {
    user: null,
    isAuth: false,
  });
  const login = (email, password) => {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  };

  const logout = () => {
    dispatch({ type: "logout" });
  };

  return (
    <AuthContext.Provider value={{ user, isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;

export const useAuth = () => {
  return useContext(AuthContext);
};

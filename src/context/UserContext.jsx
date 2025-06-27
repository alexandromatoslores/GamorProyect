import { createContext, useContext, useReducer, useCallback, useEffect } from "react";
import { usersList } from '../data/users';

const USER_ACTIONS = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  REGISTER: 'REGISTER',
  LOAD_FROM_STORAGE: 'LOAD_FROM_STORAGE'
};

const initialState = {
  user: null,
  isLoading: false,
  error: null
};

/**
 * Reducer para manejar el estado del usuario.
 * @param {object} state
 * @param {object} action
 * @returns {object}
 */
function userReducer(state, action) {
  switch (action.type) {
    case USER_ACTIONS.LOGIN:
      return {
        ...state,
        user: action.payload,
        error: null,
        isLoading: false
      };
    case USER_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        error: null,
        isLoading: false
      };
    case USER_ACTIONS.REGISTER:
      return {
        ...state,
        user: action.payload,
        error: null,
        isLoading: false
      };
    case USER_ACTIONS.LOAD_FROM_STORAGE:
      return {
        ...state,
        user: action.payload,
        isLoading: false
      };
    default:
      return state;
  }
}

/**
 * Contexto global para la autenticación y gestión de usuario.
 */
const UserContext = createContext({
  state: initialState,
  login: () => {},
  logout: () => {},
  register: () => {},
  isLoading: false,
  error: null
});

/**
 * Proveedor de contexto de usuario. Maneja login, logout y registro.
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @returns {JSX.Element}
 */
export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    try {
    const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        dispatch({ type: USER_ACTIONS.LOAD_FROM_STORAGE, payload: user });
      }
    } catch (error) {
      console.error('Error loading user from localStorage:', error);
      localStorage.removeItem("user");
    }
  }, []);

  useEffect(() => {
    if (state.user) {
      localStorage.setItem("user", JSON.stringify(state.user));
    } else {
      localStorage.removeItem("user");
    }
  }, [state.user]);

  /**
   * Inicia sesión con usuario y contraseña.
   * @param {string} username
   * @param {string} password
   * @returns {boolean}
   */
  const login = useCallback((username, password) => {
    try {
    const found = usersList.find(
      u => u.username === username.toLowerCase() && u.password === password
    );
      
    if (found) {
        const user = { username: found.username, avatar: found.avatar };
        dispatch({ type: USER_ACTIONS.LOGIN, payload: user });
      return true;
    }
      
      dispatch({ type: USER_ACTIONS.LOGIN, payload: null });
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }, []);

  /**
   * Registra un nuevo usuario.
   * @param {string} username
   * @param {string} password
   * @param {string} avatar
   * @returns {boolean}
   */
  const register = useCallback((username, password, avatar) => {
    try {
      const existingUser = usersList.find(u => u.username === username.toLowerCase());
      if (existingUser) {
    return false;
  }

      usersList.push({ username: username.toLowerCase(), password, avatar });
      const user = { username: username.toLowerCase(), avatar };
      dispatch({ type: USER_ACTIONS.REGISTER, payload: user });
    return true;
    } catch (error) {
      console.error('Register error:', error);
      return false;
    }
  }, []);

  /**
   * Cierra la sesión del usuario.
   */
  const logout = useCallback(() => {
    dispatch({ type: USER_ACTIONS.LOGOUT });
  }, []);

  const contextValue = {
    user: state.user,
    login,
    register,
    logout,
    isLoading: state.isLoading,
    error: state.error
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
}

/**
 * Hook para acceder al contexto de usuario.
 * @returns {object}
 */
export function useUser() {
  const context = useContext(UserContext);
  
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  
  return context;
}

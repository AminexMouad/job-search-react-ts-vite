import { createContext, useReducer } from 'react';
import { IAuthState } from '../interfaces/stores/authStore.interface';
import IAction, {
  IDispatchContext,
} from '../interfaces/stores/action.interface';
import { clearStorage } from '../utils/storage';

const initialState: IAuthState = {
  isAuthenticated: false,
};

const AuthStateContext = createContext(initialState);
const AuthDispatchContext = createContext<IDispatchContext>({
  dispatch: () => null,
});

const authReducer = (state: IAuthState, action: IAction): IAuthState => {
  switch (action.type) {
    case 'SET_STATE':
      return {
        ...state,
        ...action.payload,
      };

    case 'CLEAR_STATE':
      clearStorage();
      return initialState;

    default:
      return state;
  }
};

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={{ dispatch }}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

export { AuthProvider, AuthDispatchContext, AuthStateContext };

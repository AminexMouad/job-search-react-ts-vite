import { createContext, useReducer } from 'react';
import { IAppState } from '../interfaces/stores/appStore.interface';
import IAction, {
  IDispatchContext,
} from '../interfaces/stores/action.interface';

const initialState: IAppState = {
  isAppOnline: true,
  dataRetrievedFromStorage: false,
};

const AppStateContext = createContext(initialState);
const AppDispatchContext = createContext<IDispatchContext>({
  dispatch: () => null,
});

const appReducer = (state: IAppState, action: IAction): IAppState => {
  switch (action.type) {
    case 'SET_STATE':
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

interface IAppProviderProps {
  children: React.ReactNode;
}

const AppProvider: React.FC<IAppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={{ dispatch }}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};

export { AppProvider, AppStateContext, AppDispatchContext };

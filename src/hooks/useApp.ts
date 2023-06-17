import { useContext } from 'react';
import { AppDispatchContext, AppStateContext } from '../stores/AppStore';

const useAppState = () => {
  const state = useContext(AppStateContext);

  return state;
};

const useAppDispatch = () => {
  const { dispatch } = useContext(AppDispatchContext);

  return dispatch;
};

export { useAppState, useAppDispatch };

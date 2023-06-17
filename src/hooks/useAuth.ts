import { useContext } from 'react';
import { AuthDispatchContext, AuthStateContext } from '../stores/AuthStore';

const useAuth = () => {
  return {};
};

const useAuthState = () => {
  const state = useContext(AuthStateContext);

  return state;
};

const useAuthDispatch = () => {
  const { dispatch } = useContext(AuthDispatchContext);

  return dispatch;
};

export default { useAuth, useAuthState, useAuthDispatch };

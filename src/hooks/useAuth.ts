import { useContext } from 'react';
import { AuthDispatchContext, AuthStateContext } from '../stores/AuthStore';
import { useMutation } from '@tanstack/react-query';
import { setItem } from '../utils/storage';
import storageEnums from '../enums/storage.enum';
import { fetchJobs } from './useJobs';

export type LoginBody = {
  broadKey: string;
  apiKey: string;
};

const loginUser = async ({ broadKey, apiKey }: LoginBody) => {
  return await fetchJobs({
    broadKey,
    apiKey,
  });
};

const useAuth = () => {
  const authDispatch = useAuthDispatch();
  const loginMutation = useMutation(loginUser, {
    onSuccess: (_, body) => {
      setItem(storageEnums.API_CREDENTIALS, {
        ...body,
      });
      authDispatch({
        type: 'SET_STATE',
        payload: {
          isAuthenticated: true,
        },
      });
    },
  });

  const logoutUser = () => {
    authDispatch({
      type: 'CLEAR_STATE',
    });
  };

  return { loginMutation, logoutUser };
};

const useAuthState = () => {
  const state = useContext(AuthStateContext);

  return state;
};

const useAuthDispatch = () => {
  const { dispatch } = useContext(AuthDispatchContext);

  return dispatch;
};

export { useAuth, useAuthState, useAuthDispatch };

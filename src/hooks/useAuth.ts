import { API_KEY, BROAD_KEY } from './../config/env';
import { useContext } from 'react';
import { AuthDispatchContext, AuthStateContext } from '../stores/AuthStore';
import { useMutation } from '@tanstack/react-query';
import { setItem } from '../utils/storage';
import storageEnums from '../enums/storage.enum';

export type LoginBody = {
  broadKey: string;
  apiKey: string;
};

const loginUser = ({ broadKey, apiKey }: LoginBody) => {
  return new Promise((resolve, reject) => {
    if (API_KEY !== apiKey || BROAD_KEY !== broadKey) {
      reject(new Error('Credentials are incorrect'));
    } else {
      resolve({ apiKey, broadKey });
    }
  });
};

const useAuth = () => {
  const authDispatch = useAuthDispatch();
  const loginMutation = useMutation(loginUser, {
    onSuccess: (data: LoginBody) => {
      setItem(storageEnums.API_CREDENTIALS, {
        ...data,
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

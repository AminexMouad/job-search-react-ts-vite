import { useCallback, useEffect } from 'react';
import { useAppDispatch } from './useApp';
import { useAuthDispatch } from './useAuth';
import StorageEnums from '../enums/storage.enum';
import { getItem } from '../utils/storage';

const useLoadDataFromStorage = () => {
  const authDispatch = useAuthDispatch();
  const appDispatch = useAppDispatch();

  const retrieveDatasFromStorage = useCallback(() => {
    const credentials = getItem(StorageEnums.API_CREDENTIALS);
    if (credentials) {
      authDispatch({
        type: 'SET_STATE_FROM_STORAGE',
      });
    }
    appDispatch({
      type: 'SET_STATE',
      payload: {
        dataRetrievedFromStorage: true,
      },
    });
  }, [appDispatch, authDispatch]);

  useEffect(() => {
    retrieveDatasFromStorage();
  }, [retrieveDatasFromStorage]);
};

export default useLoadDataFromStorage;

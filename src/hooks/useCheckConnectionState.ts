import { useEffect } from 'react';
import { useAppStateDispatch } from './useApp';

const useCheckConnectionState = () => {
  const dispatch = useAppStateDispatch();
  const onlineHandler = () => {
    dispatch({
      type: 'SET_STATE',
      payload: {
        isAppOnline: true,
      },
    });
  };

  const offlineHandler = () => {
    dispatch({
      type: 'SET_STATE',
      payload: {
        isAppOnline: false,
      },
    });
  };

  useEffect(() => {
    window.addEventListener('online', onlineHandler);
    window.addEventListener('offline', offlineHandler);

    return () => {
      window.removeEventListener('online', onlineHandler);
      window.removeEventListener('offline', offlineHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {};
};

export default useCheckConnectionState;

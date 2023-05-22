import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useGetMeQuery, useVkConnectMutation } from 'app/services/authApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { setActiveModal } from 'features/layout/layoutSlice';
import Modals from 'features/layout/constants';
import { getToken, setVkToken } from '../authSlice';

const useVkConnect = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const token = useAppSelector(getToken);

  const { data: user, isFetching } = useGetMeQuery(null, {
    skip: !token
  });

  const [vkConnect, { isLoading }] = useVkConnectMutation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user && !user.vk_access_token) {
      dispatch(setActiveModal(Modals.VkConnect));
    } else {
      dispatch(setActiveModal(null));
    }

    if (user) {
      dispatch(setVkToken(user.vk_access_token));
    }
  }, [dispatch, user]);

  useEffect(() => {
    const code = searchParams.get('code');

    if (code) {
      vkConnect(code);
      setSearchParams('');
    }
  }, [searchParams, setSearchParams, vkConnect]);

  return { isConnecting: isFetching || isLoading };
};

export default useVkConnect;

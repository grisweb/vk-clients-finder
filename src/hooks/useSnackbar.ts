import { useAppDispatch } from 'app/hooks';
import { snackbar as setSnackbar } from 'features/layout/layoutSlice';
import { Snackbar } from 'features/layout/types';

const useSnackbar = () => {
  const dispatch = useAppDispatch();

  return (props: Snackbar) => {
    dispatch(setSnackbar(props));
  };
};

export default useSnackbar;

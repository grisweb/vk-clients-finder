import { useCallback } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import changeSearchParams from 'utils/changeSearchParams';

const usePagination = () => {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleChange = useCallback(
    (newPage: number) => {
      const search = changeSearchParams(searchParams, { page: newPage });
      navigate({
        pathname,
        search
      });
    },
    [navigate, pathname, searchParams]
  );

  return {
    page,
    handleChange
  };
};

export default usePagination;

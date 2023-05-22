const changeSearchParams = (
  searchParams: URLSearchParams,
  params: Record<string, string | number>
) => {
  const updatedSearchParams = new URLSearchParams(searchParams);
  Object.entries(params).forEach(([key, value]) => {
    updatedSearchParams.set(key, String(value));
  });

  return updatedSearchParams.toString();
};

export default changeSearchParams;

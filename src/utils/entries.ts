import Entries from 'types/utils';

const getEntries = <T extends object>(obj: T) =>
  Object.entries(obj) as Entries<T>;

export default getEntries;

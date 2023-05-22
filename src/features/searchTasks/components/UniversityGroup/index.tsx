import { FC } from 'react';
import { FacultyField, UniversityField, ChairField } from '../form';

const UniversityGroup: FC = () => {
  return (
    <>
      <UniversityField />
      <FacultyField />
      <ChairField />
    </>
  );
};

export default UniversityGroup;

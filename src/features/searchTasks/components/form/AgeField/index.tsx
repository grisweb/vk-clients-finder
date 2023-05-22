import { FC, useEffect, useState } from 'react';
import { CustomSelectOptionInterface, FormLayoutGroup } from '@vkontakte/vkui';
import { useWatch } from 'react-hook-form';
import { range } from 'lodash';

import { SelectField } from 'features/form/components';

const minAge = 14;
const maxAge = 80;

const AgeField: FC = () => {
  const [agesFrom, setAgesFrom] = useState<CustomSelectOptionInterface[]>([]);
  const [agesTo, setAgesTo] = useState<CustomSelectOptionInterface[]>([]);

  const ageFrom = useWatch({ name: 'age_from' });
  const ageTo = useWatch({ name: 'age_to' });

  useEffect(() => {
    const options: CustomSelectOptionInterface[] = range(
      ageFrom || minAge,
      maxAge + 1
    ).map((value) => ({ label: `до ${value}`, value }));

    setAgesTo(options);
  }, [ageFrom]);

  useEffect(() => {
    const options: CustomSelectOptionInterface[] = range(
      minAge,
      (ageTo || maxAge) + 1
    ).map((value) => ({ label: `от ${value}`, value }));

    setAgesFrom(options);
  }, [ageTo]);

  return (
    <FormLayoutGroup mode="horizontal" segmented>
      <SelectField
        name="age_from"
        placeholder="От"
        label="Возраст"
        options={agesFrom}
        allowClearButton
        valueAsNumber
      />
      <SelectField
        name="age_to"
        placeholder="До"
        options={agesTo}
        allowClearButton
        valueAsNumber
      />
    </FormLayoutGroup>
  );
};

export default AgeField;

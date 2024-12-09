import { useState } from 'react';
import { debounce } from 'lodash';

export const DebouncedInput = ({ value, onChange }: any) => {
  const [internalValue, setInternalValue] = useState(value);

  const handleChange = debounce((value: any) => {
    onChange(value);
  }, 300); // 300ms debounce

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    handleChange(newValue);
  };

  return <input value={internalValue} onChange={onInputChange} />;
};

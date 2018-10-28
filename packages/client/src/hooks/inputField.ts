import { useState } from 'react';

export default function useInputField(defaultValue: string = '') {
  const [value, setValue] = useState(defaultValue);
  const onChange = e => {
    setValue(e.target.value);
  };

  return {
    value,
    onChange,
  };
}

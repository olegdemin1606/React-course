import React, { useState } from 'react';

const options = [
    { value: 'default', label: 'По порядку' },
    { value: 'alphabet', label: 'По алфавиту' },
    { value: 'count', label: 'По количеству символов' },
    { value: 'urgency', label: 'По срочности' },
    { value: 'members', label: 'По количеству участников' },
    { value: 'created_at', label: 'По дате создания' },
  ];

export default function ListSort({value, setValue}) {
    const handleChange = (event) => {
        setValue(event.target.value);
      };
    
      return (
        <select name="sort" value={value} onChange={handleChange}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }
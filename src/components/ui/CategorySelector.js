import React from 'react';
import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectItem,
  ChevronDownIcon,
} from '@gluestack-ui/themed';

const CategorySelector = ({ selectedValue, onValueChange, options }) => {
  return (
    <Select
      selectedValue={selectedValue}
      onValueChange={onValueChange}
    >
      <SelectTrigger>
        <SelectInput placeholder="Choose Category" />
        <SelectIcon mr="$3">
          <ChevronDownIcon />
        </SelectIcon>
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} label={option.label} value={option.value} />
          ))}
        </SelectContent>
      </SelectPortal>
    </Select>
  );
};

export default CategorySelector;
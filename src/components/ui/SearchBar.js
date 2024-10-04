import React from 'react';
import { Input, InputField, InputIcon, Icon, SearchIcon } from '@gluestack-ui/themed';

const SearchBar = ({ value, onChangeText }) => {
  return (
    <Input backgroundColor='#e4e4e7'>
      <InputIcon mt={10} ml={8}>
        <Icon as={SearchIcon} />
      </InputIcon>
      <InputField
        placeholder="i.e. James Bond, CSI"
        value={value}
        onChangeText={onChangeText}
      />
    </Input>
  );
};

export default SearchBar;
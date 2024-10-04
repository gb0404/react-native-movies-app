import React, { useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  ButtonText,
  FormControl,
  InputIcon,
  Icon,
  SearchIcon,
  Center,
} from '@gluestack-ui/themed';
import api from '../services/api';
import MovieItem from '../components/ui/MovieItem';
import SearchBar from '../components/ui/SearchBar';
import CategorySelector from '../components/ui/CategorySelector';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setError('Movie/TV show name is required');
      return;
    }
    if (!searchType) {
      setError('Please select a search type');
      return;
    }
    setError('');
    setIsLoading(true);
    try {
      const endpoint = searchType === 'movie' ? 'search/movie' : (searchType === 'multi' ? 'search/multi' : 'search/tv');
      const data = await api(`${endpoint}?query=${encodeURIComponent(searchQuery)}`);
      setSearchResults(data.results);
    } catch (err) {
      console.error('Search error:', err);
      setError('An error occurred while searching. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const searchTypeOptions = [
    { label: 'Movie', value: 'movie' },
    { label: 'TV', value: 'tv' },
    { label: 'Multi', value: 'multi' },
  ];

  return (
    <Box flex={1} bg="white">
      <VStack p={30} pt={10} gap={10}>
        <Text fontSize="lg" textAlign="left" mt={10} fontWeight={600}>
          Search Movie/TV Show Name<Text style={{ color: 'red' }}> *</Text>
        </Text>
        <FormControl isRequired isInvalid={!!error}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Text fontSize="lg" textAlign="left" mt={1} fontWeight={600}>
            Choose Search Type<Text style={{ color: 'red' }}> *</Text>
          </Text>
        </FormControl>
        <HStack gap={15} alignItems="center">
          <Box flex={1}>
            <CategorySelector
              selectedValue={searchType}
              onValueChange={setSearchType}
              options={searchTypeOptions}
            />
          </Box>
          <Button onPress={handleSearch} backgroundColor="#06b6d4">
          <HStack>
          <InputIcon mt={1} mr={6} color='white'>
              <Icon color='white' as={SearchIcon} />
            </InputIcon>
          </HStack>
            <ButtonText>Search</ButtonText>
          </Button>
        </HStack>
        {error && (
          <Text fontSize="$12" textAlign="left" mt={2} color='red'>
            {error}
          </Text>
        )}
        <Text fontSize="$12" textAlign="left" fontWeight={600}>
          Please select a search type
        </Text>
      </VStack>
      {searchResults.length === 0 && !isLoading && (
        <Center h={200} w={400}>
          <Text fontSize="$2xl" textAlign="center" mt={10} bold>
            Please initiate a search
          </Text>
        </Center>
      )}
      <FlatList
        data={searchResults}
        renderItem={({ item }) => <MovieItem item={item} mediaType={searchType === 'multi' ? item.media_type : searchType} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  listContent: {
    padding: 16,
  },
});

export default SearchScreen;
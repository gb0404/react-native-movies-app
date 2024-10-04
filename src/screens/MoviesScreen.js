import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Box, VStack, Text, Center } from '@gluestack-ui/themed';
import api from '../services/api';
import MovieItem from '../components/ui/MovieItem';
import CategorySelector from '../components/ui/CategorySelector';

const MoviesScreen = () => {
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState('popular');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchMovies();
  }, [category]);

  const fetchMovies = async () => {
    setIsLoading(true);
    try {
      const data = await api(`movie/${category}`);
      setMovies(data.results);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const categoryOptions = [
    { label: 'Now Playing', value: 'now_playing' },
    { label: 'Popular', value: 'popular' },
    { label: 'Top Rated', value: 'top_rated' },
    { label: 'Upcoming', value: 'upcoming' },
  ];

  return (
    <Box flex={1} bg="white">
      <VStack p={30} pt={10} gap={10}>
        <Text fontSize="lg" textAlign="left" mt={10} fontWeight={600}>
        </Text>
        <CategorySelector
          selectedValue={category}
          onValueChange={setCategory}
          options={categoryOptions}
        />
      </VStack>
      {isLoading ? (
        <Center flex={1}>
          <Text>Loading...</Text>
        </Center>
      ) : (
        <FlatList
          data={movies}
          renderItem={({ item }) => <MovieItem item={item} mediaType="movie" />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
        />
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  listContent: {
    padding: 16,
  },
});

export default MoviesScreen;

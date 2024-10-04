import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Box, VStack, Text, Center } from '@gluestack-ui/themed';
import api from '../services/api';
import MovieItem from '../components/ui/MovieItem';
import CategorySelector from '../components/ui/CategorySelector';

const TVShowsScreen = () => {
  const [tvShows, setTVShows] = useState([]);
  const [category, setCategory] = useState('popular');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchTVShows();
  }, [category]);

  const fetchTVShows = async () => {
    setIsLoading(true);
    try {
      const data = await api(`tv/${category}`);
      setTVShows(data.results);
    } catch (error) {
      console.error('Error fetching TV Shows:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const categoryOptions = [
    { label: 'Airing Today', value: 'airing_today' },
    { label: 'On The Air', value: 'on_the_air' },
    { label: 'Popular', value: 'popular' },
    { label: 'Top Rated', value: 'top_rated' },
  ];

  return (
    <Box flex={1} bg="white">
      <VStack p={30} pt={10} gap={10}>
        <Text fontSize="lg" textAlign="left" mt={10} fontWeight={600}>
          TV Shows
        </Text>
        <CategorySelector
          selectedValue={category}
          onValueChange={(newCategory) => {
            setCategory(newCategory);
            setTVShows([]); 
          }}
          options={categoryOptions}
        />
      </VStack>

      {isLoading ? (
        <Center flex={1}>
          <Text>Loading...</Text>
        </Center>
      ) : (
        <FlatList
          data={tvShows}
          renderItem={({ item }) => <MovieItem item={item} mediaType="tv" />}
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

export default TVShowsScreen;

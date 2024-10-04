import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Box, VStack, Text, Button, ButtonText } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';

const MovieItem = ({ item, mediaType }) => {
  const navigation = useNavigation();

  return (
    <Box style={styles.itemContainer}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.poster}
      />
      <VStack flex={1} ml={7} gap={7}>
        <Text bold fontSize="md">{item.title || item.name}</Text>
        <Text fontSize="sm">Popularity: {item.popularity.toFixed(3)}</Text>
        <Text fontSize="sm">Release Date: {item.release_date || item.first_air_date || 'N/A'}</Text>
        <Button 
          onPress={() => navigation.navigate('Details', { 
            mediaId: item.id, 
            mediaType: mediaType,
            mediaTitle: item.title || item.name 
          })} 
          size="sm" 
          mt={2} 
          mr={25}
          bgColor='#06b6d4'
        >
          <ButtonText>More Details</ButtonText>
        </Button>
      </VStack>
    </Box>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  poster: {
    width: 80,
    height: 120,
    borderRadius: 4,
  },
});

export default MovieItem;
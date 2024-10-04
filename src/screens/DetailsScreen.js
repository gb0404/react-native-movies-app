import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, ScrollView } from 'react-native';
import { Box, Text, VStack, HStack } from '@gluestack-ui/themed';
import api from '../services/api';

const DetailsScreen = ({ route }) => {
    const { mediaId, mediaType } = route.params;
    const [details, setDetails] = useState(null);
  
    useEffect(() => {
      const fetchDetails = async () => {
        try {
          const data = await api(`${mediaType}/${mediaId}`);
          setDetails(data);
        } catch (error) {
          console.error(`Error fetching ${mediaType} details:`, error);
        }
      };
  
      fetchDetails();
    }, [mediaId, mediaType]);
  
    if (!details) {
      return <Box flex={1} justifyContent="center" alignItems="center"><Text>Loading...</Text></Box>;
    }
  
    const title = mediaType === 'movie' ? details.title : details.name;
    const releaseDate = mediaType === 'movie' ? details.release_date : details.first_air_date;

    return (
        <ScrollView style={styles.container}>
<HStack>
            <VStack space={4} p={4} gap={30} mt={50}>
                <Text bold fontSize="$xl" textAlign='center' >{title}</Text>

                <Image
                    source={{ uri: `https://image.tmdb.org/t/p/w500${details.poster_path}` }}
                    style={styles.poster}
                />

                <Text fontSize={'$sm'} pl={50} pr={50}>{details.overview}</Text>
                <HStack justifyContent="center">
                    <Text fontSize={'$xs'} >Popularity: {details.popularity.toFixed(3)} |</Text>
                    <Text fontSize={'$xs'}> Release Date: {releaseDate || 'N/A'}</Text>
                </HStack>
            </VStack>
            </HStack>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    poster: {
        width: 200,
        height: 250,
        resizeMode: 'cover',
        margin: 'auto'
    },
});

export default DetailsScreen;
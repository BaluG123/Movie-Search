// import {View, Text} from 'react-native';
// import React from 'react';

// const MovieDetailScreen = () => {
//   return (
//     <View>
//       <Text>MovieDetailScreen</Text>
//     </View>
//   );
// };

// export default MovieDetailScreen;

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MovieDetailScreen = ({route, navigation}) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const {imdbID} = route.params;

  useEffect(() => {
    fetchMovieDetails();
  }, []);

  const fetchMovieDetails = async () => {
    try {
      const response = await fetch(
        `https://omdbapi.com/?i=${imdbID}&apikey=a0783fa9`,
      );
      const data = await response.json();
      if (data.Response === 'True') {
        setMovie(data);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  if (!movie) return null;

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={{uri: movie.Poster}}
        style={styles.backgroundImage}
        blurRadius={2}>
        <View style={styles.overlay}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={wp('6%')} color="white" />
          </TouchableOpacity>

          <View style={styles.posterContainer}>
            <Image source={{uri: movie.Poster}} style={styles.poster} />
          </View>

          <View style={styles.detailsContainer}>
            <Text style={styles.title}>{movie.Title}</Text>
            <Text style={styles.year}>
              {movie.Year} • {movie.Runtime} • {movie.Rated}
            </Text>

            <View style={styles.ratingContainer}>
              <Icon name="star" size={wp('5%')} color="#FFD700" />
              <Text style={styles.rating}>{movie.imdbRating}/10</Text>
            </View>

            <Text style={styles.genre}>{movie.Genre}</Text>
            <Text style={styles.plot}>{movie.Plot}</Text>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Director</Text>
              <Text style={styles.value}>{movie.Director}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Cast</Text>
              <Text style={styles.value}>{movie.Actors}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Language</Text>
              <Text style={styles.value}>{movie.Language}</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: hp('100%'),
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    paddingTop: hp('4%'),
  },
  backButton: {
    position: 'absolute',
    top: hp('4%'),
    left: wp('4%'),
    zIndex: 1,
  },
  posterContainer: {
    alignItems: 'center',
    paddingTop: hp('8%'),
  },
  poster: {
    width: wp('70%'),
    height: hp('45%'),
    borderRadius: wp('2%'),
  },
  detailsContainer: {
    padding: wp('5%'),
  },
  title: {
    color: 'white',
    fontSize: wp('6%'),
    fontWeight: 'bold',
    marginTop: hp('2%'),
  },
  year: {
    color: '#888',
    fontSize: wp('3.5%'),
    marginTop: hp('1%'),
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('1%'),
  },
  rating: {
    color: 'white',
    fontSize: wp('4%'),
    marginLeft: wp('2%'),
  },
  genre: {
    color: '#888',
    fontSize: wp('3.5%'),
    marginTop: hp('1%'),
  },
  plot: {
    color: 'white',
    fontSize: wp('4%'),
    marginTop: hp('2%'),
    lineHeight: hp('3%'),
  },
  infoRow: {
    marginTop: hp('2%'),
  },
  label: {
    color: '#888',
    fontSize: wp('3.5%'),
  },
  value: {
    color: 'white',
    fontSize: wp('4%'),
    marginTop: hp('0.5%'),
  },
};

export default MovieDetailScreen;

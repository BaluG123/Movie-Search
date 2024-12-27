// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   Image,
//   ScrollView,
//   TouchableOpacity,
//   ActivityIndicator,
// } from 'react-native';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import LinearGradient from 'react-native-linear-gradient';

// const MovieDetailScreen = ({route, navigation}) => {
//   const [movie, setMovie] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const {imdbID} = route.params;

//   useEffect(() => {
//     fetchMovieDetails();
//   }, []);

//   const fetchMovieDetails = async () => {
//     try {
//       const response = await fetch(
//         `https://omdbapi.com/?i=${imdbID}&apikey=a0783fa9`,
//       );
//       const data = await response.json();
//       if (data.Response === 'True') {
//         setMovie(data);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//     setLoading(false);
//   };

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="white" />
//       </View>
//     );
//   }

//   if (!movie) return null;

//   return (
//     <View style={styles.container}>
//       <Image source={{uri: movie.Poster}} style={styles.backgroundImage} />

//       <LinearGradient
//         colors={['transparent', '#000000']}
//         style={styles.gradient}
//       />

//       <TouchableOpacity
//         style={styles.backButton}
//         onPress={() => navigation.goBack()}>
//         <Icon name="arrow-back" size={wp('6%')} color="white" />
//       </TouchableOpacity>

//       <ScrollView style={styles.contentContainer}>
//         <View style={styles.movieInfo}>
//           <Text style={styles.title}>{movie.Title}</Text>

//           <View style={styles.ratingContainer}>
//             <Icon name="star" size={wp('4%')} color="#FFD700" />
//             <Text style={styles.rating}>{movie.imdbRating}</Text>
//             <Text style={styles.duration}>{movie.Runtime}</Text>
//           </View>

//           <View style={styles.genreContainer}>
//             {movie.Genre.split(',').map((genre, index) => (
//               <View key={index} style={styles.genrePill}>
//                 <Text style={styles.genreText}>{genre.trim()}</Text>
//               </View>
//             ))}
//           </View>

//           <Text style={styles.plot}>{movie.Plot}</Text>

//           <View style={styles.creatorInfo}>
//             <Text style={styles.infoLabel}>Director</Text>
//             <Text style={styles.infoValue}>{movie.Director}</Text>

//             <Text style={styles.infoLabel}>Writer</Text>
//             <Text style={styles.infoValue}>{movie.Writer}</Text>

//             <Text style={styles.infoLabel}>Actors</Text>
//             <Text style={styles.infoValue}>{movie.Actors}</Text>
//           </View>
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// const styles = {
//   container: {
//     flex: 1,
//     backgroundColor: 'black',
//   },
//   loadingContainer: {
//     flex: 1,
//     backgroundColor: 'black',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   backgroundImage: {
//     width: '100%',
//     height: hp('60%'),
//     position: 'absolute',
//   },
//   gradient: {
//     position: 'absolute',
//     left: 0,
//     right: 0,
//     bottom: 0,
//     height: hp('100%'),
//     zIndex: 1,
//   },
//   backButton: {
//     position: 'absolute',
//     top: hp('5%'),
//     left: wp('4%'),
//     zIndex: 2,
//   },
//   contentContainer: {
//     flex: 1,
//     zIndex: 2,
//     marginTop: hp('45%'),
//   },
//   movieInfo: {
//     padding: wp('5%'),
//   },
//   title: {
//     color: 'white',
//     fontSize: wp('7%'),
//     fontWeight: 'bold',
//     marginBottom: hp('1%'),
//   },
//   ratingContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: hp('2%'),
//   },
//   rating: {
//     color: 'white',
//     fontSize: wp('4%'),
//     marginLeft: wp('2%'),
//     marginRight: wp('4%'),
//   },
//   duration: {
//     color: '#888',
//     fontSize: wp('4%'),
//   },
//   genreContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     marginBottom: hp('2%'),
//   },
//   genrePill: {
//     backgroundColor: 'rgba(255,255,255,0.1)',
//     paddingHorizontal: wp('3%'),
//     paddingVertical: hp('0.5%'),
//     borderRadius: wp('4%'),
//     marginRight: wp('2%'),
//     marginBottom: hp('1%'),
//   },
//   genreText: {
//     color: 'white',
//     fontSize: wp('3.5%'),
//   },
//   plot: {
//     color: '#888',
//     fontSize: wp('4%'),
//     lineHeight: hp('3%'),
//     marginBottom: hp('3%'),
//   },
//   creatorInfo: {
//     marginTop: hp('2%'),
//   },
//   infoLabel: {
//     color: '#888',
//     fontSize: wp('3.5%'),
//     marginBottom: hp('0.5%'),
//   },
//   infoValue: {
//     color: 'white',
//     fontSize: wp('4%'),
//     marginBottom: hp('2%'),
//   },
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
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

const MovieDetailScreen = ({route, navigation}) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {imdbID} = route.params;

  useEffect(() => {
    fetchMovieDetails();
  }, []);

  const checkInternetConnection = async () => {
    try {
      const response = await fetch('https://www.google.com');
      return response.status === 200;
    } catch (error) {
      return false;
    }
  };

  const fetchMovieDetails = async () => {
    setLoading(true);
    setError(null);

    // Check internet connection
    const isConnected = await checkInternetConnection();
    if (!isConnected) {
      setLoading(false);
      Alert.alert(
        'No Internet Connection',
        'Please check your internet connection and try again.',
        [
          {
            text: 'Retry',
            onPress: () => fetchMovieDetails(),
          },
          {
            text: 'Go Back',
            onPress: () => navigation.goBack(),
          },
        ],
      );
      return;
    }

    try {
      const response = await fetch(
        `https://omdbapi.com/?i=${imdbID}&apikey=a0783fa9`,
      );
      const data = await response.json();

      if (data.Response === 'True') {
        setMovie(data);
      } else {
        setError('Movie details not found');
      }
    } catch (error) {
      setError('Failed to fetch movie details');
      Alert.alert(
        'Error',
        'Something went wrong while fetching movie details.',
        [
          {
            text: 'Retry',
            onPress: () => fetchMovieDetails(),
          },
          {
            text: 'Go Back',
            onPress: () => navigation.goBack(),
          },
        ],
      );
    }
    setLoading(false);
  };

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="white" />
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Icon name="error-outline" size={wp('15%')} color="#666" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => fetchMovieDetails()}>
            <Icon name="refresh" size={wp('6%')} color="white" />
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (!movie) return null;

    return (
      <>
        <Image source={{uri: movie.Poster}} style={styles.backgroundImage} />
        <LinearGradient
          colors={['transparent', '#000000']}
          style={styles.gradient}
        />
        <ScrollView style={styles.contentContainer}>
          <View style={styles.movieInfo}>
            <Text style={styles.title}>{movie.Title}</Text>

            <View style={styles.ratingContainer}>
              <Icon name="star" size={wp('4%')} color="#FFD700" />
              <Text style={styles.rating}>{movie.imdbRating}</Text>
              <Text style={styles.duration}>{movie.Runtime}</Text>
            </View>

            <View style={styles.genreContainer}>
              {movie.Genre.split(',').map((genre, index) => (
                <View key={index} style={styles.genrePill}>
                  <Text style={styles.genreText}>{genre.trim()}</Text>
                </View>
              ))}
            </View>

            <Text style={styles.plot}>{movie.Plot}</Text>

            <View style={styles.creatorInfo}>
              <Text style={styles.infoLabel}>Director</Text>
              <Text style={styles.infoValue}>{movie.Director}</Text>

              <Text style={styles.infoLabel}>Writer</Text>
              <Text style={styles.infoValue}>{movie.Writer}</Text>

              <Text style={styles.infoLabel}>Actors</Text>
              <Text style={styles.infoValue}>{movie.Actors}</Text>
            </View>
          </View>
        </ScrollView>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={wp('6%')} color="black" />
      </TouchableOpacity>
      {renderContent()}
    </View>
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
  errorContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp('10%'),
  },
  errorText: {
    color: '#666',
    fontSize: wp('4%'),
    textAlign: 'center',
    marginTop: hp('2%'),
    marginBottom: hp('3%'),
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('1%'),
    borderRadius: wp('5%'),
  },
  retryText: {
    color: 'white',
    fontSize: wp('4%'),
    marginLeft: wp('2%'),
  },
  backgroundImage: {
    width: '100%',
    height: hp('60%'),
    position: 'absolute',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: hp('100%'),
    zIndex: 1,
  },
  backButton: {
    position: 'absolute',
    top: hp('3%'),
    left: wp('5%'),
    zIndex: 2,
    height: hp('6%'),
    width: wp('12%'),
    borderRadius: wp('6.5%'),
    backgroundColor: 'white',
    padding: wp('3%'),
  },
  contentContainer: {
    flex: 1,
    zIndex: 2,
    marginTop: hp('45%'),
  },
  movieInfo: {
    padding: wp('5%'),
  },
  title: {
    color: 'white',
    fontSize: wp('7%'),
    fontWeight: 'bold',
    marginBottom: hp('1%'),
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  rating: {
    color: 'white',
    fontSize: wp('4%'),
    marginLeft: wp('2%'),
    marginRight: wp('4%'),
  },
  duration: {
    color: '#888',
    fontSize: wp('4%'),
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: hp('2%'),
  },
  genrePill: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('0.5%'),
    borderRadius: wp('4%'),
    marginRight: wp('2%'),
    marginBottom: hp('1%'),
  },
  genreText: {
    color: 'white',
    fontSize: wp('3.5%'),
  },
  plot: {
    color: '#888',
    fontSize: wp('4%'),
    lineHeight: hp('3%'),
    marginBottom: hp('3%'),
  },
  creatorInfo: {
    marginTop: hp('2%'),
  },
  infoLabel: {
    color: '#888',
    fontSize: wp('3.5%'),
    marginBottom: hp('0.5%'),
  },
  infoValue: {
    color: 'white',
    fontSize: wp('4%'),
    marginBottom: hp('2%'),
  },
};

export default MovieDetailScreen;

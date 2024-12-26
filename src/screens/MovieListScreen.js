// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   FlatList,
//   ActivityIndicator,
// } from 'react-native';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import Icon from 'react-native-vector-icons/MaterialIcons';

// const MovieListScreen = ({navigation}) => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [movies, setMovies] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const searchMovies = async query => {
//     if (!query) return;
//     setLoading(true);
//     try {
//       const response = await fetch(
//         `https://omdbapi.com/?s=${query}&apikey=a0783fa9`,
//       );
//       const data = await response.json();
//       if (data.Response === 'True') {
//         setMovies(data.Search);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//     setLoading(false);
//   };

//   const renderMovieItem = ({item}) => (
//     <TouchableOpacity
//       style={styles.movieItem}
//       onPress={() => navigation.navigate('MovieDetail', {imdbID: item.imdbID})}>
//       <Image
//         source={{uri: item.Poster}}
//         style={styles.poster}
//         defaultSource={require('../util/movie-placeholder.png')}
//       />
//       <Text style={styles.title}>{item.Title}</Text>
//       <Text style={styles.year}>{item.Year}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity>
//           <Icon name="menu" size={wp('6%')} color="white" />
//         </TouchableOpacity>
//         <Text style={styles.title}>Browse</Text>
//       </View>

//       <View style={styles.searchContainer}>
//         <Icon
//           name="search"
//           size={wp('5%')}
//           color="gray"
//           style={styles.searchIcon}
//         />
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search movies"
//           placeholderTextColor="gray"
//           value={searchQuery}
//           onChangeText={setSearchQuery}
//           onSubmitEditing={() => searchMovies(searchQuery)}
//         />
//       </View>

//       {loading ? (
//         <ActivityIndicator size="large" color="white" />
//       ) : (
//         <FlatList
//           data={movies}
//           renderItem={renderMovieItem}
//           keyExtractor={item => item.imdbID}
//           numColumns={3}
//           contentContainerStyle={styles.movieGrid}
//         />
//       )}
//     </View>
//   );
// };

// const styles = {
//   container: {
//     flex: 1,
//     backgroundColor: 'black',
//     paddingTop: hp('2%'),
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: wp('4%'),
//     marginBottom: hp('2%'),
//   },
//   title: {
//     color: 'white',
//     fontSize: wp('5%'),
//     fontWeight: 'bold',
//     marginLeft: wp('4%'),
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#333',
//     marginHorizontal: wp('4%'),
//     borderRadius: wp('2%'),
//     paddingHorizontal: wp('3%'),
//     marginBottom: hp('2%'),
//   },
//   searchIcon: {
//     marginRight: wp('2%'),
//   },
//   searchInput: {
//     flex: 1,
//     color: 'white',
//     height: hp('6%'),
//     fontSize: wp('4%'),
//   },
//   movieGrid: {
//     paddingHorizontal: wp('2%'),
//     marginBottom: hp('5%'),
//   },
//   movieItem: {
//     width: wp('30%'),
//     marginHorizontal: wp('1%'),
//     marginBottom: hp('2%'),
//     alignItems: 'center',
//   },
//   poster: {
//     width: wp('28%'),
//     height: hp('20%'),
//     borderRadius: wp('1%'),
//   },
//   year: {
//     color: 'white',
//     marginTop: hp('1%'),
//     fontSize: wp('3.5%'),
//   },
//   title: {
//     color: 'white',
//     marginTop: hp('1%'),
//     fontSize: wp('3.5%'),
//     textAlign: 'center',
//     justifyContent: 'center',
//     width: wp('28%'),
//   },
// };

// export default MovieListScreen;

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MovieListScreen = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    loadSearchHistory();
  }, []);

  const loadSearchHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('searchHistory');
      if (history) setSearchHistory(JSON.parse(history));
    } catch (error) {
      console.error(error);
    }
  };

  const saveSearch = async query => {
    try {
      const updatedHistory = [
        query,
        ...searchHistory.filter(item => item !== query),
      ].slice(0, 5);
      await AsyncStorage.setItem(
        'searchHistory',
        JSON.stringify(updatedHistory),
      );
      setSearchHistory(updatedHistory);
    } catch (error) {
      console.error(error);
    }
  };

  const searchMovies = async query => {
    if (!query) return;
    setLoading(true);
    setShowHistory(false);
    try {
      const response = await fetch(
        `https://omdbapi.com/?s=${query}&apikey=a0783fa9`,
      );
      const data = await response.json();
      if (data.Response === 'True') {
        setMovies(data.Search);
        saveSearch(query);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const renderMovieItem = ({item}) => (
    <TouchableOpacity
      style={styles.movieItem}
      onPress={() => navigation.navigate('MovieDetail', {imdbID: item.imdbID})}>
      <Image
        source={{uri: item.Poster}}
        style={styles.poster}
        defaultSource={require('../util/movie-placeholder.png')}
      />
      <Text numberOfLines={2} style={styles.movieTitle}>
        {item.Title}
      </Text>
      <Text style={styles.year}>{item.Year}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>Browse</Text>
          <Text style={styles.subTitle}>Movies</Text>
        </View>
        <TouchableOpacity style={styles.menuButton}>
          <Icon name="menu" size={wp('6%')} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <Icon
          name="search"
          size={wp('5%')}
          color="gray"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search movies"
          placeholderTextColor="gray"
          value={searchQuery}
          onChangeText={text => {
            setSearchQuery(text);
            setShowHistory(text.length > 0);
          }}
          onSubmitEditing={() => searchMovies(searchQuery)}
        />
      </View>

      {showHistory && searchHistory.length > 0 && (
        <View style={styles.historyContainer}>
          {searchHistory.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.historyItem}
              onPress={() => {
                setSearchQuery(item);
                searchMovies(item);
              }}>
              <Icon name="history" size={wp('4%')} color="gray" />
              <Text style={styles.historyText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {loading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <FlatList
          data={movies}
          renderItem={renderMovieItem}
          keyExtractor={item => item.imdbID}
          numColumns={3}
          contentContainerStyle={styles.movieGrid}
        />
      )}
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: hp('4%'),
  },
  titleContainer: {
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: wp('6%'),
    color: 'white',
  },
  subTitle: {
    fontSize: wp('2%'),
    color: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: wp('2%'),
    backgroundColor: 'black',
  },
  menuButton: {
    padding: wp('2%'),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    marginHorizontal: wp('4%'),
    borderRadius: wp('2%'),
    paddingHorizontal: wp('3%'),
    marginBottom: hp('2%'),
  },
  searchIcon: {
    marginRight: wp('2%'),
  },
  searchInput: {
    flex: 1,
    color: 'white',
    height: hp('6%'),
    fontSize: wp('4%'),
  },
  historyContainer: {
    backgroundColor: '#222',
    marginHorizontal: wp('4%'),
    borderRadius: wp('2%'),
    padding: wp('2%'),
    marginBottom: hp('2%'),
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp('2%'),
  },
  historyText: {
    color: 'white',
    marginLeft: wp('2%'),
    fontSize: wp('3.5%'),
  },
  movieGrid: {
    paddingHorizontal: wp('2%'),
    marginTop: hp('2%'),
    paddingBottom: hp('5%'),
  },
  movieItem: {
    width: wp('30%'),
    marginHorizontal: wp('1%'),
    marginBottom: hp('2%'),
    alignItems: 'flex-start',
  },
  poster: {
    width: wp('28%'),
    height: hp('20%'),
    borderRadius: wp('1%'),
  },
  movieTitle: {
    color: 'white',
    marginTop: hp('1%'),
    fontSize: wp('3.5%'),
    width: wp('28%'),
    textAlign: 'left',
  },
  year: {
    color: 'white',
    fontSize: wp('3.5%'),
  },
};

export default MovieListScreen;

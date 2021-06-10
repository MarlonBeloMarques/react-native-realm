/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Icon from 'react-native-vector-icons/MaterialIcons';

const App: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <LinearGradient
      colors={['#7159c1', '#9B49c1']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Text style={styles.title}>Repositórios</Text>
      <View style={styles.view}>
        <TextInput
          placeholder="Procurar repositório..."
          style={styles.input}
          placeholderTextColor={'#999'}
        />
        <TouchableOpacity style={styles.add} activeOpacity={0.8}>
          <Icon name="add" size={22} color="#FFF" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30 + getStatusBarHeight(true),
  },
  title: {
    fontSize: 32,
    color: '#FFF',
    fontWeight: 'bold',
    paddingLeft: 20,
  },
  view: {
    flexDirection: 'row',
    marginTop: 10,
    paddingTop: 0,
    paddingHorizontal: 20,
  },
  input: {
    flex: 1,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 15,
    borderRadius: 4,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#FFF',
  },
  add: {
    backgroundColor: '#6BD4C1',
    marginLeft: 10,
    justifyContent: 'center',
    borderRadius: 4,
    paddingHorizontal: 10,
  },
});

export default App;

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useMemo, useState} from 'react';
import {
  FlatList,
  Keyboard,
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
import Repository from './components/Repository';
import api from './services/api';
import getRealm from './services/realm';

interface Response {
  id: Number;
  name: String;
  full_name: String;
  description: String;
  stargazers_count: Number;
  forks_count: Number;
}

const App: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [repositories, setRepositories] =
    useState<Realm.Results<Realm.Object>>();

  useEffect(() => {
    const loadRepositories = async () => {
      const realm = await getRealm();

      const data = realm.objects('Repository').sorted('stars', true);

      setRepositories(data);
    };

    loadRepositories();
  }, []);

  const saveRepository = async (repository: Response) => {
    const data = {
      id: repository.id,
      name: repository.name,
      fullName: repository.full_name,
      description: repository.description,
      stars: repository.stargazers_count,
      forks: repository.forks_count,
    };

    const realm = await getRealm();

    realm.write(() => {
      realm.create('Repository', data, 'modified');
    });

    return data;
  };

  const handleAddRepository = async () => {
    try {
      const {data} = await api.get(`/repos/${input}`);

      await saveRepository(data);

      setInput('');
      setError(false);
      Keyboard.dismiss();
    } catch (err) {
      console.warn('Erro');
      setError(true);
    }
  };

  const handleRefreshRepository = async (repository: any) => {
    const {data} = await api.get(`/repos/${repository.fullName}`);

    const dataSave = await saveRepository(data);

    setRepositories(
      repositories?.map(repo => (repo.id === dataSave.id ? dataSave : repo)),
    );
  };

  const renderRepositories = useMemo(() => {
    return (
      <FlatList
        style={styles.list}
        contentContainerStyle={{paddingHorizontal: 20}}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        data={repositories}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => (
          <Repository
            data={item}
            onRefresh={() => handleRefreshRepository(item)}
          />
        )}
      />
    );
  }, [repositories]);

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
          value={input}
          onChangeText={setInput}
          placeholder="Procurar repositório..."
          style={[
            styles.input,
            {
              borderColor: error ? '#FF7272' : '#FFF',
            },
          ]}
          placeholderTextColor={'#999'}
        />
        <TouchableOpacity
          onPress={handleAddRepository}
          style={styles.add}
          activeOpacity={0.8}>
          <Icon name="add" size={22} color="#FFF" />
        </TouchableOpacity>
      </View>
      {renderRepositories}
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
    borderWidth: 2,
  },
  add: {
    backgroundColor: '#6BD4C1',
    marginLeft: 10,
    justifyContent: 'center',
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  list: {
    marginTop: 20,
  },
});

export default App;
